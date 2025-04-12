import FadeUpAnimation from '@/components/animations/fade-up';
import UpcomingEvents from './home-upcoming-events'
import BannerCarnet from '@/components/home/banner-carnet'
import { getSerie, getUpcomingEvents } from '@/utils/sanity/queries'
import HomeAboutUs from './home-about-us'
import HomeMentions from './home-mentions'
import HomeHero from './home-hero'
import HomeFlyer from './home-flyer';

export default async function Home() {
  const upcomingEvents = await getUpcomingEvents();
  const serie = await getSerie({ year: 2025 });

  return (
    <>
      <HomeHero />

      <HomeMentions />
      
      <HomeAboutUs />

      {!!serie?.flyer &&
        <HomeFlyer
          flyer={serie.flyer}
        />
      }

      {serie.status === 'open' &&
        <BannerCarnet serie={serie}
          className="mt-16" 
        />
      }

      {upcomingEvents.length > 0 &&
        <UpcomingEvents events={upcomingEvents} />
      }
    </>
  );
}
