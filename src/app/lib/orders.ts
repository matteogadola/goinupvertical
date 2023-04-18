import supabase from 'src/lib/supabase';

import { Event } from '@/types/events';
import { cache } from 'react';
import { Order, OrderItem } from '@/types/orders';

export const getOrders = cache(async () => {
  //const supabase = createClient();
  const { data } = await supabase.from('orders').select();

  return data;
});

export const getOrder = async (id: number) => {
  const { data } = await supabase.from('orders').select().eq('id', id).returns<Order[]>().single();

  if (data !== null) {
    const { data: items } = await supabase.from('order_items').select().eq('order_id', id).returns<OrderItem[]>();
    data.items = items ?? [];
  }

  return data;
};

export const updateOrder = async (id: number, params: Partial<Order>) => {
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
