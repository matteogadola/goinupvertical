import type { Metadata, ResolvingMetadata } from 'next'
import Link from 'next/link';
import { getEvent, getEvents } from '@/utils/sanity/queries';
import { urlFor } from '@/utils/sanity';
import { notFound } from 'next/navigation';
import { dt } from '@/utils/date';
import EventProducts from './event-products';
import EventAttachment from './event.attachment';
import Credits from '@/components/credits';
import { PortableText, PortableTextReactComponents } from '@portabletext/react'

interface Params {
  slug: string;
}

interface Props {
  params: Params;
  searchParams: { [key: string]: string | string[] | undefined };
}

const components: Partial<PortableTextReactComponents> = {
  marks: {
    link: ({value, children}) => {
      const target = (value?.href || '').startsWith('http') ? '_blank' : undefined
      return (
        <a href={value?.href} target={target} rel={target === '_blank' ? 'noindex nofollow' : ''} className='link'>
          {children}
        </a>
      )
    }},
  list: {
    bullet: ({children}) => <ul className="my-2">{children}</ul>,
  },
  listItem: {
    bullet: ({children}) => <li style={{
      listStyleType: 'disc',
      listStylePosition: 'inside'
    }}>{children}</li>,
  },
  block: {
    normal: ({children}) => <p className="mb-2">{children}</p>,
  },
}

export const revalidate = 1800 // 30 minutes
export const dynamic = 'force-static';
export const dynamicParams = true;

export async function generateStaticParams() {
  const events = await getEvents()

  return events.map((event: any) => ({
    slug: event.slug.current
  }))
}

// https://nextjs.org/docs/app/api-reference/functions/generate-metadata
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const event = await getEvent(slug);

  return {
    title: event.name,
    keywords: ['goinup', 'vertical', ''], // aggiungi città o keywords/tags in schema
  }
}

export default async function EventPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const event = await getEvent(slug);

  if (event === null || event.status === 'internal') {
    notFound();
  }

  const flyer = event.products?.[0]?.summary_image || event.flyer

  //const items = await getItems({ eventId: event.id, status: 'published' })


  return (
    <div className="event-grid">
      <div>
        {event.date && <span className="font-unbounded capitalize px-1 bg-yellow-200">{dt(event.date).format('ddd DD MMM')}</span>}
        <h1 className="font-unbounded text-2xl font-semibold uppercase">{event.name}</h1>
        {(!!event.description && Array.isArray(event.description))
          ? <div className="mt-8 text-sm md:text-base">
              <PortableText value={event.description} components={components} />
            </div>
          : <div className="mt-8 text-sm md:text-base" dangerouslySetInnerHTML={{ __html: event.description ?? event.summary ?? '' }} />
        }

        <div className="flex flex-col mt-8 space-y-4">
          {event.products !== null &&
            <Link href={event.regulation ?? "/regulation"}>
              <span className="link">Consulta il regolamento</span>
            </Link>
          }
          {!!event.products?.length &&
            <Link href={`${slug}/entries`}>
              <span className="link">Vedi elenco iscritti</span>
            </Link>
          }
        </div>
      </div>

      <div className="rows-2">
        {!!flyer &&
          <img
            src={urlFor(flyer)}
            className="aspect-auto"
            alt="Flyer"
            width={512}
          />
        }
      </div>

      {dt(event.date).isAfter()
        ? <EventProducts event={event} />
        : <EventAttachment event={event} />
      }
    </div>
  )

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2">
      <div>
        {event.date && <span className="font-unbounded capitalize px-1 bg-yellow-200">{dt(event.date).format('ddd DD MMM')}</span>}
        <h1 className="font-unbounded text-2xl font-semibold uppercase">{event.name}</h1>
        <div className="mt-8 text-sm md:text-base" dangerouslySetInnerHTML={{ __html: event.description ?? event.summary ?? '' }} />

        <div className="flex flex-col mt-8 space-y-4">
          <Link href={event.regulation ?? "/regulation"}>
            <span className="link">Consulta il regolamento</span>
          </Link>
          <Link href={`${slug}/entries`}>
            <span className="link">Vedi elenco iscritti</span>
          </Link>
        </div>

        <div className="pt-8">
          <EventProducts event={event} />
        </div>
      </div>

      <div className="flex lg:justify-center items-start">
        {!!flyer &&
          <img
            src={urlFor(flyer)}
            className="mt-4 lg:mt-0 aspect-auto"
            alt="Flyer"
            width={500}
            height={500}
          />
        }
      </div>

    </div>
  )
}
