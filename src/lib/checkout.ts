import Stripe from 'stripe';
import getStripe from './stripe';
import { Order, OrderItem } from '@/types/orders';

// https://supabase.github.io/wrappers/stripe/

export async function createCheckout(orderData: Pick<Order, 'user_email' | 'payment_method' | 'items'>) {
  const response = await fetch('/api/checkout', {
    method: 'POST',
    body: JSON.stringify(orderData),
    headers: {
      'content-type': 'application/json',
    },
    cache: 'no-cache',
  });
  const body = await response.json();

  if (response.status === 500) {
    throw new Error(body.error);
  }

  if (body.payment_method === 'stripe') {
    console.log('son stripe eh!!! ' + body.checkoutSessionId);
    //const session: Stripe.Checkout.Session = body.session;
    const stripe = await getStripe();

    try {
      await stripe!.redirectToCheckout({
        sessionId: body.checkoutSessionId,
      });
    } catch (e: any) {
      console.log('non dovrei comunque arrivare qui...');
      console.log(e.message);
    }

    // browser or network error
    /*if (error) {
      console.log('SONO in ERR?');
      console.log(error.message);
      // update order! con errore
      throw error;
    }*/
  } else {
    return body;
  }
}
