/**
 * Send a transactional email using Brevo SMTP API
 * 
 * https://developers.brevo.com/docs/send-a-transactional-email
 * https://developers.sendinblue.com/reference/sendtransacemail
 */

import * as Sentry from 'https://deno.land/x/sentry/index.mjs'

Sentry.init({
  dsn: Deno.env.get('SENTRY_DSN'),
})
Sentry.setTag('region', Deno.env.get('SB_REGION'))
Sentry.setTag('execution_id', Deno.env.get('SB_EXECUTION_ID'))
Sentry.setTag('function', 'mail')

const BREVO_API_KEY = Deno.env.get('BREVO_API_KEY')!

Deno.serve(async (req) => {
  const body = await req.json()

  try {
    const res = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json',
        'api-key': BREVO_API_KEY,
      },
      body: JSON.stringify(body),
    })

    const data = await res.text()

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
    })
  } catch (e: any) {
    Sentry.captureException(e, { fingerprint: [body.to[0].email] })
    return new Response(JSON.stringify({ code: e.code, message: e.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
    })
  }
})
