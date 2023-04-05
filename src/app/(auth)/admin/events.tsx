'use client';

import { getItem } from '@/lib/items'
import Link from 'next/link'
import Image from 'next/image'

import { base64 } from '@/lib/helpers'
import { Suspense, useState } from 'react'
import { getEvents } from '@/lib/events'
import { dt, getDate } from '@/lib/date'
//import { base64 } from '@/lib/helpers'

import goinup from 'public/images/credits/goinup.png'

import classNames from 'classnames'
import Spinner from '@/components/spinner'
import { getOrders, getEntries } from '@/app/lib/views'
import { Event } from '@/types/events'
import { useSupabase } from '@/app/components/supabase-provider';
import EventContent from './event-content';

// https://tailwindcomponents.com/component/tags
//export default async function HomeBanner({ ticket }: { ticket: Ticket }) {
export default function Events({ events, className }: { events: Event[], className?: string }) {
  const { supabase, session } = useSupabase()
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
