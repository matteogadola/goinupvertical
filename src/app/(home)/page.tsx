import FadeUpAnimation from '@/components/animations/fade-up';
import UpcomingEvents from './home-upcoming-events'
import { getSerie, getFeatures, getUpcomingEvents } from '@/utils/sanity/queries'
import HomeAboutUs from './home-about-us'
import HomeMentions from './home-mentions'
import HomeHero from './home-hero'
import HomeFlyer from './home-flyer';
import { FadeIn } from '@/components/animations/fade-in';
import FadeUp from '@/components/animations/fade-up';
import { ScrollAnimation, AnimationType } from '@/components/animations/scroll-animation';
import { BookingHero } from './home-start-wrapper';
import HomeBanner from './home-banner'
import HomeFeatures from './home-features';
//import { BackgroundFeaturesSection, FeatureItem } from '@/components/feature-card/feature-card';

export default async function Home() {
  const serie = await getSerie();
  const features = await getFeatures();
  const upcomingEvents = await getUpcomingEvents();

  return (
    <>
      <HomeHero serie={serie} />

      <div className="content">
        {features.length > 0 &&
          <HomeFeatures
            features={features}
            className="px-4"
          />
        }

        <ScrollAnimation>
          <HomeAboutUs />
        </ScrollAnimation>

        {/*<BookingHero />*/}

        {serie.status === 'open' &&
          <HomeBanner serie={serie}
            className="mt-16" 
          />
        }

        {upcomingEvents.length > 0 &&
          <UpcomingEvents
            events={upcomingEvents}
            className="px-4"
          />
        }

        {!!serie?.flyer &&
          <HomeFlyer
            flyer={serie.flyer}
            className="px-4"
          />
        }

        <ScrollAnimation animation="zoom">
          <HomeMentions />
        </ScrollAnimation>
      </div>
    </>
  );
}
