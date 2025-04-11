'use client';

import { Suspense, useState, use, useEffect, cache, useMemo } from 'react'
import { dt, getDate } from '@/utils/date'
import Spinner from '@/components/ui/spinner'
import { DonutChart } from '@mantine/charts';
import EventChartGender from './event-chart-gender';
import EventChartPayMethod from './event-chart-pay-method';
import EventChartClub from './event-chart-clubs';
import EventChartOrder from './event-chart-order';

export default function EventCharts({
  entries,
}: {
  entries: any
}) {

  return (
    <Suspense fallback={<Spinner />}>
      <span className="mt-4 font-unbounded text-xl">Statistiche</span>
      {entries.length > 0 &&
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 items-center">
          <EventChartGender entries={entries} />
          <EventChartPayMethod entries={entries} />
          <EventChartClub entries={entries} />
          <EventChartOrder entries={entries} />
        </div>
      }
    </Suspense>
  )
}
