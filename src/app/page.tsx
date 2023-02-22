import Image from 'next/image'
import { getEvents } from '@/lib/events'
import { dt } from '@/lib/date'
import EventsList from '@/components/events-list'

import HomeBanner from '@/components/home-banner'
import Credits from '@/components/credits'

import sectionOnePic from 'public/images/home-1.png'

// export const revalidate = 5

export default async function HomePage() {
  const eventsData = getEvents({ fromDate: dt().format(), orderBy: 'date' })

  // {/*deve esserci possibilità di cambiare peso!*/} |||||||||||||||||||||||||||||||||||||||||||||
  return (
    <>
      <section className="mt-8 grid grid-cols-1 md:grid-cols-2 justify-items-center">
        <div className="text-slate-800 font-unbounded">
          <h1 className="text-4xl md:text-6xl">GO<span className="text-purple-500">in</span>UP</h1>
          <h3 className="text-2xl md:text-3xl">Circuito di 11 gare vertical<br />in montagna</h3>
        </div>

        <div className="hidden md:flex md:relative md:-left-64 md:-top-12 md:-scale-x-100">
          <Image
            src={sectionOnePic}
            alt="Home 1"
          />
        </div>
      </section>

      {/* @ts-expect-error Server Component */}
      <HomeBanner />
        
      <div className="md:mx-32">
        <span className="title-accent">Eventi</span>
        <h1 className="title">In arrivo</h1>
        {/* @ts-expect-error Server Component */}
        <EventsList list={eventsData} />
      </div>


      <Credits />
    </>
  )
}
