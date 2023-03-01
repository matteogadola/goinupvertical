import supabase from './supabase';

import { Item } from '@/types/items';
import { dt } from './date';
import { doc, getDoc } from 'firebase/firestore';
import { db } from './firebase';
import { cache } from 'react';

interface GetItemsProps {
  event_id: string;
}

export const getItems = cache(async (props?: Partial<GetItemsProps>) => {
  if (props?.event_id) {
    const doc = await db.collection('events').doc(props.event_id).get();
    return doc.data()?.items ?? [];
  } else {
    const snapshot = await db.collection('events').get();
    let items: Item[] = [];
    snapshot.docs.forEach((doc) => {
      if (doc.data().items) {
        items.concat(doc.data().items);
      }
    });
    return items;
  }

  //return { ...snapshot.data(), eventId: props?.event_id }

  /*let items: Item[] = [];
  snapshot.forEach((doc) => {
    items.push(doc.data()['items'] as Item);
  });

  console.log(items);

  return items[0];*/

  /*const builder = supabase.from('items').select(); //.select(props?.event_id ? '*, events_items!inner(event_id)' : '*');

  if (props?.event_id) {
    builder.eq('event_id', props.event_id);
  }

  const { data } = await builder.returns<Item[]>();
  return data ?? [];*/
});

/*export const getItem = async (id: number) => {
  if (id < 1001) return null;

  const { data } = await supabase.from('items').select().eq('id', id).returns<Item[]>().single();

  return data;
};*/
