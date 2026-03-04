import Stripe from 'https://esm.sh/stripe@18?target=denonext'
import * as Sentry from 'https://deno.land/x/sentry/index.mjs'

Sentry.init({
  dsn: Deno.env.get('SENTRY_DSN'),
})
Sentry.setTag('region', Deno.env.get('SB_REGION'))
Sentry.setTag('execution_id', Deno.env.get('SB_EXECUTION_ID'))
Sentry.setTag('function', 'stripeCheckout')

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY'), {
  apiVersion: '2025-03-31.basil',
})

Deno.serve(async (req) => {
  const { order, origin } = await req.json()
  const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

  try {
    for (const item of order.items) {
      line_items.push({
        price_data: {
          currency: 'eur',
          product_data: {
            name: item.name,
            description: item?.description ?? undefined,
            metadata: {
              order_item_id: item.id,
              item_id: item.id,
            },
          },
          unit_amount: item.price,
        },
        quantity: item.quantity,
      });
    }

    //const q = encodeBase64(JSON.stringify(order));
    const params: Stripe.Checkout.SessionCreateParams = {
      mode: 'payment',
      submit_type: 'pay',
      //payment_method_types: ['card'],
      currency: 'eur',
      customer_email: order.customer_email,
      line_items,
      automatic_tax: {
        enabled: false,
      },
      metadata: {
        order_id: order.id,
      },
      payment_intent_data: {
        metadata: {
          order_id: order.id,
        },
      },
      success_url: `${origin}/checkout/confirm?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/checkout`,
    };

    console.debug("Stripe session params", params)
    const session = await stripe.checkout.sessions.create(params);
    console.info("Stripe session created", session)

    return new Response(JSON.stringify(session), {
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
