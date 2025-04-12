/**
 * Send a transactional email using Brevo SMTP API
 * 
 * https://developers.brevo.com/docs/send-a-transactional-email
 */

import { createClient, FunctionsHttpError } from 'jsr:@supabase/supabase-js@2'
import * as Sentry from 'https://deno.land/x/sentry/index.mjs'

Sentry.init({
  dsn: Deno.env.get('SENTRY_DSN'),
})
Sentry.setTag('region', Deno.env.get('SB_REGION'))
Sentry.setTag('execution_id', Deno.env.get('SB_EXECUTION_ID'))
Sentry.setTag('function', 'mailCheckout')

Deno.serve(async (req) => {
  const order: any = await req.json()

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
    );

    const details = order.items.map((item : any) => `
      <tr>
        <td style="padding: 0.5rem 0;">${item.name}</td>
        <td style="padding: 0.5rem 0;">${item.description ?? ''}</td>
        <td style="padding: 0.5rem 0;">${item.quantity}</td>
        <td style="padding: 0.5rem 0;">${item.price / 100}€</td>
      </tr>`
    );

    const totalPrice = order.items.reduce((a: any, v: any) => a + v.price / 100, 0);

    let paymentDetail = order.payment_method === 'cash'
      ? `Per confermare la prenotazione è necessario completare il pagamento presso:<br /><br />
          <b>3Passi Patagonia</b> Morbegno, Piazza 3 Novembre, 15`
      : order.payment_method === 'sepa'
        ? `Per confermare la prenotazione è necessario effettuare un bonifico alle seguenti coordinate:
            <table>
              <tr><td style="width: 6rem; padding: 0.1rem 0;">Intestazione</td><td>Team Valtellina ASD</td></tr>
              <tr><td style="width: 6rem; padding: 0.1rem 0;">IBAN</td><td>IT45A0569652231000009183X60</td></tr>
              <tr><td style="width: 6rem; padding: 0.1rem 0;">Importo</td><td>${totalPrice}€</td></tr>
              <tr><td style="width: 6rem; padding: 0.1rem 0;">Causale</td><td>Carnet goinup ordine ${order.id}</td></tr>
            </table>`
        : order.payment_method === 'on-site'
          ? ''
          : '';

    // da eliminare a metà agosto
    if (order.payment_method === 'cash' && order.promoter_id === 'team-valtellina' && order.items[0].name === 'Iscrizione 4^ Bivacco Rovedatti Vertical') {
      paymentDetail += '<br /><b>Bianchini Calzature</b> Morbegno, Piazza S.Antonio'
    }
    
    if (order.promoter_id === 'team-valtellina' && order.items[0].name === 'Iscrizione 1^ Vertical Frasnedo') {
      paymentDetail += '<br /><br /><span>Si prega di inviare copia del certificato medico, prima della gara, via mail a iscrizioni@teamvaltellina.com oppure consegnarlo presso il negozio 3Passi Patagonia</span>'
    }

    if (order.payment_method === 'cash' && order.items.length > 1) {
      paymentDetail += `<br /><br /><span>N.B. l'ordine dovrà essere saldato nella sua totalità; non saranno accettati pagamenti parziali</span>`
    }

    const { data, error } = await supabaseClient.functions.invoke('mail', {
      method: 'POST',
      body: JSON.stringify({
        sender: { email: 'noreply@goinupvertical.it', name: 'GOinUP' },
        replyTo: { email: 'noreply@goinupvertical.it', name: 'GOinUP' },
        to: [{ email: order.customer_email }],
        subject: 'Conferma ordine',
        headers: {
          'X-Mailin-custom': JSON.stringify({ order_id: order.id }),
        },
        htmlContent: `
        <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
        <html>
          <head>
            <meta http-equiv="Content-type" content="text/html; charset=utf-8" />
            <title>Conferma ordine</title>
            <link href="https://fonts.googleapis.com/css2?family=Unbounded" rel="stylesheet" />
          </head>
          <body>

            <div style="font-family: 'Unbounded', Verdana; font-weight: 700; text-transform: uppercase;">
              <h2 style="color: #6FB06A;">Conferma</h1>
              <h1>Ordine n. ${order.id}</h1>
            </div>
            <p>Grazie per aver completato l'ordine</p>

            <table style="border-width: 1px; border-color: #94A3B8;">
              <thead>
                <tr style="background-color: #E2E8F0;">
                  <td style="width: 15rem; border-bottom-width: 1px; padding: 0.5rem 0;">Riferimento</td>
                  <td style="width: 10rem; border-bottom-width: 1px; padding: 0.5rem 0;">Descrizione</td>
                  <td style="width: 5rem; border-bottom-width: 1px; padding: 0.5rem 0;">Quantità</td>
                  <td style="width: 5rem; border-bottom-width: 1px; padding: 0.5rem 0;">Prezzo</td>
                </tr>
              </thead>
              <tbody>
                ${details.join('')}
              </tbody>
            </table>

            <div style="margin-top: 1rem;">
              ${paymentDetail}
            </div>

            <div style="margin-top: 2rem;">
              <p>GOinUP</p>
            </div>
          </body>
        </html>
        `,
      }),
    })

    if (error instanceof FunctionsHttpError) {
      const { message } = await error.context.json()
      throw new Error(message)
    } else if (error) {
      throw new Error(error.message)
    }

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
    })
  } catch (e: any) {
    Sentry.captureException(e, { fingerprint: [order.customer_email] })
    return new Response(JSON.stringify({ code: e.code, message: e.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
    })
  }
})
