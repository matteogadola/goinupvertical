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

  if (event === null) {
    notFound()
  }

  const itemsData = getItems({ event_id: event.id })

  return (
    <div className="page grid grid-cols-1 md:grid-cols-2 justify-items-center">
      <div>
        <span className="title-accent">{getReadableDate(event.date)}</span>
        <h1 className="title mt-3">{ event.edition }° { event.name }</h1>
        <p className="text mt-2">
          Prima gara blablabla<br />
          Partenza dal campo di ... con arrivo al ...<br />
          Panino mica panino rinfresco mica rinfresco ecc<br />
          In questa specifica gara si potrà acquistare anche il carnet per tutte le gare che permette di ottenere la maglietta
          ufficiale del circuito - 1° PROVA CIRCUTO GOinUP
        </p>

        <div className="mt-8">
          {/* @ts-expect-error Server Component */}
          <ItemsList list={itemsData} />
        </div>

      </div>
      <div>
        <Image
          className="sm:mt-4"
          src="/images/poster.jpg"
          alt="Picture of the author"
          width={500}
          height={500}
        />
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