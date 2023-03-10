import supabase from './supabase';

import { Item } from '@/types/items';
import { dt } from './date';
import { cache } from 'react';

interface GetTicketsProps {
  event_id: string;
}

// da rivedere
export const getItems = cache(async (props?: Partial<GetTicketsProps>) => {
  const builder = supabase.from('items').select(); //.select(props?.event_id ? '*, events_items!inner(event_id)' : '*');

  if (props?.event_id) {
    builder.eq('event_id', props.event_id);
  }

  const { data } = await builder.returns<Item[]>();
  return data ?? [];
});

export const getItem = cache(async (id: number) => {
  if (id < 1001) return null;

  const { data } = await supabase.from('items').select().eq('id', id).returns<Item[]>().single();

  return data;
});
