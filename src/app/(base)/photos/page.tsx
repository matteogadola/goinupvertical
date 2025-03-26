import { cache } from 'react'
import { dt } from '@/utils/date'
import { Event } from '@/types/events'
import { LinkIcon, PhotoIcon, VideoIcon } from '@/components/icons'
import { getEvents } from '@/utils/sanity/queries'

export const revalidate = 3600

export const metadata = {
  title: 'Goinup | Foto',
  description: 'Foto',
}

export default async function MediaPage() {
  const events = await getEvents({ year: dt().year() })
  
  return <></>
  /*return (
    <section className="page">
      <h1 className="overtitle">Allegati</h1>
      <h1 className="title">Media</h1>

      <div className="mt-8 space-y-8">
        {events.map((event, key) =>
          <div key={key} className="w-full lg:w-1/3 p-6 shadow">
            {event.type === 'race'
              ? <>
                <span className="overtitle">{event.name}</span>
                <span className="block text-xs text-gray-600">{dt(event.date).format('DD MMMM YYYY')}</span>
              </>
              : <span className="overtitle">{event.name} {dt(event.date).format('YYYY')}</span>
            }

            <div className="mt-4">
              <ul className="space-y-4">
                {event.links?.map((attachment: any, index: any) =>
                  <li key={index} className="flex space-x-2">
                    {attachment.type === 'photo'
                      ? <PhotoIcon />
                      : attachment.type === 'video'
                        ? <VideoIcon />
                        : <LinkIcon />
                    }
                    <a href={attachment.url} target='_blank' className="text-lg hover:opacity-70">{attachment.name}</a>
                  </li>
                )}
              </ul>
            </div>
          </div>
        )}
      </div>
    </section>
  )*/
}
