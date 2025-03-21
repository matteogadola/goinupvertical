'use client'

import { Tabs } from '@mantine/core'
import EventCharts from './(charts)/event-charts'
import EventEntries from './(entries)/event-entries'
import { Claims } from '@/types/user'

export default function ConsoleEventTabs({
  entries,
  claims,
}: {
  entries: any[],
  claims?: Claims | null,
}) {

  return (
    <Tabs defaultValue="entries">
      <Tabs.List>
        <Tabs.Tab value="entries">
          Iscrizioni
        </Tabs.Tab>
        {claims?.user_role === 'owner' &&
          <Tabs.Tab value="stats">
            Statistiche
          </Tabs.Tab>
        }
      </Tabs.List>

      <Tabs.Panel value="entries" pt="xs">
        <EventEntries entries={entries} />
      </Tabs.Panel>

      <Tabs.Panel value="stats" pt="xs">
        <EventCharts entries={entries} />
      </Tabs.Panel>
    </Tabs>
  )
}
