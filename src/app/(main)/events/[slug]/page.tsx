import type { Metadata } from 'next'
import Image from 'next/image';
import { getEvent, getEvents } from '@/utils/sanity/queries';
import { urlFor } from '@/utils/sanity';
import { notFound } from 'next/navigation';
import { formatEventDate, toEventDateTime } from '@/utils/events/entry-availability';
import EventProducts from './event-products';
import EventAttachment from './event.attachment';
import { PortableText, PortableTextReactComponents } from '@portabletext/react'
import { Box, Button, CSSProperties } from '@mantine/core';
import { ScrollAnimation } from '@/components/animations/scroll-animation';
import Link from 'next/link';

const components: Partial<PortableTextReactComponents> = {
  marks: {
    link: ({ value, children }) => {
      const target = (value?.href || '').startsWith('http') ? '_blank' : undefined
      return (
        <a href={value?.href} target={target} rel={target === '_blank' ? 'noindex nofollow' : ''} className='link'>
          {children}
        </a>
      )
    }
  },
  list: {
    bullet: ({ children }) => <ul className="my-2">{children}</ul>,
  },
  listItem: {
    bullet: ({ children }) => <li style={{
      listStyleType: 'disc',
      listStylePosition: 'inside'
    }}>{children}</li>,
  },
  block: {
    normal: ({ children }) => <p className="mb-2">{children}</p>,
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

  if (event === null || (process.env.DEPLOY_STAGE === 'production' && event.status === 'internal')) {
    notFound();
  }

  const flyer = event.products?.[0]?.summary_image || event.flyer

  //const items = await getItems({ eventId: event.id, status: 'published' })


  return (
    <>
    <Box h="80vh">
      <section className="relative -top-20 w-full h-full min-h-[600px] overflow-hidden bg-gray-900">
        <div className="absolute inset-0 z-0">
          <Image
            src={urlFor(event.summary_image)}
            alt="image alt"
            fill
            priority
            className="object-cover object-center opacity-90"
            sizes="100vw"
          />
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-white/20" aria-hidden="true" />
          
          {/* Gradiente dal basso */}
          <div className="absolute inset-0 bg-linear-to-t from-gray-900 via-transparent to-transparent opacity-80" aria-hidden="true" />
        </div>

        <div className="relative z-10 flex flex-col mt-[150px] lg:mt-[200px] px-2 text-primary font-archivo sm:px-4 lg:px-6 max-w-6xl mx-auto">
          <h1 className="flex flex-col text-center uppercase">
            <ScrollAnimation animation="slide-left" delay={0.08} width='100%'>
              <span className="text-6xl lg:text-8xl">
                {event.name}
              </span>
            </ScrollAnimation>
            <ScrollAnimation animation="slide-left" delay={0.12} width='100%'>
              <span className=" text-4xl lg:text-5xl text-accent">
                {event.details?.finish_line}
              </span>
            </ScrollAnimation>
          </h1>
        </div>
      </section>
    </Box>
    
    <div className="event-grid">
      <div>
        {event.date && <span className="font-unbounded uppercase font-semibold text-accent">{formatEventDate(event.date, 'ddd DD MMM')}</span>}
        {/*<h1 className="font-unbounded text-2xl font-semibold uppercase">{event.name}</h1>*/}
        {(!!event.description && Array.isArray(event.description))
          ? <div className="mt-8 text-sm md:text-base">
            <PortableText value={event.description} components={components} />
          </div>
          : <div className="mt-8 text-sm md:text-base" dangerouslySetInnerHTML={{ __html: event.description ?? event.summary ?? '' }} />
        }

        <div className="flex flex-col mt-8 space-y-4">
          {event.products !== null &&
            <Link href={event.regulation ?? "/regulation"} prefetch={false}>
              <span className="link">Consulta il regolamento</span>
            </Link>
          }
          {(['race', 'award'].includes(event.type) && event.products?.length) &&
            <Link href={`${slug}/entries`} prefetch={false}>
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

      {toEventDateTime(event.date).isAfter()
        ? <EventProducts event={event} />
        : <EventAttachment event={event} />
      }
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-2 bg-primary p-4">
      <div className="flex flex-col items-center justify-center text-white">
        <h2 className="font-unbounded text-4xl uppercase">Assicurati la partenza</h2>
        <p>Join the ranks of those who dare to conquer the vertical. Spaces are limited.</p>
        <Link href={`${slug}/entries`} prefetch={false} passHref className="mt-8">
          <Button variant="outline" component="a" color="yellow">Vedi elenco iscritti</Button>
        </Link>
      </div>
      <EventProducts event={event} className="p-8" />
    </div>
    </>
  )
}
