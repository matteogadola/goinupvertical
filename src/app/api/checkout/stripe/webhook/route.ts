import Stripe from 'stripe'
import * as Sentry from '@sentry/nextjs'

import type { Order, OrderItem } from '@/types/orders'
import { sendCheckoutMail } from '@/utils/mailer'
import { createClient } from '@/utils/supabase/admin'
import { createStripe } from '@/utils/stripe'

const stripe = createStripe()

export async function POST(req: Request) {
  const signature = req.headers.get('stripe-signature')
  if (!signature) return new Response('Missing Stripe signature', { status: 400 })

  let event: Stripe.Event
  try {
    event = await stripe.webhooks.constructEventAsync(
      await req.text(),
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!,
    )
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Invalid webhook'
    return new Response(`Webhook error: ${message}`, { status: 400 })
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed':
      case 'checkout.session.async_payment_succeeded':
        await handleSuccessfulCheckout(event)
        break

      case 'checkout.session.expired':
        await handleExpiredCheckout(event)
        break

      case 'payment_intent.canceled':
      case 'payment_intent.payment_failed':
        await handleFailedPayment(event)
        break

      default:
        break
    }

    return new Response('Success', { status: 200 })
  } catch (error) {
    Sentry.captureException(error, {
      tags: { stripe_event_id: event.id, stripe_event_type: event.type },
    })
    return new Response('Webhook processing failed', { status: 500 })
  }
}

async function handleSuccessfulCheckout(
  event: Stripe.CheckoutSessionCompletedEvent | Stripe.CheckoutSessionAsyncPaymentSucceededEvent,
) {
  const session = event.data.object
  if (session.payment_status !== 'paid') return

  const orderId = parseOrderId(session.metadata?.order_id)
  const paymentId = getStripeId(session.payment_intent)
  if (!paymentId || session.amount_total === null || !session.currency) {
    throw new Error(`Sessione Stripe incompleta per ordine ${orderId}`)
  }

  const supabase = createClient()
  const { data: result, error } = await (supabase as any).rpc('finalize_stripe_order', {
    _stripe_event_id: event.id,
    _event_type: event.type,
    _order_id: orderId,
    _payment_id: paymentId,
    _paid_at: new Date(event.created * 1000).toISOString(),
    _amount: session.amount_total,
    _currency: session.currency,
  })

  if (error) throw new Error(error.message)

  if (result?.outcome === 'requires_review') {
    Sentry.captureMessage('Pagamento Stripe da revisionare', {
      level: 'error',
      tags: { order_id: String(orderId), payment_id: paymentId },
    })
    return
  }

  if (result?.outcome === 'confirmed') {
    await sendConfirmationIfNeeded(orderId)
  }
}

async function handleExpiredCheckout(event: Stripe.CheckoutSessionExpiredEvent) {
  const session = event.data.object
  await failStripeOrder({
    event,
    orderId: parseOrderId(session.metadata?.order_id),
    paymentId: getStripeId(session.payment_intent),
    status: 'expired',
  })
}

async function handleFailedPayment(
  event: Stripe.PaymentIntentCanceledEvent | Stripe.PaymentIntentPaymentFailedEvent,
) {
  const payment = event.data.object
  await failStripeOrder({
    event,
    orderId: parseOrderId(payment.metadata?.order_id),
    paymentId: payment.id,
    status: 'failed',
  })
}

async function failStripeOrder({
  event,
  orderId,
  paymentId,
  status,
}: {
  event: Stripe.Event
  orderId: number
  paymentId: string | null
  status: 'failed' | 'expired'
}) {
  const supabase = createClient()
  const { error } = await (supabase as any).rpc('fail_stripe_order', {
    _stripe_event_id: event.id,
    _event_type: event.type,
    _order_id: orderId,
    _payment_id: paymentId,
    _failure_status: status,
  })

  if (error) throw new Error(error.message)
}

async function sendConfirmationIfNeeded(orderId: number) {
  const supabase = createClient()
  const { data: order, error } = await supabase
    .from('orders')
    .select('*, items:order_items(*)')
    .eq('id', orderId)
    .single()

  if (error || !order) throw new Error(error?.message || `Ordine ${orderId} non trovato`)
  if (order.notification_status && !['failed', 'error'].includes(order.notification_status)) return

  await sendCheckoutMail(order as Order & { items: OrderItem[] })

  const { error: updateError } = await supabase
    .from('orders')
    .update({
      notification_status: 'sent',
      notification_date: new Date().toISOString(),
    })
    .eq('id', orderId)

  if (updateError) throw new Error(updateError.message)
}

function parseOrderId(value: string | undefined) {
  const orderId = Number(value)
  if (!Number.isInteger(orderId) || orderId <= 0) throw new Error('order_id Stripe non valido')
  return orderId
}

function getStripeId(value: string | { id: string } | null) {
  if (!value) return null
  return typeof value === 'string' ? value : value.id
}
