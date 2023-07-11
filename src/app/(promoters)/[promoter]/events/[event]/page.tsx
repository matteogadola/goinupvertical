import Image from 'next/image'
import { Event } from '@/types/events'
import { getEvent, getEvents } from '@/lib/events'
import { getItems } from '@/lib/items'
import ItemsList from '@/components/items-list'
import { dt, getReadableDate } from '@/lib/date'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { base64 } from '@/lib/helpers'
import { GetStaticPaths, Metadata, ResolvingMetadata } from 'next/types'
import { getPromoter } from '@/lib/promoters'

interface Params {
  promoter: string;
  event: string;
}

interface Props {
  params: Params;
  //searchParams: { [key: string]: string | string[] | undefined };
}

export default async function EventPage({
  params,
}: {
  params: Params
}) {
  console.log(params.event)
  const event = await getEvent(params.event) as Event;

  /*if (event === null || event.status === 'internal') {
    notFound();
  }

  const items = await getItems({ eventId: event.id, status: 'published' })*/

  return (
    <section className="page">
      lolle
    </section>
  )
}

export const dynamicParams = false;
export const revalidate = 21600; // 6h

export async function generateStaticParams() {
  const events = await getEvents();

  return events.map(event => ({
    promoter: event.promoter_id,
    event: event.id
  }))
}

export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const promoter = await getPromoter(params.promoter);
  const event = await getEvent(params.event);

  return {
    title: [event?.name, promoter?.name].filter(Boolean).join(' | '),
  }
}

/*export async function generateStaticParams() {
  const events = await getEvents()

  return events.map((event) => ({
    id: event.id,
  }))
}*/
