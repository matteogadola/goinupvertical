import { createClient, FunctionsHttpError } from 'jsr:@supabase/supabase-js@2'
import CodiceFiscale from 'npm:codice-fiscale-js@2.3.22'
import dayjs from 'npm:dayjs@1.11.7'
import * as Sentry from 'https://deno.land/x/sentry/index.mjs'

Sentry.init({
  dsn: Deno.env.get('SENTRY_DSN'),
})
Sentry.setTag('region', Deno.env.get('SB_REGION'))
Sentry.setTag('execution_id', Deno.env.get('SB_EXECUTION_ID'))
Sentry.setTag('function', 'createOrder')

const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
)

const carnetItems = [
  {
    event_id: "03880c1e-c287-455f-ad71-0d4fd388a940",
    product_id: "778e1a0d-306a-4534-ae1b-28823886437a"
  },
  {
    event_id: "9844257d-7120-4842-9248-73a7f4b1f031",
    product_id: "f773adeb-fcc3-4955-8a98-054ee93d4397"
  },
  {
    event_id: "1cf3ef49-469d-47aa-8023-a5c9d65acb03",
    product_id: "591cebfd-c685-45ec-90f7-082c83c1af92"
  },
  {
    event_id: "d5a9b24c-c35b-476e-9511-0ef4a02d3e2b",
    product_id: "5611d405-d09c-41af-8de2-b24576bcbd42"
  },
  {
    event_id: "aab2bd71-f10a-40fe-a790-31066d11b02a",
    product_id: "4431da74-101e-4f15-958c-080e01867d6d"
  },
  {
    event_id: "26bb178c-f5a3-406e-aa3d-405d34d69509",
    product_id: "18a7e6cf-f086-4e38-93cd-97aa65450deb"
  },
  {
    event_id: "0ce456d6-b055-4ae4-b30e-7f87d627489c",
    product_id: "a2d26b8a-2627-4c69-979e-2dac02b0844d"
  },
  {
    event_id: "f9fd4322-faf7-4d30-8201-4bae9dc65535",
    product_id: "0111de9a-d070-4b2e-9376-527b99630e0e"
  },
  {
    event_id: "cedc834c-a574-45a4-abf0-617745651d52",
    product_id: "c85e7b2a-5b29-451b-927a-d21771074a51"
  },
  {
    event_id: "d563b568-11b5-4f54-b185-eb58531e205a",
    product_id: "0420d7bb-7c6b-42a5-a33c-8f3845273cbd"
  },
  {
    event_id: "b6cc0ecd-9afe-43d9-bca6-504a05911f6e",
    product_id: "20f7e9aa-59fb-4bde-bd63-ac015c6c88a2"
  }
];

Deno.serve(async (req) => {
  const body: any = await req.json()
  const authHeader = req.headers.get('Authorization');
  if (authHeader) {
    console.log('authHeader', authHeader.replace('Bearer ', ''))
    /*const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: authHeader },
        },
      }
    );*/
  }

    supabase.auth.

  const { data: { user }, error } = await supabaseClient.auth.getUser();
  if (error || !user) {
    return new Response(JSON.stringify({ error: 'Unauthorized', details: error }), { status: 401 });
  }

  try {
    if (!body.items?.length) {
      throw new Error('Nessun prodotto selezionato')
    }

    const sanitizedItems = []
    for (const item of body.items) {
      let event = null
      if (item.event_id) {
        const { data } = await supabase
          .from('events')
          .select()
          .eq('id', item.event_id)
          .single()
        event = data
      }
      if (item.product_id) {
        const { data: product } = await supabase
          .from('products')
          .select()
          .eq('id', item.product_id)
          .single()

        if (!product) {
          console.warn(`[createOrder] Prodotto non trovato: ${JSON.stringify(item)}`)
          throw new Error('Prodotto non trovato')
        }
        if (product.status !== 'open') {
          console.warn(`[createOrder] item non abilitato: ${JSON.stringify(item)}`)
          throw new Error('Iscrizione non disponibile')
        }
        if (product.end_sale_date && dayjs(product.end_sale_date).isBefore()) {
          console.warn(`[createOrder] end_sale_date passata: ${JSON.stringify(item)}`)
          throw new Error('Iscrizione non più disponibile')
        } else if (!product.end_sale_date && event && dayjs(event.date).subtract(46, 'hours').isBefore()) {
          throw new Error('Iscrizione non più disponibile')
        }
        if (product.start_sale_date && dayjs(product.start_sale_date).isAfter()) {
          console.warn(`[createOrder] start_sale_date futura: ${JSON.stringify(item)}`)
          throw new Error('Iscrizione non ancora disponibile')
        }

        let tempItem: any = {
          event_id: item.event_id,
          product_id: product.id,
          product_type: item.product_type,
          name: product.name,
          description: item.description ? capitalize(item.description) : null,
          price: product.price,
          quantity: item.quantity
        };

        if (item?.entry && Object.keys(item.entry).length) {
          const tin = verifyTin(item.entry.tin, item.entry.first_name, item.entry.last_name);

          tempItem['entry'] = {
            ...item.entry,
            first_name: capitalize(item.entry.first_name),
            last_name: capitalize(item.entry.last_name),
            birth_date: item.entry.birth_date || `${tin.year}-${String(tin.month).padStart(2, '0')}-${String(tin.day).padStart(2, '0')}`,
            birth_place: item.entry.birth_place || tin.birthplace.nome,
            gender: item.entry.gender || tin.gender,
            country: item.entry.country || 'ITA',
            tin: item.entry.tin.toUpperCase(),
            email: item.entry.email.toLowerCase(),
            club: item.entry.club ? item.entry.club.trim().toUpperCase() : null
          };
        }
        sanitizedItems.push(tempItem);
      }
    }

    if (body.payment_method === 'stripe') {
      const tax = calcStripeFee(sanitizedItems);
      sanitizedItems.push({ name: 'Commissioni di servizio', price: tax, quantity: 1 })
    }
    const totalAmount = calcTotalAmount(sanitizedItems)

    const { data: order, error } = await supabase.rpc('create_order', {
      user_id: body.user_id || null,
      amount: totalAmount,
      customer_email: body.customer_email ?? sanitizedItems[0].entry?.email,
      customer_first_name: body.customer_first_name ?? sanitizedItems[0].entry?.first_name,
      customer_last_name: body.customer_last_name ?? sanitizedItems[0].entry?.last_name,
      payment_method: body.payment_method,
      payment_status: body.payment_method === 'stripe' ? 'intent' : 'pending',
      items: sanitizedItems,
    })

    if (error instanceof FunctionsHttpError) {
      const { message } = await error.context.json()
      throw new Error(message)
    } else if (error) {
      throw new Error(error.message)
    }

    return new Response(JSON.stringify(order), {
      status: 200,
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
    })
  } catch (e: any) {
    Sentry.captureException(e, { fingerprint: [body.customer_email] })
    return new Response(JSON.stringify({ code: e.code, message: e.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
    })
  }
})

const capitalize = function(input: string) {
  if (!input) return input
  const wordArray = input.trim().replace(/\s\s+/g, ' ').split(' ');
  const output = wordArray.map(word => `${word[0].toUpperCase()}${word.slice(1).toLowerCase()}`);

  return output.join(' ');
};

const calcTotalAmount = function(items: any[]) {
  return items.reduce((a: any, c: any) => a + (c.price * c.quantity), 0);
};

const calcStripeFee = function(items: any[]) {
  const totalAmount = calcTotalAmount(items);
  const stripeTax = 25 + Math.round(totalAmount * 0.015);
  const stripeTaxIva = Math.round(stripeTax * 0.22);
  return Math.ceil((stripeTax + stripeTaxIva) / 50) * 50;
};

const verifyTin = function(tin: string, firstName: string, lastName: string) {
  try {
    const cf = new CodiceFiscale(tin);

    if (!cf.isValid()) {
      throw new Error(`Codice fiscale ${tin} non valido`);
    }
  
    const checkTin = new CodiceFiscale({
      name: firstName,
      surname: lastName,
      gender: cf.gender,
      day: cf.day,
      month: cf.month,
      year: cf.year,
      birthplace: cf.birthplace.nome,
      birthplaceProvincia: '',
    });
  
    if (checkTin.toString() !== cf.cf) {
      throw new Error(`Corrispondenza codice fiscale non valida`);
    }

    const entryYearLimit = (new Date()).getFullYear() - 15;
    if (cf.year > entryYearLimit) {
      throw new Error(`Anno minimo per l'iscrizione: ${entryYearLimit}`);
    }

    return cf;
  } catch (e: any) {
    throw new Error(`Codice fiscale ${tin} non valido`);
  }
};

const hasRole = function(user: any) {
  return ['admin'].includes(user.app_metadata?.role ?? '')
};
