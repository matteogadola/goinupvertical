import type { NextApiRequest, NextApiResponse } from 'next';
import { buffer } from 'micro';
import Stripe from 'stripe';
import { updateEntry } from '@/lib/entries';
import { updateOrder } from '@/lib/orders';
import { dt } from '@/lib/date';

// https://stripe.com/docs/api/versioning
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2022-11-15',
});
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export const config = { api: { bodyParser: false } };

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const buf = await buffer(req);
  const sig = req.headers['stripe-signature']!;

  let event;
  try {
    event = stripe.webhooks.constructEvent(buf, sig, webhookSecret);
  } catch (e: any) {
    console.error(e.message);
    return res.status(400).send(`Webhook Error: ${e.message}`);
  }

  console.log(`Arrivato evento: ${event.type}`);
  let order_id: number;
  // Handle the event - https://stripe.com/docs/api/events/types
  switch (event.type) {
    case 'payment_intent.payment_failed':
      const payment = event.data.object as Stripe.PaymentIntent;
      order_id = Number(payment.metadata?.order_id);

      if (payment.id && !isNaN(order_id)) {
        await updateOrder(order_id, {
          payment_id: payment.id,
          payment_status: 'failed',
          payment_date: dt.unix(payment.created).utc().format(),
        });
      }
      break;
    case 'checkout.session.completed':
      const session = event.data.object as Stripe.Checkout.Session;
      order_id = Number(session.metadata?.order_id);

      if (session.payment_intent && !isNaN(order_id)) {
        await updateOrder(order_id, {
          payment_id: session.payment_intent as string,
          payment_status: 'paid',
          payment_date: dt.unix(session.created).utc().format(),
        });
      }
      break;
    default:
      console.debug(`Unhandled event type ${event.type}`);
  }
  res.status(200).send('');
}

/*
SE TUTTO VA BENE (4242 4242 4242 4242)
Arrivato evento: charge.succeeded
Arrivato evento: checkout.session.completed
Arrivato evento: payment_intent.succeeded
Arrivato evento: payment_intent.created

CON SECURE CODE (4000 0000 0000 3220)
Arrivato evento: payment_intent.created
Arrivato evento: payment_intent.requires_action
Arrivato evento: payment_intent.succeeded
Arrivato evento: checkout.session.completed
Arrivato evento: charge.succeeded

SENZA FONDI (POVERO) (4000 0000 0000 9995)
Arrivato evento: payment_intent.created
Arrivato evento: payment_intent.payment_failed
Arrivato evento: charge.failed (ma rimango sulla pagina di pagamento)
poi esco, e dopo 11:05)
*/
