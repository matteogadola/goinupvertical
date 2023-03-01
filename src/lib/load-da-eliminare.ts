import { doc, setDoc } from 'firebase/firestore';
import { dt } from './date';
import { db } from './firebase';
import { id } from './helpers';
import supabase from './supabase';

export const sarcazzo = async () => {
  const { data } = await supabase.from('events').select();

  for (let item of data!) {
    /*await setDoc(doc(db, 'events', item.event_id), {
      tickets: [item],
    });*/
    item.date = dt(item.date).unix();

    const { data: row } = await supabase.from('items').select().match({ event_id: item.id }).single();

    if (row !== null) {
      row.eventId = row.event_id;
      delete row.event_id;
      row.id = id();
      item.items = [row];
    }

    //item.date = dt(item.date).format();
    //await setDoc(doc(db, 'events', item.id), item);
    const orderRef = db.collection('events').doc(item.id);

    await orderRef.set(item);
  }
};
