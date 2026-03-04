'use client';

import { Suspense, useState, use, useEffect, cache, useMemo } from 'react'
import { dt, getDate } from '@/utils/date'
import Spinner from '@/components/ui/spinner'
import { DonutChart } from '@mantine/charts';

export default function EventChartAge({
  entries,
}: {
  entries: any
}) {
  const entriesByBirthYear = useMemo(() => Object.groupBy(entries, ({ birth_year }: any) => birth_year), [entries])

  const ageData: any[] = [
    //{ name: 'Maschi', value: entriesByGender['M']?.length ?? 0, color: 'indigo' },
    //{ name: 'Donne', value: entriesByGender['F']?.length ?? 0, color: 'grape' },
  ];
  /*
  0-18
  18-25
  25-35
  35-55
  55-70
  70-100
  */

  console.log(entriesByBirthYear)

  return (
    <DonutChart
      data={ageData}
      paddingAngle={5}
      withLabelsLine
      labelsType="percent"
      withLabels
      chartLabel="Genere"
    />
  )
}
