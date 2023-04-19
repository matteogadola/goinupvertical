import HomeMission from '@/app/components/home-mission'
import HomeEvents from '@/app/components/home-events'
import HomeGoinupCalendar from '@/app/components/home-goinup-calendar'
import Credits from '@/app/components/credits'
import { cache } from 'react'
import supabase from '@/lib/supabase'
import { dt } from '@/lib/date'

// export const revalidate = 85000

export const metadata = {
  title: 'GOinUP',
  description: 'Classifiche',
}

const fetchEvents = cache(async () => {
  const { data } = await supabase
    .from('events')
    .select(`id, name, edition, event_attachments (*) `)
    //.gte('date', dt().startOf('year').format())
    .lt('date', dt().add(1, 'day'))
    //.eq('status', 'scheduled')
    .order('date', { ascending: true })
    .returns<any[]>();
  return data ?? [];
});

export default async function HomePage() {
  const events = await fetchEvents();

  return (
    <section className="page">
      <h1 className="title">Classifiche</h1>

      <div className="mt-8">
        { events.map(event => 
          <div key={event.id} className="p-6 shadow-sm hover:shadow-lg">
            <span className="overtitle">{event.name}</span>
            { event.event_attachments.map((attachment: any, index: any) => 
              <div key={index}>
                <a href={attachment.url} target='_blank'>{attachment.name}</a>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
