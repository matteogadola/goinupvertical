'use client';

import { Suspense, useState, use, useEffect, cache, useMemo } from 'react'
import { dt, getDate } from '@/utils/date'
import Spinner from '@/components/ui/spinner'
import { BarChart, DonutChart } from '@mantine/charts';

export default function EventChartClub({
  entries,
}: {
  entries: any
}) {
  const entriesByClub = useMemo(() => Object.groupBy(entries, ({ club }: any) => club), [entries])

  const clubData = Object.entries(entriesByClub)
    .filter(([key, value]) => key !== 'null')
    .map(([club, entries]) => ({
      name: club,
      count: entries?.length ?? 0
    }))
    .sort((a: any, b: any) => b.count - a.count)
    .slice(0, 5)

  return (
    <BarChart
      h={200}
      w={300}
      data={clubData}
      dataKey="name"
      orientation="vertical"
      yAxisProps={{ width: 80 }}
      barProps={{ radius: 0 }}
      series={[{ name: 'count', color: 'blue.6' }]}
    />
  )
}
