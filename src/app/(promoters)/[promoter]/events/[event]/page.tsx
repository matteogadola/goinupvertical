'server only'

import Image from 'next/image'
import { Event } from '@/types/events'
import { getEvent, getEvents } from '@/lib/events'
import { getItems } from '@/lib/items'
import ItemsList from '@/components/items-list'
import { dt, getReadableDate } from '@/lib/date'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { base64 } from '@/lib/helpers'
import type { GetStaticPaths, GetStaticProps, Metadata } from 'next'
import { getPromoter, getPromoters } from '@/app/lib/promoters'

type Props = {
  params: { promoter: string, event: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

/*export async function generateMetadata({ params }) {
  return {
    title: '...',
  };
}*/

export default async function PromoterPage({ params }: Props) {
  console.log("DENTRO EVENTS", params)
  /*
  const event = await getEvent(params.id)

  if (event === null || event.status === 'internal') {
    notFound()
  }

  const items = await getItems({ eventId: event.id, status: 'published' })
  */

  return (
    <>

    </>
  )
}

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const promoter = await getPromoter(params.promoter);
  const event = await getEvent(params.event);

  return {
    title: [event?.name, promoter?.name].filter(item => item).join(' | '),
  };
}

export const getStaticPaths: GetStaticPaths = async () => {
  //const promoters = await getPromoters();
  //const paths = promoters.map(item => ({ params: { alias: item.alias } }));

  return {
    paths: [
      { params: { promoter: 'goinup', event: 'tre' } },
      { params: { promoter: 'team-valtellina', event: 'due' } },
    ],
    fallback: false,
  }
}

/*export const getStaticProps: GetStaticProps = async ({ params }) => {
  const event = await getEvent(params.event);

  return {
    props: {
      event,
    },
    revalidate: 1800,
  }
}*/