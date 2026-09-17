import { createClient, type User } from 'jsr:@supabase/supabase-js@2'
import CodiceFiscale from 'npm:codice-fiscale-js@2.3.23'
import { z } from 'npm:zod@4.3.6'
import * as Sentry from 'https://deno.land/x/sentry/index.mjs'

const CodiceFiscaleClass = CodiceFiscale as unknown as new (input: string | Record<string, unknown>) => any

Sentry.init({
  dsn: Deno.env.get('SENTRY_DSN'),
})
Sentry.setTag('region', Deno.env.get('SB_REGION'))
Sentry.setTag('execution_id', Deno.env.get('SB_EXECUTION_ID'))
Sentry.setTag('function', 'createOrder')

const paymentMethods = ['stripe', 'cash', 'sepa', 'on-site'] as const

const entrySchema = z.object({
  first_name: z.string().trim().min(1),
  last_name: z.string().trim().min(1),
  tin: z.string().trim().min(1),
  birth_date: z.string().trim().optional(),
  birth_place: z.string().trim().optional(),
  gender: z.string().trim().optional(),
  country: z.string().trim().optional(),
  club: z.string().trim().optional(),
  email: z.string().trim().email().optional(),
  phone_number: z.string().trim().optional(),
  fidal_card: z.string().trim().optional(),
})

const itemSchema = z.object({
  event_id: z.string().uuid().nullable().optional(),
  product_id: z.string().uuid(),
  description: z.string().trim().optional(),
  quantity: z.coerce.number().int().positive().optional().default(1),
  entry: entrySchema.optional(),
})

const checkoutSchema = z.object({
  customer_email: z.string().trim().email().optional(),
  customer_first_name: z.string().trim().optional(),
  customer_last_name: z.string().trim().optional(),
  payment_method: z.enum(paymentMethods),
  items: z.array(itemSchema).min(1),
})

type EntryInput = z.infer<typeof entrySchema>

class RequestError extends Error {
  constructor(message: string, readonly status: number) {
    super(message)
  }
}

Deno.serve(async (req) => {
  if (req.method !== 'POST') {
    return jsonResponse({ message: 'Metodo non consentito' }, 405)
  }

  let paymentMethod = 'unknown'
  let itemCount = 0

  try {
    const payload = checkoutSchema.parse(await req.json())
    paymentMethod = payload.payment_method
    itemCount = payload.items.length

    const supabaseUrl = requiredEnv('SUPABASE_URL')
    const anonKey = requiredEnv('SUPABASE_ANON_KEY')
    const serviceRoleKey = requiredEnv('SUPABASE_SERVICE_ROLE_KEY')
    const authHeader = req.headers.get('Authorization')

    const authClient = createClient(supabaseUrl, anonKey, {
      global: authHeader ? { headers: { Authorization: authHeader } } : undefined,
      auth: {
        persistSession: false,
        autoRefreshToken: false,
        detectSessionInUrl: false,
      },
    })
    const adminClient = createClient(supabaseUrl, serviceRoleKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
        detectSessionInUrl: false,
      },
    })

    const { data: authData, error: authError } = await authClient.auth.getUser()
    const user = authError ? null : authData.user
    const role = user && authHeader ? getVerifiedRole(user, authHeader) : null
    const allowClosedSales = role !== null && ['manager', 'admin', 'owner'].includes(role)

    const sanitizedItems = payload.items.map((item) => {
      if (!item.entry) {
        return {
          event_id: item.event_id ?? null,
          product_id: item.product_id,
          description: item.description || null,
          quantity: item.quantity,
        }
      }

      const entry = sanitizeEntry(item.entry)
      return {
        event_id: item.event_id ?? null,
        product_id: item.product_id,
        description: `${entry.first_name} ${entry.last_name}`,
        quantity: 1,
        entry,
      }
    })

    assertNoDuplicateEntries(sanitizedItems)

    const firstEntry = sanitizedItems.find((item) => 'entry' in item)?.entry
    const customerEmail = payload.customer_email || firstEntry?.email
    if (!customerEmail) throw new RequestError('Email cliente obbligatoria', 400)

    const { data: order, error } = await adminClient.rpc('create_order_v2', {
      _user_id: user?.id ?? null,
      _customer_email: customerEmail,
      _customer_first_name: payload.customer_first_name || firstEntry?.first_name || null,
      _customer_last_name: payload.customer_last_name || firstEntry?.last_name || null,
      _payment_method: payload.payment_method,
      _items: sanitizedItems,
      _allow_closed_sales: allowClosedSales,
    })

    if (error) {
      const conflict = error.code === '23505' || /già iscritt|due volte/i.test(error.message)
      throw new RequestError(error.message, conflict ? 409 : 400)
    }

    return jsonResponse(order, 200)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return jsonResponse({ message: 'Dati checkout non validi', issues: error.issues }, 400)
    }

    const status = error instanceof RequestError ? error.status : 500
    const message = error instanceof Error ? error.message : 'Errore durante la creazione dell’ordine'

    if (status >= 500) {
      Sentry.captureException(error, {
        tags: {
          payment_method: paymentMethod,
          item_count: String(itemCount),
        },
      })
    }

    return jsonResponse({ message }, status)
  }
})

function sanitizeEntry(entry: EntryInput) {
  const tin = verifyTin(entry.tin, entry.first_name, entry.last_name)

  return {
    first_name: capitalize(entry.first_name),
    last_name: capitalize(entry.last_name),
    tin: entry.tin.trim().toUpperCase(),
    birth_date: entry.birth_date || `${tin.year}-${String(tin.month).padStart(2, '0')}-${String(tin.day).padStart(2, '0')}`,
    birth_place: entry.birth_place || tin.birthplace.nome,
    gender: entry.gender || tin.gender,
    country: entry.country?.toUpperCase() || 'ITA',
    club: entry.club ? entry.club.trim().toUpperCase() : null,
    email: entry.email ? entry.email.toLowerCase() : null,
    phone_number: entry.phone_number || null,
    fidal_card: entry.fidal_card || null,
  }
}

function verifyTin(tin: string, firstName: string, lastName: string) {
  try {
    const parsedTin = new CodiceFiscaleClass(tin.trim().toUpperCase())
    if (!parsedTin.isValid()) throw new Error('invalid tin')

    const calculatedTin = new CodiceFiscaleClass({
      name: firstName,
      surname: lastName,
      gender: parsedTin.gender,
      day: parsedTin.day,
      month: parsedTin.month,
      year: parsedTin.year,
      birthplace: parsedTin.birthplace.nome,
      birthplaceProvincia: '',
    })

    if (calculatedTin.toString() !== parsedTin.cf) throw new Error('tin mismatch')

    const minimumBirthYear = new Date().getFullYear() - 15
    if (parsedTin.year > minimumBirthYear) throw new Error('minimum age')

    return parsedTin
  } catch {
    throw new RequestError(`Codice fiscale ${tin.trim().toUpperCase()} non valido`, 400)
  }
}

function assertNoDuplicateEntries(items: Array<Record<string, unknown>>) {
  const entries = new Set<string>()

  for (const item of items) {
    const entry = item.entry as { tin?: string } | undefined
    if (!entry?.tin) continue

    const key = `${item.event_id ?? ''}:${entry.tin.trim().toUpperCase()}`
    if (entries.has(key)) {
      throw new RequestError('Lo stesso atleta non può essere inserito due volte nella stessa gara', 409)
    }
    entries.add(key)
  }
}

function getVerifiedRole(user: User, authHeader: string): string | null {
  const jwtRole = parseJwtPayload(authHeader.replace(/^Bearer\s+/i, ''))?.user_role
  const metadataRole = user.app_metadata?.role
  return typeof jwtRole === 'string'
    ? jwtRole
    : typeof metadataRole === 'string'
      ? metadataRole
      : null
}

function parseJwtPayload(token: string): Record<string, unknown> | null {
  try {
    const payload = token.split('.')[1]
    if (!payload) return null
    const normalized = payload.replace(/-/g, '+').replace(/_/g, '/')
    const padded = normalized.padEnd(Math.ceil(normalized.length / 4) * 4, '=')
    return JSON.parse(atob(padded))
  } catch {
    return null
  }
}

function capitalize(input: string) {
  return input
    .trim()
    .replace(/\s+/g, ' ')
    .split(' ')
    .map((word) => `${word[0].toUpperCase()}${word.slice(1).toLowerCase()}`)
    .join(' ')
}

function requiredEnv(name: string) {
  const value = Deno.env.get(name)
  if (!value) throw new Error(`Configurazione mancante: ${name}`)
  return value
}

function jsonResponse(body: unknown, status: number) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  })
}
