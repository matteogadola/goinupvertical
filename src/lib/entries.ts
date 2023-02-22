import supabase from './supabase'

import { Event } from '@/types/events'
import { dt } from './date'
import { Entry } from '@/types/entries'
import Stripe from 'stripe'
import { cache } from 'react'


interface GetEventsProps {
  eventId: string;
  //orderBy: string;
}

/*export async function getEntries(props?: Partial<GetEventsProps>) {
  const queryBuilder = supabase.from('entries').select()

  if (props?.fromDate) {
    queryBuilder.gte('date', props.fromDate)
  }
  if (props?.orderBy) {
    queryBuilder.order(props.orderBy, { ascending: true })
  }

  const { data } = await queryBuilder.returns<Event[]>()
  return data ?? []
}*/
type CreateEntryParams = Omit<Entry, 'id'
  | 'entrant_birth_date'
  | 'entrant_gender'
  | 'entrant_country'
  | 'detail'
  | 'bib_number'
  | 'payment_id'
  | 'payment_status'
>

interface GetEntriesProps {
  eventId: string;
  eventAlias: string;
}

// chiaramente filtro su event_alias
export const getEntries = async (props?: Partial<GetEntriesProps>) => {
  const { data } = await supabase
    .from('entries')
    .select(`
      *,
      tickets (event_alias)
    `)
    .eq('tickets.event_alias', props?.eventAlias)
    .returns<any[]>()

  return data ?? []
}

export const getEntry = async (id: string) => {
  const { data } = await supabase
    .from('entries')
    .select()
    .eq('id', id)
    .returns<Entry[]>()
    .single()

  return data
}

export async function updateEntry(id: string, params: Partial<Omit<Entry, 'id' |'ticket_id'>>) {

  const { data, error } = await supabase
    .from('entries')
    .update(params)
    .eq('id', id)

  if (error) {
    throw new Error(error.message)
  }

  return data
}