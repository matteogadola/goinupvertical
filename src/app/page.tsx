import HomeMission from '@/app/components/home-mission'
import HomeEvents from '@/app/components/home-events'
import HomeGoinupCalendar from '@/app/components/home-goinup-calendar'
import Credits from '@/app/components/credits'
import { Metadata } from 'next'

// export const revalidate = 85000

export const metadata: Metadata = {
  title: 'Goinup',
  description: 'Circuito di gare vertical a scopo benefico',
}

export default async function HomePage() {

  return (
    <section className="page">
      <HomeMission className="mt-20" />

      <HomeEvents className="mt-36" />

      <HomeGoinupCalendar className="mt-36" />

      <Credits className="mt-40" />
    </section>
  )
}
