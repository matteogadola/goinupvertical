'use client';

import { Suspense, useState, use, useEffect, cache, useMemo, useCallback } from 'react'
import { dt, getDate } from '@/utils/date'
import Spinner from '@/components/ui/spinner'
import { DonutChart } from '@mantine/charts';
import { DataTable } from './event-entries-table';
import { getColumns } from './event-entries-columns';
import { OrderItem } from '@/types/orders';

export default function EventEntries({
  entries,
}: {
  entries: any
}) {
  const [data, setData] = useState(entries)

  const onConfirm = useCallback((items: Partial<OrderItem>[]) => {
    const confirmedIds = items.map(i => i.id)
    const newEntries = data.map((entry: any) => confirmedIds.includes(entry.order_item_id)
      ? ({ ...entry, payment_status: 'paid' })
      : entry
    )
    setData(newEntries)
  }, [])

  const columns = useMemo(() => getColumns({ onConfirm }), [])
  const paidItems = useMemo(() => data.filter((i: any) => i.payment_status === 'paid').length ?? 0, [data])

  return (
    <Suspense fallback={<Spinner />}>
      <span className="mt-4 font-unbounded text-xl">
        Iscrizioni
        <span className="ml-2 text-lg font-poppins font-light">({paidItems} / {data?.length})</span>
      </span>
      <div className="mt-8">
        <DataTable columns={columns} data={data} />
      </div>
    </Suspense>
  )
}
