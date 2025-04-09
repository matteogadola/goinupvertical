import Stripe from 'stripe'
import * as Sentry from '@sentry/node'
import { createStripe } from '@/utils/stripe';

Sentry.init({
  dsn: process.env.SENTRY_DSN,
})

const stripe = createStripe()

const createCheckoutSession = async ({ order, origin, q }: any) => {
  const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

  for (let item of order.items) {
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
    //success_url: `${origin}/checkout/confirm?session_id={CHECKOUT_SESSION_ID}&q=${q}`,
    success_url: `${origin}/checkout/confirm?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/checkout`,
  };

  console.log(params)

  return stripe.checkout.sessions.create(params);
};

export async function POST(req: Request) {
  const body = await req.text()
  const origin = req.headers.get('origin')

  try {
    const session = await createCheckoutSession({ body, origin })

    return new Response(JSON.stringify(session), {
      status: 200,
    })
  } catch(e: any) {
    Sentry.captureException(e)
    console.error('Stripe checkout: %s', e.message)

    return new Response(e.message, {
      status: 500,
    })
  }
}
