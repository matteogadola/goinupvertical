import type { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
import { Order } from '@/types/orders';
import { pool } from '@/lib/pg';
import { base64 } from '@/lib/helpers';

// https://stripe.com/docs/api/versioning
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2022-11-15',
});

// https://stripe.com/docs/api/checkout/sessions/create

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const { method, headers, body } = req;

  try {
    switch (method) {
      case 'POST':
        const { id } = await createCheckoutSession(headers, body);

        if (id) {
          //createEntry(body.ticket)
          //createUser(body.user)
        }

        res.json({ id });
        break;
      default:
        return res.status(405).end();
    }
  } catch (e: any) {
    return res.status(500).json({ error: e.message });
  }
}

export const createCheckoutSession = async (headers: any, body: Order) => {
  const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

  for (let item of body.items) {
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

  const q = base64.encode(body);
  const params: Stripe.Checkout.SessionCreateParams = {
    mode: 'payment',
    submit_type: 'pay',
    payment_method_types: ['card'],
    currency: 'eur',
    customer_email: body.user_email,
    line_items,
    automatic_tax: {
      enabled: false,
    },
    metadata: {
      order_id: body.id,
    },
    payment_intent_data: {
      metadata: {
        order_id: body.id,
      },
    },
    success_url: `${headers.origin}/confirm?session_id={CHECKOUT_SESSION_ID}&q=${q}`,
    cancel_url: `${headers.origin}/events/${body.items[0].event_id ?? 'circuito-goinup-5'}`, // TODO - Modifica
  };

  // tariffe invoice
  // https://support.stripe.com/questions/pricing-for-post-payment-invoices-for-one-time-purchases-via-checkout-and-payment-links
  // e comunque servono mille dati...
  // io la creerei a posteriori con la mail che inviamo con le info

  return stripe.checkout.sessions.create(params);
};
