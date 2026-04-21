import UpcomingEvents from './home-upcoming-events'
import { getSerie, getFeatures, getUpcomingEvents, getMentions } from '@/utils/sanity/queries'
import HomeAboutUs from './home-about-us'
import HomeMentions from './home-mentions'
import HomeHero from './home-hero'
import HomeFlyer from './home-flyer';
import { ScrollAnimation } from '@/components/animations/scroll-animation';
import HomeBanner from './home-banner'
import HomeFeatures from './home-features';

export default async function Home() {
  const serie = await getSerie();
  const features = await getFeatures();
  const upcomingEvents = await getUpcomingEvents();
  const mentions = await getMentions();

  return (
    <>
      <HomeHero
        showCta={upcomingEvents.length > 0}
      />

      <div className="content">
        {(features.length > 0 && false) &&
          <HomeFeatures
            features={features}
            className="px-4"
          />
        }

        <ScrollAnimation>
          <HomeAboutUs />
        </ScrollAnimation>

        {/*<BookingHero />*/}

        {(!!serie && serie.status === 'open') &&
          <ScrollAnimation>
            <HomeBanner serie={serie}
              className="px-4 lg:px-0 lg:pt-36 lg:pb-24"
            />
          </ScrollAnimation>
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

        <HomeMentions mentions={mentions} className="px-4" />
      </div>
    </>
  );
}
