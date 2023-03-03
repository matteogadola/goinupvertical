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
  const client = await pool.connect();

  const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

  for (let item of body.items) {
    let metadata = {};
    /*if (item?.entry) {
      metadata = {
        entryId: item.entry.id,
        tin: item.entry.tin,
        email: item.entry.email,
        phoneNumber: item.entry.phone_number,
      };
    }*/

    line_items.push({
      price_data: {
        currency: 'eur',
        product_data: {
          name: item.name,
          description: item?.description ?? undefined,
          metadata,
        },
        unit_amount: item.price,
      },
      quantity: 1,
    });
  }

  // QUESTA VERR° FATTA in CREATE ENTRY
  //if (!tinRegex.test(body.entrant_tin)) {
  //  throw new Error("")
  //}
  const q = base64.encode(body);

  // bisogna ciclare su items mandati e creare nuovo line_items
  console.log(body.user_email);

  const params: Stripe.Checkout.SessionCreateParams = {
    mode: 'payment',
    submit_type: 'pay',
    payment_method_types: ['card'],
    currency: 'eur',
    customer_email: body.user_email, //  body.items[0].entry?.email, // la prima dell'elenco !
    line_items,
    automatic_tax: {
      enabled: false,
    },
    success_url: `${headers.origin}/confirm?session_id={CHECKOUT_SESSION_ID}&q=${q}`,
    //cancel_url: `${headers.origin}/events/${body.event_id}`,
  };

  // tariffe invoice
  // https://support.stripe.com/questions/pricing-for-post-payment-invoices-for-one-time-purchases-via-checkout-and-payment-links
  // e comunque servono mille dati...
  // io la creerei a posteriori con la mail che inviamo con le info

  return stripe.checkout.sessions.create(params);
};
