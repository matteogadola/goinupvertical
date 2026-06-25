import {
  formatEventDate,
  getEntryAvailability,
} from '@/utils/events/entry-availability';
import type { EntryAvailabilityEvent } from '@/utils/events/entry-availability';

type Props = {
  event: EntryAvailabilityEvent;
};

export default function EventEntryStatus({ event }: Props) {
  const availability = getEntryAvailability(event);

  if (availability.status === 'hidden') {
    return null;
  }

  if (availability.status === 'closed') {
    if (availability.showRaceDayRegistration) {
      return (
        <div className="flex flex-col gap-y-1">
          <span>Iscrizioni chiuse</span>
          <span className="block text-gray-700 text-sm">disponibili alla partenza</span>
        </div>
      );
    }

    return <span>Iscrizioni chiuse</span>;
  }

  if (availability.status === 'notStarted') {
    return (
      <div className="flex flex-col gap-y-1">
        <span>Iscrizioni chiuse</span>
        <span className="block text-gray-700 text-sm">
          disponibili da {formatEventDate(availability.startsAt, 'dddd D MMMM')} alle{' '}
          {formatEventDate(availability.startsAt, 'HH:mm')}
        </span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-y-1">
      <span>
        Iscrizioni <span className="highlighted">aperte</span>
      </span>
      <span className="block text-gray-700 text-sm">
        fino a {formatEventDate(availability.endsAt, 'dddd D MMMM')} alle{' '}
        {formatEventDate(availability.endsAt, 'HH:mm')}
      </span>
    </div>
  );
}
