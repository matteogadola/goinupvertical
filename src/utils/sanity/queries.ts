import { client } from './client'
import clubs from '../data/names.json'
import municipalities from '../data/municipalities.json'
import { Event } from '@/types/events'

export const getSerie = async ({ year }: { year: number }) => {
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
  const today = new Date().toISOString().split('T')[0]
  return client.fetch(`*[_type == "event" && type == "race" && status != "internal" && date >= "${today}"]{
    ...,
    products[]->
  } | order(date) [0...3]`)
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

export const getPage = async (slug: string) => {
  return client.fetch(`*[_type == "page" && slug.current == $slug][0]`, { slug })
}

export const getClubs = (): string[] => {
  return clubs
}

export const getMunicipalities = (): string[] => {
  return municipalities
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

  return client.fetch<Event[]>(`*[_type == "event" && type in $types && date >= $fromDate && date < $toDate && count(links[]->url) > 0] | order(date)`, { fromDate, toDate, types: ['serie', 'race'] })
}


