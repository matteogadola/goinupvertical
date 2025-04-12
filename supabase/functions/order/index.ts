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
    product_id: '39bc184c-c9e4-4557-9fbb-40907b391b8a',
    event_id: '6aa979c2-622d-4d06-996a-596568e6e18d'
  },
  {
    product_id: '06fc0294-c4f3-4998-ab84-5c72ba6afef2',
    event_id: 'b56fbb8a-5c49-4811-8bb7-b992c2544303'
  },
  {
    product_id: '504e6532-09b6-4b98-9eba-20c067911915',
    event_id: '241de043-8f32-4d3a-b9ac-b1731fe8ce48'
  },
  {
    product_id: 'dec0d443-c380-41f7-acb8-a23e696a296b',
    event_id: 'dbfdfef0-c7e8-4cb0-9e70-3872cdf15929'
  },
  {
    product_id: '2702b42d-1986-4196-9929-e2ae19755f5e',
    event_id: 'b0061698-9762-4849-8ce0-d907ff1d9743'
  },
  {
    product_id: '9e946616-9335-4faa-a66e-0a6344352b2b',
    event_id: 'c514bdcb-3ef7-4415-b5de-d4ba79aa4d52'
  },
  {
    product_id: '461c382b-6f12-4799-862c-7f54730117be',
    event_id: 'a96a093e-56e5-40ba-be5a-8d978fb562a8'
  },
  {
    product_id: '41d92792-d914-4cc6-9337-9f7dcfd5f34d',
    event_id: 'd1242f0d-acb6-4cc7-a268-e970cd1ac8fe'
  },
  {
    product_id: '600d7cce-c9e2-4e89-8a40-9e2bca8b3622',
    event_id: '751be1a5-9cd9-4bab-94f8-d3d568e56187'
  },
  {
    product_id: 'bc265e0f-71b4-48bd-b3b2-35c2eb9727fc',
    event_id: '5d2b6463-d0ea-44c9-b8ec-fdebd0e8814f'
  },
  {
    product_id: '6d769257-7022-468e-a0fd-0a38cf0628c2',
    event_id: '94134137-72eb-4824-9144-e3ccefda50cb'
  }
];

Deno.serve(async (req) => {
  const body: any = await req.json()

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

    return cf;
  } catch (e: any) {
    throw new Error(`Codice fiscale ${tin} non valido`);
  }
};
