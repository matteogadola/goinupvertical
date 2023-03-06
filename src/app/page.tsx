import Image from 'next/image'
import HomeMission from '@/app/components/home-mission'
import HomeCarnet from '@/app/components/home-carnet'
import HomeEvents from '@/app/components/home-events'
import HomeGoinupCalendar from '@/app/components/home-goinup-calendar'
import Credits from '@/components/credits'

import homeBrandImage from 'public/images/home-1.png'
import headerImage from 'public/images/header.jpg'
// export const revalidate = 85000

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

        <section className="mt-20">
          {/* @ts-expect-error Server Component */}
          <HomeMission />
        </section>

        {/*<section className="mt-28">
          <HomeBanner />
        </section>*/}

        <HomeCarnet className="mt-36" />

        {/*<section>
          <div className="text-center">
            <h3 className="overtitle">Calendario</h3>
            <h1 className="title">Circuito</h1>
          </div>
          <div className="w-full flex justify-center justify-items-center">
            <Image
              src={calendar}
              alt="Goinup Calendar"
            />
          </div>
        </section>*/}

        {/* @ts-expect-error Server Component */}
        <HomeGoinupCalendar className="mt-32" />

        {/* @ts-expect-error Server Component */}
        <HomeEvents className="mt-36" />

      </div>

      <Credits className="mt-40" />
    </>
  )
}
