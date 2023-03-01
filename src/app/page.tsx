import Image from 'next/image'
import { getEvents } from '@/lib/events'
import { dt } from '@/lib/date'
import EventsList from '@/components/events-list'

import HomeBanner from '@/components/home-banner'

import Credits from '@/components/credits'

import HomeMission from '@/app/components/home-mission'
import HomeCarnet from '@/app/components/home-carnet'
import HomeEvents from '@/app/components/home-events'

import homeBrandImage from 'public/images/home-1.png'
import { callback } from '@/lib/helpers'

// export const revalidate = 5

export const metadata = {
  title: 'GOinUP',
  description: 'Circuito di 11 gare vertical in montagna',
}

export default async function HomePage() {

  /*const targets = document.querySelectorAll(".js-show-on-scroll");

  const observer = new IntersectionObserver(callback);

  targets.forEach(function(target) {
    // Hide the element
    target.classList.add("opacity-0");
  
    // Add the element to the watcher
    observer.observe(target);
  });*/
  
  //const eventsData = getEvents({ fromDate: dt().format(), orderBy: 'date' })

  // {/*deve esserci possibilità di cambiare peso!*/} |||||||||||||||||||||||||||||||||||||||||||||
  
  // hidden lg:flex lg:relative lg:-left-64 lg:-top-12 lg:-scale-x-100
  return (
    <>
      <div className="page">
        <section className="grid grid-cols-1 lg:grid-cols-2">
          <div className="display">
            <h1>GO<span className="text-accent">in</span>UP</h1>
            <h3>Circuito di 11 gare vertical<br />in montagna</h3>
          </div>

          <div className="hidden lg:flex lg:relative lg:-left-64 lg:-top-12 lg:-scale-x-100">
            <Image
              src={homeBrandImage}
              alt="Branding"
              className="opacity-90"
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
          <HomeCarnet />
        </section>

        {/* @ts-expect-error Server Component */}
        <HomeEvents className="mt-36" />

      </div>

      <Credits className="mt-40" />
    </>
  )
}
