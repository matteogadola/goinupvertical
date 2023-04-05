'use client';

import { Suspense, useState } from 'react'
import classNames from 'classnames'
import Spinner from '@/components/spinner'
import { Event } from '@/types/events'
import EventContent from './event-content';

export default function Events({ events, className }: { events: Event[], className?: string }) {
  const [event, setEvent] = useState<Event | undefined>(undefined)

  const selectEvent = (event: Event) => {
    setEvent(event);
  }
  
  return (
    <Suspense fallback={<Spinner />}>
      { events?.length &&
        <section className={classNames(className, "flex")}>

          <div>
            <ul className="separator">
            { events.map((item, index) =>
              <li key={index} className="py-2 whitespace-nowrap">
                <button onClick={() => selectEvent(item)} className={classNames({'font-semibold': event?.id === item.id}, "hover:opacity-80")}>{item.name}</button>
              </li>
            )}
            </ul>
          </div>

          <div className="pl-10 pt-1">
            <EventContent event={event} />
          </div>

        </section>
      }
    </Suspense>
  )
}
