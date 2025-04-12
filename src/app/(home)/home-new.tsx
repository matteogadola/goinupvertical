import FadeUpAnimation from '@/components/animations/fade-up';
import Credits from '@/components/credits'
import UpcomingEvents from './home-upcoming-events'
import Footer from '@/components/footer';
import BannerCarnet from '@/components/home/banner-carnet';
import { dt } from '@/utils/date';
import { urlFor } from '@/utils/sanity';
import { getSerie, getUpcomingEvents } from '@/utils/sanity/queries'
import clsx from 'clsx';
import Link from 'next/link';

export default async function Home() {
  const upcomingEvents = await getUpcomingEvents();
  const serie = await getSerie({ year: 2025 });

  const events = upcomingEvents

  return (
    <>

      <div className="in-cima">
        {/*<div className="">
          GOin<span className="">UP</span>
        </div>*/}
      </div>

      <div className="min-h-55 flex items-center">
        <div className="content flex flex-col items-center py-16">
          <p className=" text-lg italic ">Gara stupenda! Sentieri tecnici ma panorama mozzafiato. Organizzazione perfetta. Da rifare assolutamente!</p>
          <span className="mt-2 font-semibold">Antonio C.</span>
        </div>
      </div>

      <div className="bg-green-950">
        <div className="content grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="px-8 py-16 text-white">
            <span className="text-7xl font-matroska">GOinUP</span>
            <p className="mt-8 text-xl font-poppins">
              Circuito di 10 gare vertical di montagna a <span className="font-normal">finalità benefica</span>.
              GOinUP è un gruppo di associazioni che coordina e promuove l&apos;omonimo circuito di gare di montagna. Il nostro obbiettivo è quello di riuscire a donare il maggior numero di attrezzature e servizi a diverse associazioni benefiche nel mandamento di Morbegno
            </p>
          </div>
          <div className=" justify-items-end">
            {/* usa immagine con stessa altezza */}
            <img src="/images/homepage/lino.jpg" alt="header" className="w-full lg:w-[512px] grayscale-40" />
            <img src="/images/homepage/lino.jpg" alt="header" className="w-full lg:w-[512px] grayscale-40" />
          </div>
        </div>
      </div>

      {serie.status === 'open' && <BannerCarnet serie={serie} className="mt-16" />}

      {!!serie?.flyer &&
        <div className="flex my-32 justify-center items-center">
          <img src={urlFor(serie.flyer)} alt="goinup flyer" className="" width={800} />
        </div>
      }

      <div className="bg-terra min-h-150 flex items-center">
        <div className="content">
          <UpcomingEvents events={upcomingEvents} />
        </div>
      </div>

      

      <Credits className="mt-16" />
    </>
  );
}
