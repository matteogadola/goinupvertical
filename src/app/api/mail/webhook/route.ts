import { Order, OrderItem } from '@/types/orders'
import { createClient } from '@/utils/supabase/admin';
import * as Sentry from '@sentry/node'

/*
protezione
1.179.112.0/20
Primo indirizzo IP: 1.179.112.1
Ultimo indirizzo IP: 1.179.127.254
*/

Sentry.init({
  dsn: process.env.SENTRY_DSN,
});

export async function POST(req: Request) {
  const body = await req.json();
  //const uno = req.headers.get('x-forwarded-for');
  //console.log('uno', uno) // 1.179.112.141

  try {
    const order_id = JSON.parse(body['X-Mailin-custom'])?.order_id;
    
    if(order_id) {
      await updateOrder(order_id, {
        notification_id: body['message-id'],
        notification_date: body.date,
        notification_status: body.event,
      });
    }
  } catch(e: any) {
    Sentry.captureException(e);
    console.error('mail webhook error', e.message);
  }

  return new Response('Success!', {
    status: 200,
  })
}

const updateOrder = async (id: number, params: Partial<any>) => {
  const supabase = createClient()
  try {
    const { data, error } = await supabase.from('orders').update(params).eq('id', id);

    if (error) {
      console.warn(`[updateOrder] error: ${error.message}`);
      throw new Error(error.message);
    }

    return data;
  } catch (e: any) {
    console.warn(`[updateOrder] exception: ${e.message}`);
    throw e;
  }
};
