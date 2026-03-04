'use server'

import { Event } from "@/types/events";
import { getAvailableYears, getEventLinks } from "@/utils/sanity/queries";

export { getAvailableYears };

export async function getLinksByYear(year: number): Promise<Event[]> {
  return getEventLinks({ year });
}
