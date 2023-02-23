import Image from 'next/image'
import { getEvents } from '@/lib/events'
import { dt } from '@/lib/date'
import EventsList from '@/components/events-list'

import HomeBanner from '@/components/home-banner'

import Credits from '@/components/credits'

import HomeMission from '@/app/components/home-mission'
import HomeCarnet from '@/app/components/home-carnet'

import homeBrandImage from 'public/images/home-1.png'
import EventsList2 from '@/components/home-card'

// export const revalidate = 5

export default async function HomePage() {
  //const eventsData = getEvents({ fromDate: dt().format(), orderBy: 'date' })

  // {/*deve esserci possibilità di cambiare peso!*/} |||||||||||||||||||||||||||||||||||||||||||||
  return (
    <>
      <section className="lg:mt-20 grid grid-cols-1 lg:grid-cols-2 justify-items-center">
        <div className="text-title font-unbounded">
          <h1 className="text-4xl lg:text-6xl">GO<span className="text-accent">in</span>UP</h1>
          <h3 className="text-2xl lg:text-3xl">Circuito di 11 gare vertical<br />in montagna</h3>
        </div>

        <div className="hidden lg:flex lg:relative lg:-left-64 lg:-top-12 lg:-scale-x-100">
          <Image
            src={homeBrandImage}
            alt="Branding"
          />
        </div>
      </section>

      <section className="mt-20">
        {/* @ts-expect-error Server Component */}
        <HomeMission />
      </section>

      {/*<section className="mt-28">
        <HomeBanner />
      </section>*/}

      <section className="mt-28">
        {/* @ts-expect-error Server Component */}
        <HomeCarnet />
      </section>

      <section className="mt-36">
        {/* @ts-expect-error Server Component */}
        <EventsList2 />
      </section>

      <section className="mt-20">
        <Credits />
      </section>
    </>
  )
}
