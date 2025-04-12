import EventEntryStatus from '@/components/events/entry-status'
import { Event } from '@/types/sanity'
import { dt } from '@/utils/date'
import { urlFor } from '@/utils/sanity'
import clsx from 'clsx'
import Link from 'next/link'
import { CSSProperties } from 'react'

type Props = {
  events: Event[]
  className?: string
}

export default async function UpcomingEvents({ events }: Readonly<Props>) {

  return (
    <div className="flex flex-col mt-32 justify-center items-center space-y-16">
      <span className="title">Prossimi eventi</span>

      <ul className={clsx("upcoming-grid", {
        "grid-2": events.length === 2,
        "grid-3": events.length === 3
        })}>
        {events.map((event, index) =>
          <Link href={`/events/${event.slug.current}`} key={index} className="upcoming-card">
            <div className="upcoming-header" style={getBackgroudStyle(event)}>
              <div className="upcoming-header-text">
                <h3 className={clsx("upcoming-header-title", { "nowrap": event.name.length <= 12})}>
                {event.name}
                </h3>

                <div className="upcoming-header-badges">
                  {(event.details?.elevation_gain ?? 0) !== 0 && <span className=" bg-blue-600 rounded-md py-0.5 px-1.5 bg-opacity-60">{event.details?.elevation_gain}D+</span>}
                  {(event.details?.distance ?? 0) !== 0 && <span className="bg-button rounded-md py-0.5 px-1.5 bg-opacity-60">{event.details?.distance}km</span>}
                </div>
              </div>
            </div>

            <div className="flex items-center px-2">
              <span className="font-unbounded text-xl uppercase">{dt(event.date).format('ddd DD MMM')}</span>
            </div>
            <div className="px-2">
              <span className="">{event.summary}</span>
            </div>
            <div className="px-2 py-4">
              <EventEntryStatus event={event} />
            </div>
            
            
          </Link>
          
        )}
      </ul>
    </div>
  )
}

function getBackgroudStyle(event: any): CSSProperties {
  let url = '/images/default-summary.webp'

  if (event.summary_image) {
    url = urlFor(event.summary_image) ?? url
  }

  return { backgroundImage: `url("${url}")`, borderRadius: '1rem 1rem 0 0' } as CSSProperties
}
