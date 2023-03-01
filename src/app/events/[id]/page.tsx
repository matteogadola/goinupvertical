import Image from 'next/image'
import { Event } from '@/types/events'
import { getEvent, getEvents } from '@/lib/events'
import { getItems } from '@/lib/items'
import ItemsList from '@/components/items-list'
import { dt, getReadableDate } from '@/lib/date'
import { notFound } from 'next/navigation'

interface Params {
  id: string;
}

export default async function EventPage({
  params,
}: {
  params: Params
}) {
  const event = await getEvent(params.id)

  if (event === null || event.status === 'internal') {
    notFound()
  }

  const itemsData = getItems({ event_id: event.id })

  return (
    <div className="page grid grid-cols-1 lg:grid-cols-2">
      <div>
        <span className="overtitle">{ event.date ? dt(event.date).format('ddd DD MMM') : 'Evento' }</span>
        <h1 className="title mt-3">{ event.edition }° { event.name }</h1>
        <div className="mt-8 text-sm md:text-base" dangerouslySetInnerHTML={{ __html: event.description ?? '' }} />

        {/* se l'evento è futuro mostra items da comprare, se passato mostra link a classifica e foto */}
        <div className="mt-8">
          {/* @ts-expect-error Server Component */}
          <ItemsList list={itemsData} />
        </div>

      </div>

      <div className="flex lg:justify-end">
        {
          event.flyer && <Image
            className="mt-4 lg:mt-0"
            src={`/images/flyers/${event.flyer}`}
            alt="Flyer"
            width={500}
            height={500}
          />
        }
      </div>
      
    </div>
  )
}

/*export async function generateStaticParams() {
  const events = await getEvents()

  return events.map((event) => ({
    id: event.id,
  }))
}
*/