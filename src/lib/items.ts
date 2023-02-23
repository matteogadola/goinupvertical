import supabase from './supabase'

import { Item } from '@/types/items'
import { dt } from './date'

interface GetTicketsProps {
  event_id: string;
}

// da rivedere
export async function getItems(props?: Partial<GetTicketsProps>) {
  const builder = supabase.from('items').select(props?.event_id ? '*, events_items!inner(event_id)' : '*')

  if (props?.event_id) {
    builder.eq('events_items.event_id', props.event_id)
  }

  const { data } = await builder.returns<Item[]>()
  return data ?? []
}

export const getItem = async (id: number) => {
  if (id < 1001) return null

  const { data } = await supabase
    .from('items')
    .select()
    .eq('id', id)
    .returns<Item[]>()
    .single()

  return data
}
