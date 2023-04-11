'use client';

import { cache, Suspense, useEffect, useState } from 'react'
import classNames from 'classnames'
import Spinner from '@/components/spinner'
import { Event } from '@/types/events'
import EventContent from './event-content';
import { createClient } from '@/lib/supabase-auth-browser';
import { dt } from '@/lib/date';

interface State {
  events: Event[];
  event: Event | undefined;
}

const supabase = createClient();

const fetchEvents = cache(async () => {
  const { data } = await supabase
    .from('events')
    .select()
    .neq('status', 'hidden')
    .gte('date', dt().startOf('year').format())
    .order('date', { ascending: true })
    .returns<Event[]>();
  return data ?? [];
});

export default function Events({ className }: { className?: string }) {
  const [state, setState] = useState<State>({ events: [], event: undefined });

  useEffect(() => {
    fetchEvents()
      .then(events => setState({ ...state, events }))
      .catch(() => setState({ ...state, events: [] }))
  }, []);

  const selectEvent = (event: Event) => {
    setState({ ...state, event })
  }

  return (
    <Suspense fallback={<Spinner />}>
      <section className="page">
        { !!state.events.length &&
          <div className={classNames(className, "flex")}>

            <div>
              <ul className="separator">
              { state.events.map((item, index) =>
                <li key={index} className="py-2 whitespace-nowrap">
                  <button onClick={() => selectEvent(item)} className={classNames({'font-semibold': state.event?.id === item.id}, "hover:opacity-80")}>{item.name}</button>
                </li>
              )}
              </ul>
            </div>

            <div className="pl-10 pt-1">
              <EventContent event={state.event} />
            </div>

          </div>
        }
      </section>
    </Suspense>
  )
}
