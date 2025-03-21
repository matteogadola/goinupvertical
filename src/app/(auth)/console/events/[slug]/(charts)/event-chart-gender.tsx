'use client';

import { Suspense, useState, use, useEffect, cache, useMemo } from 'react'
import { dt, getDate } from '@/utils/date'
import Spinner from '@/components/ui/spinner'
import { DonutChart } from '@mantine/charts';

export default function EventChartGender({
  entries,
}: {
  entries: any
}) {
  const entriesByGender = useMemo(() => Object.groupBy(entries, ({ gender }: any) => gender), [entries])

  const genderData = [
    { name: 'Maschi', value: entriesByGender['M']?.length ?? 0, color: 'indigo' },
    { name: 'Donne', value: entriesByGender['F']?.length ?? 0, color: 'grape' },
  ];


  return (
    <DonutChart
      data={genderData}
      paddingAngle={5}
      withLabelsLine
      labelsType="percent"
      withLabels
      chartLabel="Genere"
    />
  )
}
