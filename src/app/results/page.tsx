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
    .select(`id, name, edition, event_attachments!inner (*) `)
    .gte('date', dt().startOf('year').format())
    .order('date', { ascending: true })
    .returns<any[]>();
  return data ?? [];
});

export default async function HomePage() {
  const events = await fetchEvents();

  return (
    <section className="page">
      <h1 className="overtitle">Allegati</h1>
      <h1 className="title">Classifiche</h1>

      <div className="mt-8">
        { events.map(event => 
          <div key={event.id} className="w-1/3 p-6 shadow-lg">
            <span className="overtitle">{event.edition}° {event.name}</span>
            
            <div className="mt-4 space-x-6">
            { event.event_attachments.map((attachment: any, index: any) => 
              
                <a key={index} href={attachment.url} target='_blank'>
                  <button className="bg-button px-2 py-1 rounded text-slate-200 hover:opacity-70">{attachment.name}</button>
                </a>
              
            )}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
