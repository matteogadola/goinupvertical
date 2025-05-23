import { createClient } from './server'
import clubs from '../data/names.json'

export const getUpcomingEvents = async () => {
  const supabase = await createClient()
  const today = new Date().toISOString().split('T')[0]

  const { data } = await supabase
    .from('events')
    .select(`
      *,
      promoter:promoters (id, name, stripe_account),
      items (*)`
    )
    .neq('status', 'internal')
    .gte('date', today)
    .order('date', { ascending: true })
    .limit(3)
    .returns<Event[]>()

  return data ?? [];

  //return client.fetch(`*[_type == "event" && status != "internal" && date >= "${today}"] | order(date) [0...2]`)
}

export const getEvent = async (query: Partial<{ id: string, slug: string }>) => {
  const supabase = await createClient()

  const { data } = await supabase
    .from('events')
    .select()
    .match(query)
    .single()

  return data
}

export const getProduct = async (query: Partial<{ id: string, slug: string }>) => {
  const supabase = await createClient()

  const { data } = await supabase
    .from('products')
    .select()
    .match(query)
    .single()

  return data
}

export const getClubs = (): string[] => {
  return clubs
}
