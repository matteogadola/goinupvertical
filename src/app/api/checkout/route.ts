import * as Sentry from '@sentry/nextjs';
import { NextResponse } from 'next/server'
import { invoke } from '@/utils/supabase/functions'
import type { Order } from '@/types/orders'
import {
  assertOrderConfirmationSecret,
  createOrderConfirmationToken,
  ORDER_CONFIRMATION_COOKIE,
  ORDER_CONFIRMATION_TTL_SECONDS,
} from '@/utils/order-confirmation-token'

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  const payload = await req.json()
  const origin = new URL(req.url).origin
  const isManualPayment = ['cash', 'sepa', 'on-site'].includes(payload.payment_method)

  try {
    if (isManualPayment) assertOrderConfirmationSecret()

    const order = await invoke<Order>('order', payload);

    if (isManualPayment) {
      try {
        await invoke('mail-checkout', order)
      } catch (mailError) {
        Sentry.captureException(mailError, { tags: { order_id: String(order.id) } })
      }

      const response = NextResponse.json({
        order,
        checkoutSessionUrl: new URL('/checkout/confirm', origin).toString(),
      })
      response.cookies.set(ORDER_CONFIRMATION_COOKIE, createOrderConfirmationToken(order.id), {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/checkout/confirm',
        maxAge: ORDER_CONFIRMATION_TTL_SECONDS,
        priority: 'high',
      })
      response.headers.set('Cache-Control', 'private, no-store, max-age=0')
      return response
    } else if (order.payment_method === 'stripe') {
      const session = await invoke('stripe-checkout', { order, origin })

      return new Response(JSON.stringify({ ...order, checkoutSessionId: session.id, checkoutSessionUrl: session.url }), {
        status: 200,
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
      })
    } else {
      throw new Error('Metodo di pagamento non supportato');
    }
  } catch (e: any) {
    Sentry.logger.error(`Checkout error: ${e.message}`, { error: e })
    return new Response(JSON.stringify({ code: e.code, message: e.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
    })
  }
}
