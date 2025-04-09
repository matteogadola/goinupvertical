'use server'

import { Event } from "@/types/events";
import { getEventLinks } from "@/utils/sanity/queries";

export async function getLinksByYear(year: number): Promise<Event[]> {
  return getEventLinks({ year });
}
