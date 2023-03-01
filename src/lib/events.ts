import supabase from './supabase';

import { Event } from '@/types/events';
import { dt } from './date';
import { cache } from 'react';
import { db } from './firebase';
import { collection, doc, getDoc, getDocs, limit, orderBy, query, where } from 'firebase/firestore';

interface GetEventsProps {
  fromDate: string;
  orderBy: string;
  limit: number;
  notInternal: boolean;
}

export const getEvents = async (props?: Partial<GetEventsProps>) => {
  const snapshot = await db
    .collection('events')
    .where('date', '>=', dt(props?.fromDate ?? '2023-03-01').unix())
    .orderBy('date', 'asc')
    .get();

  let events: Event[] = [];
  snapshot.forEach((doc) => {
    events.push(doc.data() as Event);
  });

  // per fare cache questo fallo lato client! e metti in store???
  if (props?.notInternal) {
    events = events.filter((event) => event.status != 'internal');
  }
  if (props?.limit) {
    events = events.slice(0, props.limit);
  }

  return events;

  /*
  const constraints = [];

  console.log(props);
  if (props?.fromDate) {
    citiesRef.where('date', '>=', dt(props.fromDate).unix());
  }
  if (props?.notInternal) {
    citiesRef.where('status', '==', 'internal');
  }
  if (props?.orderBy) {
    console.log('order');
    citiesRef.orderBy(props.orderBy, 'asc');
  }
  if (props?.limit) {
    console.log('limit');
    citiesRef.limit(props.limit);
  }

  const snapshot = await citiesRef.get();
  if (snapshot.empty) {
    return [];
  }

  //return [...snapshot].reduce((a, c) => a.push(c.data()), [])
  const events: Event[] = [];
  snapshot.forEach((doc) => {
    events.push(doc.data() as Event);
    //console.log(doc.id, '=>', doc.data());
  });

  return events;
  */

  /*
  if (props?.fromDate) {
    constraints.push(where('date', '>=', dt(props.fromDate).unix()));
  }
  if (props?.orderBy) {
    constraints.push(orderBy(props.orderBy));
  }

  const q = query(collection(db, 'events'), ...constraints);

  let events = await getDocs(q).then((querySnapshot) =>
    querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id } as Event))
  );

  if (props?.notInternal) {
    events = events.filter((event) => event.status != 'internal');
  }
  if (props?.limit) {
    events = events.slice(0, props.limit);
  }

  return events;
  */

  /*
  const queryBuilder = supabase.from('events').select().neq('status', 'internal');

  if (props?.fromDate) {
    queryBuilder.gte('date', props.fromDate);
  }
  if (props?.notInternal) {
    queryBuilder.neq('status', 'internal');
  }
  if (props?.orderBy) {
    queryBuilder.order(props.orderBy, { ascending: true });
  }
  if (props?.limit) {
    queryBuilder.limit(props.limit);
  }

  const { data } = await queryBuilder.returns<Event[]>();
  return data ?? [];
  */
};

export const getEvent = async (id: string) => {
  //const { data } = await supabase.from('events').select().eq('id', id).returns<Event[]>().single();

  //return data;

  const snapshot = await db.collection('events').doc(id).get();

  if (snapshot.data()) {
    return snapshot.data() as Event;
  }
  return null;

  /*snapshot.forEach(doc => {
    console.log(doc.id, '=>', doc.data());
  });

  const docSnap = await getDoc(doc(db, 'events', id));

  if (docSnap.exists()) {
    return { ...docSnap.data(), id } as Event;
  }

  return null;*/
};

export async function createEvent(race: Omit<any, 'id'>) {
  /*  const normalizedName = race.name
    .replace(/[ÀÁÂÃÄÅ]/g,'A')
    .replace(/[ÈÉÊË]/g,'E')
    .replace(/[Î]/g,'I')
    .replace(/[Ô]/g,'O')
    .replace(/[Ù]/g,'U')
    .replace(/[àáâãäå]/g,'a')
    .replace(/[èéêë]/g,'e')
    .replace(/[ìíîï]/g,'i')
    .replace(/[òóôõö]/g,'o')
    .replace(/[ù]/g,'u')
    .replace(/[^a-zA-Z0-9]/g,'-')
    .toLowerCase();

  return await setDoc(doc(db, 'races', `${normalizedName}-${race.edition}`), race);*/
}
