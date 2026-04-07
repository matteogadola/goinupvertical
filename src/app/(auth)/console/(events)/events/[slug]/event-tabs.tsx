'use client'

import { Tabs } from '@mantine/core'
import EventCharts from './(charts)/event-charts'
import EventEntries from './(entries)/event-entries'
import EventOrders from './(orders)/event-orders'
import type { Claims, Role } from '@/types/user'
import type { Event } from '@/types/events'
import { hasRole } from '@/utils/supabase/auth'

export default function ConsoleEventTabs({
  event,
  entries,
  claims,
}: {
  event: Partial<Event>,
  entries: any[],
  claims?: Claims | null,
}) {

  return (
    <Tabs defaultValue="entries">
      <Tabs.List>
        <Tabs.Tab value="entries">
          Iscrizioni
        </Tabs.Tab>
        {(hasRole('editor', claims) && event.type !== undefined && ['serie', 'race'].includes(event.type)) &&
          <Tabs.Tab value="stats">
            Statistiche
          </Tabs.Tab>
        }
      </Tabs.List>

      <Tabs.Panel value="entries" pt="xs">
        {event.type !== undefined && ['meal', 'award'].includes(event.type)
          ? <EventOrders event={event} entries={entries} />
          : <EventEntries event={event} entries={entries} claims={claims} />
        }
      </Tabs.Panel>

      <Tabs.Panel value="stats" pt="xs">
        <EventCharts entries={entries} />
      </Tabs.Panel>
    </Tabs>
  )
}
