'use client';

import { Suspense, useState, use, useEffect, cache, useMemo } from 'react'
import { DonutChart } from '@mantine/charts';

export default function EventChartPayMethod({
  entries,
}: {
  entries: any
}) {
  const entriesByPayMethod = useMemo(() => Object.groupBy(entries, ({ gender }: any) => gender), [entries])

  const paymentsData = [
    { name: 'Online', value: entriesByPayMethod['stripe']?.length ?? 0, color: 'grape' },
    { name: 'Bonifico', value: entriesByPayMethod['sepa']?.length ?? 0, color: 'indigo' },
    { name: 'Contanti', value: entriesByPayMethod['cash']?.length ?? 0, color: 'green' },
  ];


  return (
    <DonutChart
      data={paymentsData}
      paddingAngle={5}
      withLabelsLine
      labelsType="percent"
      withLabels
      chartLabel="Pagamenti"
    />
  )
}
