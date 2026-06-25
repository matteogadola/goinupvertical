import EventEntryStatus from '@/components/events/entry-status';
import { getEntryAvailability } from '@/utils/events/entry-availability';
import type { EntryAvailabilityEvent } from '@/utils/events/entry-availability';
import EventEntry from './event-entry';
import EventReservation from './event-reservation';

type EventProduct = NonNullable<EntryAvailabilityEvent['products']>[number] & Record<string, unknown>;

type Props = {
  event: EntryAvailabilityEvent & {
    products?: EventProduct[] | null;
  };
};

export default async function EventProducts({ event }: Props) {
  const availability = getEntryAvailability(event);

  if (availability.status !== 'open') {
    return <EventEntryStatus event={event} />;
  }

  if (['race', 'serie'].includes(event.type ?? '')) {
    if (event.products?.length !== 1) {
      return null;
    }

    return <EventEntry event={event} product={event.products[0]} />;
  }

  if (event.type === 'award') {
    if (!event.products?.length) {
      return null;
    }

    return <EventReservation event={event} products={event.products} />;
  }

  return null;
}
