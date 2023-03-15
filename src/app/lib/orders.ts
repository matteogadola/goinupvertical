import 'server-only';

import { Order, OrderItem } from '@/types/orders';
import { Entry } from '@/types/entries';
import { createClient } from '@/lib/supabase-auth-server';
import { cache } from 'react';
import { pool } from '@/lib/pg';

export const getOrders = cache(async () => {
  //const supabase = createClient();
  //const { data } = await supabase.from('orders').select();
  //return data;

  const client = await pool.connect();

  try {
    const { rows: orders } = await client.query<Order>(`
      SELECT orders.*, array_to_json(array_agg(order_items)) AS items
      FROM orders
      INNER JOIN order_items ON orders.id = order_items.order_id
      GROUP BY orders.id`);

    return orders;
  } catch (e: any) {
    console.warn(`[getOrders] errore: ${JSON.stringify(e.message)}`);
    throw new Error(`Errore interno ${e.code}`);
  } finally {
    client.release();
  }
});
