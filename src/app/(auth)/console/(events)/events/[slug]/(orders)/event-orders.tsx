'use client';

import { Suspense, useState, use, useEffect, cache, useMemo, useCallback } from 'react'
import Spinner from '@/components/ui/spinner'
import { getColumns } from './event-orders-columns';
import { DataTable } from './event-orders-table';
import { Event } from '@/types/events'

export default function EventOrders({
  event,
  entries,
}: {
  event: Partial<Event>,
  entries: any
}) {
  const [data, setData] = useState(entries.map((e: any) => {
    const items = entries.items.map((i: any) => {
      const key = i.name.toLowerCase().replaceAll(' ', '_')
      return { [key]: i.quantity }
    })
    return { ...e, ...items }
  }))

  const columns = useMemo(() => getColumns(entries.items), [])

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
