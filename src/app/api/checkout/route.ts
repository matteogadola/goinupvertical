import { invoke } from '@/utils/supabase/functions'
import { encodeBase64 } from '@/utils/encoding'
import { Order } from '@/types/orders'

export async function POST(req: Request) {
  const payload = await req.json()
  const origin = req.headers.get('origin')

  try {
    console.debug('Checkout payload', payload)
    const order = await invoke<Order>('order', payload)
    console.debug('Checkout order', order)

    const q = encodeBase64(JSON.stringify(order));

    if (['cash', 'sepa'].includes(order.payment_method)) {
      await invoke('mail-checkout', order)

      return new Response(JSON.stringify({order, checkoutSessionUrl: `${origin}/checkout/confirm?q=${q}`}), {
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
    console.error(`Checkout error: ${e.message}`)
    return new Response(JSON.stringify({ code: e.code, error: e.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
    })
  }
}
