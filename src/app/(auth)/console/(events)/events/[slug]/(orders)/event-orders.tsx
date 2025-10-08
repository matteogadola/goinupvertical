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
  const products = [
    {id: '34a9cff5-5d2a-4b60-aeb9-d086db70602d', key: 'menu_1'},
    {id: '3bc0fcd6-1940-4938-a4ae-fb1ff4cc4c7d', key: 'menu_2'},
  ]
  const [data, setData] = useState(entries.map((e: any) => {
    for (const product of products) {
      const item = e.items.find((i: any) => i.id === product.id)
      e[product.key] = item?.quantity ?? 0
    }
    return e
  }))

  console.log(data[0])

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
