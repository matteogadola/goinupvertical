'use server'

import { Event } from "@/types/events";
import { getEventResults } from "@/utils/sanity/queries";

export async function getResultsByYear(year: number): Promise<Event[]> {
  return getEventResults({ year });
}