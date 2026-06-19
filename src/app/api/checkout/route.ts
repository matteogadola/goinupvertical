import { invoke } from '@/utils/supabase/functions'
import { Order } from '@/types/orders'
import * as Sentry from "@sentry/nextjs";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const payload = await req.json()
  const origin = new URL(req.url).origin

  try {
    const order = await invoke<Order>('order', payload)

    if (['cash', 'sepa', 'on-site'].includes(order.payment_method)) {
      try {
        await invoke('mail-checkout', order)
      } catch (mailError) {
        Sentry.captureException(mailError, { tags: { order_id: String(order.id) } })
      }

      const confirmUrl = new URL('/checkout/confirm', origin)
      confirmUrl.searchParams.set('order_id', String(order.id))
      confirmUrl.searchParams.set('token', order.checkout_token)

      return new Response(JSON.stringify({order, checkoutSessionUrl: confirmUrl.toString()}), {
        status: 200,
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
      })
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
