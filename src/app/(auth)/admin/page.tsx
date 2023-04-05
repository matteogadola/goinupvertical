import { getEvents } from '@/lib/events'
import { dt } from '@/lib/date'
import Events from './events'

export default async function AdminPage() {
  const events = await getEvents({ fromDate: dt().startOf('year').format(), orderBy: 'date' })

  return (
    <section className="page">
      <Events className="mt-8" events={events} />
    </section>
  )
}
