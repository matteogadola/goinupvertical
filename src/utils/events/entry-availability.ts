import type { ConfigType, Dayjs } from 'dayjs';
import { dt } from '@/utils/date';

export const APP_TIME_ZONE = 'Europe/Rome';
export const DEFAULT_ENTRY_CLOSE_OFFSET_HOURS = 46;

export type EntryAvailabilityProduct = {
  status?: string | null;
  start_sale_date?: string | null;
  end_sale_date?: string | null;
};

export type EntryAvailabilityEvent = {
  type?: string | null;
  status?: string | null;
  date: string;
  products?: EntryAvailabilityProduct[] | null;
};

export type EntryAvailability =
  | { status: 'hidden' }
  | { status: 'closed'; showRaceDayRegistration: boolean }
  | { status: 'notStarted'; startsAt: Dayjs }
  | { status: 'open'; endsAt: Dayjs };

export function toEventDateTime(value: ConfigType): Dayjs {
  return dt(value).tz(APP_TIME_ZONE);
}

export function formatEventDate(value: ConfigType, pattern: string): string {
  return toEventDateTime(value).format(pattern);
}

export function getEntryAvailability(
  event: EntryAvailabilityEvent,
  now: ConfigType = dt(),
): EntryAvailability {
  if (event.status === 'close' || event.status === 'closed') {
    return { status: 'closed', showRaceDayRegistration: false };
  }

  if (event.status !== 'open') {
    return { status: 'hidden' };
  }

  const product = event.products?.[0];

  if (!product) {
    return { status: 'hidden' };
  }

  if (product.status !== 'open') {
    return { status: 'closed', showRaceDayRegistration: false };
  }

  const currentDate = toEventDateTime(now);
  const endsAt = product.end_sale_date
    ? toEventDateTime(product.end_sale_date)
    : toEventDateTime(event.date).subtract(DEFAULT_ENTRY_CLOSE_OFFSET_HOURS, 'hours');

  if (endsAt.isBefore(currentDate)) {
    return {
      status: 'closed',
      showRaceDayRegistration: event.type === 'race',
    };
  }

  if (product.start_sale_date) {
    const startsAt = toEventDateTime(product.start_sale_date);

    if (startsAt.isAfter(currentDate)) {
      return { status: 'notStarted', startsAt };
    }
  }

  return { status: 'open', endsAt };
}
