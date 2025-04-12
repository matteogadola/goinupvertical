import FadeUpAnimation from '@/components/animations/fade-up';
import Credits from '@/components/credits'
import UpcomingEvents from './home-upcoming-events'
import Footer from '@/components/footer';
import BannerCarnet from '@/components/home/banner-carnet';
import { dt } from '@/utils/date';
import { urlFor } from '@/utils/sanity';
import { getSerie, getUpcomingEvents } from '@/utils/sanity/queries'
import HomeAboutUs from './home-about-us';
import HomeMentions from './home-mentions';
import HomeHero from './home-hero';

export default async function Home() {
  const upcomingEvents = await getUpcomingEvents();
  const serie = await getSerie({ year: 2025 });

  return (
    <>
      <HomeHero />

      <HomeMentions />
      
      <HomeAboutUs />

      {!!serie?.flyer &&
        <div className="flex mt-32 justify-center items-center">
          <img src={urlFor(serie.flyer)} alt="goinup flyer" className="" width={800} />
        </div>
      }

      {serie.status === 'open' && <BannerCarnet serie={serie} className="mt-16" />}

      {upcomingEvents.length > 0 &&
        <div className="flex flex-col mt-32 justify-center items-center space-y-16">
          <span className="title">Prossimi eventi</span>

          <UpcomingEvents events={upcomingEvents} />
        </div>
      }
    </>
  );
}
