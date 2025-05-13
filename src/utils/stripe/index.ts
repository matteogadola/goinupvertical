import Stripe from 'stripe'

export const createStripe = () => new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-04-30.basil',
})
