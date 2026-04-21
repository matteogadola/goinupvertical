import { client } from './client'
import clubs from '../data/names.json'
import municipalities from '../data/municipalities.json'
import { Event } from '@/types/events'
import { LogoGroup } from '@/types/logo'
import { MentionItem } from '@/types/sanity'

export const getSerie = async ({ year }: { year?: number } = {}) => {
  if (!year) {
    year = new Date().getFullYear()
  }

  const fromDate = new Date(year, 0, 1).toISOString().split('T')[0]
  const toDate = new Date(year + 1, 0, 1).toISOString().split('T')[0]
  return client.fetch(`*[_type == "event" && type == "serie" && date >= $fromDate && date < $toDate]{
  ...,
  products[]->
  }[0]`, { fromDate, toDate })
}

export const getEvents = async ({ year }: { year?: number } = {}) => {
  if (!year) {
    year = new Date().getFullYear()
  }

  const fromDate = new Date(year, 0, 1).toISOString().split('T')[0]
  const toDate = new Date(year + 1, 0, 1).toISOString().split('T')[0]

  return client.fetch<Event[]>(`*[_type == "event" && date >= $fromDate && date < $toDate]`, { fromDate, toDate })
}

export const getUpcomingEvents = async () => {
  const today = new Date().toISOString()
  const statusCondition = process.env.DEPLOY_STAGE === 'development' ? '' : '&& status != "internal"';

  return client.fetch(`*[_type == "event" && type != "serie" && date >= $today ${statusCondition}]{
    ...,
    products[]->
  } | order(date) [0...3]`, { today })
}

export const getEvent = async (slug: string) => {
  return client.fetch(`*[_type == "event" && slug.current == $slug]{
  ...,
  products[]->
  }[0]`, { slug })

  //return client.fetch(`*[_type == "event" && slug.current == $slug][0]`, { slug })
}
/*
export const getSerieResults = async ({ year }: { year: number }) => {
  const fromDate = new Date(year, 0, 1).toISOString().split('T')[0]
  const toDate = new Date(year + 1, 0, 1).toISOString().split('T')[0]
  return client.fetch(`*[_type == "event" && type == "serie" && date >= $fromDate && date < $toDate]`, { fromDate, toDate })
}

export const getResults = async ({ year }: { year: number }) => {
  const fromDate = new Date(year, 0, 1).toISOString().split('T')[0]
  const toDate = new Date(year + 1, 0, 1).toISOString().split('T')[0]
  return client.fetch(`*[_type == "event" && type == "race" && date >= $fromDate && date < $toDate]`, { fromDate, toDate })
}*/

export const getFeatures = async () => {
  return client.fetch(`*[_type == "feature" && status == 'active'] | order(index)`)
}

export const getPage = async (slug: string) => {
  return client.fetch(`*[_type == "page" && slug.current == $slug][0]`, { slug })
}

export const getClubs = (): string[] => {
  return clubs
}

export const getMunicipalities = (): string[] => {
  return municipalities
}

export async function getAvailableYears(): Promise<number[]> {
  const statusCondition = process.env.DEPLOY_STAGE === 'production' ? '&& status != "internal"' : '';

  const results = await client.fetch<{ date: string }[]>(`*[_type == "event" && type in $types ${statusCondition}]{
    date
  } | order(date desc)`, { types: ['serie', 'race', 'award'] })
  return Array.from(new Set(results.map(({ date }: { date: string }) => new Date(date).getFullYear())))
}

export const getEventResults = async ({ year }: { year?: number } = {}) => {
  if (!year) {
    year = new Date().getFullYear()
  }

  const fromDate = new Date(year, 0, 1).toISOString().split('T')[0]
  const toDate = new Date(year + 1, 0, 1).toISOString().split('T')[0]

  return client.fetch<Event[]>(`*[_type == "event" && type in $types && date >= $fromDate && date < $toDate && count(results[]->file) > 0] | order(date)`, { fromDate, toDate, types: ['serie', 'race'] })
}

export const getEventLinks = async ({ year }: { year?: number } = {}) => {
  if (!year) {
    year = new Date().getFullYear()
  }

  const fromDate = new Date(year, 0, 1).toISOString().split('T')[0]
  const toDate = new Date(year + 1, 0, 1).toISOString().split('T')[0]

  return client.fetch<Event[]>(`*[_type == "event" && type in $types && date >= $fromDate && date < $toDate && count(links[]->url) > 0] | order(date)`, { fromDate, toDate, types: ['serie', 'race', 'award'] })
}

export const getMentions = async () => {
  return client.fetch<MentionItem[]>(`*[_type == "component" && type == "list" && slug.current == "mentions"][0].mentions`);

  //text: 'Edizione numero 4 da record per la CechUp con nuovo record di presenze e nuovi primati cronometrici sul percorso',
  //source: 'Sportdimontagna',
  //url: 'https://www.sportdimontagna.com/mountain-running/goinup-2025-2'
}

export const getCredits = async () => {
  return client.fetch<LogoGroup[]>(`*[_type == "component" && type == "logos"][0].logoGroups`);
}
