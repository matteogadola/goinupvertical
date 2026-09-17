import { render } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import EventEntryStatus from './entry-status';
import type { EntryAvailabilityEvent } from '@/utils/events/entry-availability';

function buildEvent(overrides: Partial<EntryAvailabilityEvent> = {}): EntryAvailabilityEvent {
  return {
    type: 'race',
    status: 'open',
    date: '2026-06-21T22:00:00.000Z',
    products: [
      {
        status: 'open',
        end_sale_date: '2026-06-20T17:00:00.000Z',
      },
    ],
    ...overrides,
  };
}

describe('EventEntryStatus', () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders the open status with the Europe/Rome end sale date', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-06-17T08:00:00.000Z'));

    const { container } = render(<EventEntryStatus event={buildEvent()} />);

    expect(container).toHaveTextContent('Iscrizioni aperte');
    expect(container).toHaveTextContent('20 giugno');
    expect(container).toHaveTextContent('19:00');
  });

  it('renders the future start sale date', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-06-17T08:00:00.000Z'));

    const { container } = render(
      <EventEntryStatus
        event={buildEvent({
          products: [
            {
              status: 'open',
              start_sale_date: '2026-06-18T08:00:00.000Z',
              end_sale_date: '2026-06-20T17:00:00.000Z',
            },
          ],
        })}
      />,
    );

    expect(container).toHaveTextContent('Iscrizioni chiuse');
    expect(container).toHaveTextContent('disponibili da');
    expect(container).toHaveTextContent('18 giugno');
    expect(container).toHaveTextContent('10:00');
  });

  it('renders the race-day registration note after sales close for a race', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-06-20T00:01:00.000Z'));

    const { container } = render(
      <EventEntryStatus event={buildEvent({ products: [{ status: 'open' }] })} />,
    );

    expect(container).toHaveTextContent('Iscrizioni chiuse');
    expect(container).toHaveTextContent('disponibili alla partenza');
  });

  it('renders nothing for hidden events', () => {
    const { container } = render(<EventEntryStatus event={buildEvent({ status: 'internal' })} />);

    expect(container).toBeEmptyDOMElement();
  });
});
