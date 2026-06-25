import Stripe from 'stripe'

export const createStripe = () => new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-02-25.clover',
})

export const calcStripeFee = function(items: any[]) {
  const totalAmount = items.reduce((a, v) => a + (v.price * v.quantity), 0);
  const stripeTax = 25 + Math.round(totalAmount * 0.015);
  const stripeTaxIva = Math.round(stripeTax * 0.22);
  return Math.ceil((stripeTax + stripeTaxIva) / 50) * 50;
};
