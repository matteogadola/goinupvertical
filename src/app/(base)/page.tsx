import HomeMission from '@/app/components/home-mission'
import HomeEvents from '@/app/components/home-events'
import HomeGoinupCalendar from '@/app/components/home-goinup-calendar'
import Credits from '@/app/components/credits'
import { GetStaticProps, Metadata } from 'next'
import { Suspense } from 'react'
import Spinner from '@/components/spinner'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'

// export const revalidate = 85000

export const metadata: Metadata = {
  title: 'Goinup',
  description: 'Circuito di gare vertical a scopo benefico',
}

export default async function HomePage() {

  return (
    <>
      <Navbar promoter="goinup" />
      <section className="page space-y-32">
        <HomeMission />

        <Suspense fallback={<Spinner />}>
          <HomeEvents />
        </Suspense>

        <HomeGoinupCalendar />

        <Credits />
      </section>
      <Footer promoter="goinup" />
    </>
  )
}