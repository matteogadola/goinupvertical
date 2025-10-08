'use client';

import { Suspense, useState, use, useEffect, cache, useMemo, useCallback } from 'react'
import { dt, getDate } from '@/utils/date'
import Spinner from '@/components/ui/spinner'
import { DonutChart } from '@mantine/charts';
import { DataTable } from './event-orders-table';
import { getColumns } from './event-orders-columns';
import { OrderItem } from '@/types/orders';
import { Entry } from '@/types/entries';
import { Button } from '@mantine/core';
import { DownloadIcon } from 'lucide-react';
import { Row } from '@tanstack/react-table';
import { Event } from '@/types/events'

export default function EventOrders({
  event,
  entries,
}: {
  event: Partial<Event>,
  entries: any
}) {
  const [data, setData] = useState(entries)

  const columns = useMemo(() => getColumns(entries.items), [])
  //const paidItems = useMemo(() => data.filter((i: any) => i.payment_status === 'paid').length ?? 0, [data])

  return (
    <Suspense fallback={<Spinner />}>
      <div>
        <span className="mt-4 font-unbounded text-xl">
          Ordini
          <span className="ml-2 text-lg font-poppins font-light">{data?.length}</span>
        </span>
      </div>
      <div className="mt-8">
        <DataTable event={event} columns={columns} data={data} />
      </div>
    </Suspense>
  )
}
