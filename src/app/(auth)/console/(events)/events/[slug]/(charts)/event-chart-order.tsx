'use client';

import { Suspense, useState, use, useEffect, cache, useMemo } from 'react'
import { dt, getDate } from '@/utils/date'
import Spinner from '@/components/ui/spinner'
import { BarChart, DonutChart } from '@mantine/charts';

export default function EventChartOrder({
  entries,
}: {
  entries: any
}) {
  const entriesByDate = useMemo(() => Object.groupBy(entries, ({ date }: any) => dt(date).format('YYYY-MM-DD')), [entries])

  const orderData = Object.entries(entriesByDate)
    .map(([date, entries]) => ({
      date: date,
      count: entries?.length ?? 0
    }))
    .sort((a: any, b: any) => dt(a.date).unix() - dt(b.date).unix())

  return (
    <div className="col-span-1 md:col-span-2">
      <span>Acquisti per giorno</span>
      <BarChart
        h={200}
        w={620}
        data={orderData}
        dataKey="date"
        yAxisProps={{ width: 30 }}
        barProps={{ radius: 0 }}
        series={[{ name: 'count', color: 'blue.6' }]}
        className="mt-4"
      />
    </div>
  )
}
