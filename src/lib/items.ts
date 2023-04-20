import supabase from './supabase';

import { Item, ItemStatus } from '@/types/items';
import { dt } from './date';
import { cache } from 'react';

interface GetItemsProps {
  eventId: string;
  status: ItemStatus;
}

// da rivedere
export const getItems = cache(async (props?: Partial<GetItemsProps>) => {
  const builder = supabase.from('items').select(); //.select(props?.event_id ? '*, events_items!inner(event_id)' : '*');

  if (props?.eventId) {
    builder.eq('event_id', props.eventId);
  }
  if (props?.status) {
    builder.eq('status', props.status);
  }
  const { data } = await builder.returns<Item[]>();
  return data ?? [];
});

export const getItem = cache(async (id: number) => {
  const { data } = await supabase.from('items').select().eq('id', id).returns<Item[]>().single();
  return data;
});
