import Stripe from 'stripe';
import getStripe from './stripe';
import { Order, OrderItem } from '@/types/orders';

// https://supabase.github.io/wrappers/stripe/

export async function createCheckout(orderData: Pick<Order, 'user_id' | 'user_email' | 'payment_method' | 'items'>) {
  const response = await fetch('/api/checkout', {
    method: 'POST',
    body: JSON.stringify(orderData),
    headers: {
      'content-type': 'application/json',
      'cancel_url': '',
    },
    cache: 'no-cache',
  });
  const body = await response.json();

  if (response.status === 500) {
    throw new Error(body.error);
  }

  if (body.payment_method === 'stripe') {
    const stripe = await getStripe(body.stripeAccount);

    try {
      await stripe!.redirectToCheckout({
        sessionId: body.checkoutSessionId,
      });
    } catch (e: any) {
      console.error(e.message);
    }
  } else {
    return body;
  }
}
