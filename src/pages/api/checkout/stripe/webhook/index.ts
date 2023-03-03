import type { NextApiRequest, NextApiResponse } from 'next';
import { buffer } from 'micro';
import Stripe from 'stripe';
import { updateEntry } from '@/lib/entries';

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
    console.log('ERRORE');
    console.error(e.message);
    res.status(400).send(`Webhook Error: ${e.message}`);
    return;
  }

  console.log(`Arrivato evento: ${event.type}`);
  // Handle the event - https://stripe.com/docs/api/events/types
  switch (event.type) {
    case 'payment_intent.payment_failed':
      const paymentIntentFailed = event.data.object as Stripe.PaymentIntent;
      //console.log('paymentIntentFailed');
      //console.log(paymentIntentFailed);

      //mandalo global...ma come???

      /*if (paymentIntentFailed.metadata?.entry_id) {
        await updateEntry(paymentIntentFailed.metadata.entry_id, { payment_id: paymentIntentFailed.id, payment_status: 'failed' })
      } else {
        console.error('Mancano dati ')
      }*/
      break;
    case 'checkout.session.completed':
      const checkoutSessionCompleted = event.data.object as Stripe.Checkout.Session;
      const payment_intent = checkoutSessionCompleted.payment_intent as string;
      //console.log(checkoutSessionCompleted);

      /*if (checkoutSessionCompleted.payment_intent && checkoutSessionCompleted.metadata?.entry_id) {
        await updateEntry(checkoutSessionCompleted.metadata.entry_id, { payment_id: payment_intent, payment_status: 'succeeded' })
      } else {
        console.error('Mancano dati ')
      }*/
      break;
    default:
    //console.log(`Unhandled event type ${event.type}`);
  }
  // checkout.session.async_payment_failed

  // Return a 200 response to acknowledge receipt of the event
  res.status(200).send('');
}
