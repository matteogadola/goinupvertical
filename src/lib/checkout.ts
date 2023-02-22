import Stripe from 'stripe'
import getStripe from './stripe'
import { Order, OrderItem } from '@/types/orders'

// https://supabase.github.io/wrappers/stripe/

export async function createCheckout(orderData: Pick<Order, 'payment_method' | 'items'>) {

  const response = await fetch('/api/orders', {
    method: 'POST',
    body: JSON.stringify(orderData),
    headers: {
      'content-type': 'application/json',
    },
    cache: 'no-cache',
  })
  const body = await response.json()

  if (response.status === 500) {
    throw new Error(body.error)
  }

  switch (body.payment_method) {
    case 'stripe':
      return createStripeCheckout(body)
      // la mail la invia il webhook
    case 'sepa':
      // crea entry - manda mail con spiegazioni
      return //createSepaCheckout()
    case 'cash':
      // crea entry - manda mail con spiegzioni
      return
    default:
      throw new Error(`Gateway ${body.payment_method} non supportato`)
  }
}

const createStripeCheckout = async (order: Order) => {
  const response = await fetch('/api/checkout', {
    method: 'POST',
    body: JSON.stringify(order),
    headers: {
      'content-type': 'application/json',
    },
    cache: 'no-cache',
  })
  const body = await response.json()
  
  if (response.status === 500) {
    console.log(JSON.stringify(body))
    throw new Error(body)
  }

  const session: Stripe.Checkout.Session = body
  const stripe = await getStripe()

  const { error } = await stripe!.redirectToCheckout({
    sessionId: session.id,
  })

  if (error) {
    console.error(error)
    // If `redirectToCheckout` fails due to a browser or network
    // error, display the localized error message to your customer
    // using `error.message`
    throw error
  }
}
