'use server'

import { Event } from "@/types/events";
import { getAvailableYears, getEventResults } from "@/utils/sanity/queries";

export { getAvailableYears };

export async function getResultsByYear(year: number): Promise<Event[]> {
  return getEventResults({ year });
}