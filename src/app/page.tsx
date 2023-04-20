import HomeMission from '@/app/components/home-mission'
import HomeEvents from '@/app/components/home-events'
import HomeGoinupCalendar from '@/app/components/home-goinup-calendar'
import Credits from '@/app/components/credits'

// export const revalidate = 85000

export const metadata = {
  title: 'GOinUP',
  description: 'Circuito di gare vertical a scopo benefico',
}

export default async function HomePage() {

  return (
    <section className="page">
      <HomeMission className="mt-20" />

      {/* @ts-expect-error Server Component */}
      <HomeGoinupCalendar className="mt-36" />

      {/* @ts-expect-error Server Component */}
      <HomeEvents className="mt-36" />

      <Credits className="mt-40" />
    </section>
  )
}
