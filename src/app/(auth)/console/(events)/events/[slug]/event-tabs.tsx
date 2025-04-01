'use client'

import { Tabs } from '@mantine/core'
import EventCharts from './(charts)/event-charts'
import EventEntries from './(entries)/event-entries'
import { Claims, Role } from '@/types/user'
import { Event } from '@/types/events'

export default function ConsoleEventTabs({
  event,
  entries,
  claims,
}: {
  event: Event,
  entries: any[],
  claims?: Claims | null,
}) {

  return (
    <Tabs defaultValue="entries">
      <Tabs.List>
        <Tabs.Tab value="entries">
          Iscrizioni
        </Tabs.Tab>
        {hasRole('editor', claims) &&
          <Tabs.Tab value="stats">
            Statistiche
          </Tabs.Tab>
        }
      </Tabs.List>

      <Tabs.Panel value="entries" pt="xs">
        <EventEntries event={event} entries={entries} />
      </Tabs.Panel>

      <Tabs.Panel value="stats" pt="xs">
        <EventCharts entries={entries} />
      </Tabs.Panel>
    </Tabs>
  )
}

const hasRole = (role: Role, claims?: Claims | null) => {
  const roles = ['viewer', 'editor', 'manager', 'admin', 'owner']
  if (!claims || !claims.user_role) return false

  if (roles.indexOf(claims.user_role) >= roles.indexOf(role)) {
    return true
  }
  return false
}
