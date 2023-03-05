import { getItem } from '@/lib/items'
import Link from 'next/link'
import Image from 'next/image'

import { base64 } from '@/lib/helpers'
import { Suspense } from 'react'
import { getEvents } from '@/lib/events'
import { dt, getDate } from '@/lib/date'
//import { base64 } from '@/lib/helpers'

import goinup from 'public/images/credits/goinup.png'

import elevation from 'public/images/icons/altitude-2.svg'
import distance from 'public/images/icons/distance-2.svg'
import ph1 from 'public/images/dalle-8.png'
import ph2 from 'public/images/dalle-5.png'
import ph3 from 'public/images/dalle-6.png'
import classNames from 'classnames'
import Spinner from '@/components/spinner'

const images = [ph1, ph2, ph3]

// https://tailwindcomponents.com/component/tags
//export default async function HomeBanner({ ticket }: { ticket: Ticket }) {
export default async function HomeGoinupCalendar({ className }: { className?: string }) {
  const events = await getEvents({ fromDate: dt().format(), orderBy: 'date', promoterId: 1 })
  
  return (
    <Suspense fallback={<Spinner />}>
      { events.length > 0 &&
      <section className={classNames(className, "")}>
        <div className="text-center">
          <h3 className="overtitle">Calendario</h3>
          <h1 className="title">Circuito</h1>
        </div>

        <div className="w-full">
          <table className="mt-12 m-auto">
            <tbody>
              { events.map((event, index) =>
                <tr key={index} className="font-unbounded">
                  <td className="py-4">
                    <span className="font-semibold text-accent text-lg lg:text-xl uppercase">
                      { dt(event.date).format('ddd DD MMM') }
                    </span>
                  </td>
                  <td className="py-4 pl-4 lg:pl-8">
                    <span className="font-semibold text-lg lg:text-xl uppercase">
                      {event.category === 'race' ? `${event.edition}^ ` : ''}{event.name}
                    </span>
                  </td>
                  <td className="py-4 pl-4 lg:pl-8">
                    <span className="font-light text-base lg:text-xl">
                      {event.detail?.location ? event.detail.location : 
                      event.detail?.startLine && event.detail?.finishLine ? `${event.detail?.startLine} - ${event.detail?.finishLine}` : ''
                      }
                    </span>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
      }
    </Suspense>
  )
}
