import Stripe from 'stripe';
import { Order, OrderItem } from '@/types/orders'
import { createClient } from '@/utils/supabase/admin';

import { dt } from '@/utils/date';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-02-24.acacia',
});

const createCheckoutSession = async ({ order, origin, q }: any) => {
  const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

  try {
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
      success_url: `${origin}/checkout/confirm?session_id={CHECKOUT_SESSION_ID}&q=${q}`,
      cancel_url: `${origin}/checkout`,
    };

    console.log(params)

    return stripe.checkout.sessions.create(params);
  } catch (e: any) {
    console.error(`[checkout] error: ${e.message}`);
    throw e
  }
};

export async function POST(req: Request) {
  const body = await req.text();
  const origin = await req.headers.get('origin');
  //const { order, origin, q } = await c.req.json()

  try {
    const session = await createCheckoutSession({ body, origin });

    return new Response(JSON.stringify(session), {
      status: 200,
    })
  } catch(e: any) {
    return new Response(e.message, {
      status: 500,
    })
  }
}
