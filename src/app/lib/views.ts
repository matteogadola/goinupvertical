import 'server-only';

import { Order, OrderItem } from '@/types/orders';
import { Entry } from '@/types/entries';
import { createClient } from '@/lib/supabase-auth-server';
import { cache } from 'react';
import { pool } from '@/lib/pg';

export const getOrders = cache(async () => {
  const supabase = createClient();
  //const { data } = await supabase.from('v_orders').select();
  const { data } = await supabase.from('orders').select();
  return data;
});

export const getEntries = cache(async (event_id: string) => {
  const supabase = createClient();

  const user = (await supabase.auth.getSession()).data.session?.user;
  console.log('getEntries', user?.email);

  const { data } = await supabase.from('v_entries').select().eq('event_id', event_id).order('date');
  return data;
});
