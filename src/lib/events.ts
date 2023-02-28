import supabase from './supabase';

import { Event } from '@/types/events';
import { dt } from './date';
import { cache } from 'react';

interface GetEventsProps {
  fromDate: string;
  orderBy: string;
  limit: number;
  notInternal: boolean;
}

export const getEvents = cache(async (props?: Partial<GetEventsProps>) => {
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
});

export const getEvent = cache(async (id: string) => {
  const { data } = await supabase.from('events').select().eq('id', id).returns<Event[]>().single();

  return data;
});

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
