'use client';

import { Suspense, useState, use, useEffect, cache, useMemo, useCallback } from 'react'
import { dt, getDate } from '@/utils/date'
import Spinner from '@/components/ui/spinner'
import { DonutChart } from '@mantine/charts';
import { DataTable } from './event-entries-table';
import { getColumns } from './event-entries-columns';
import { OrderItem } from '@/types/orders';
import { Entry } from '@/types/entries';
import { Button } from '@mantine/core';
import { DownloadIcon } from 'lucide-react';
import { Row } from '@tanstack/react-table';

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

  const onUpdate = useCallback((updatedEntry: Entry) => {
    const newEntries = data.map((entry: any) => entry.order_item_id === updatedEntry.order_item_id
      ? ({ ...entry, ...updatedEntry })
      : entry
    )
    setData(newEntries)
  }, [])

  const columns = useMemo(() => getColumns({ onConfirm, onUpdate }), [])
  const paidItems = useMemo(() => data.filter((i: any) => i.payment_status === 'paid').length ?? 0, [data])

  return (
    <Suspense fallback={<Spinner />}>
      <div>
        <span className="mt-4 font-unbounded text-xl">
          Iscrizioni
          <span className="ml-2 text-lg font-poppins font-light">{data?.length}</span>
        </span>
        {paidItems !== data?.length &&
          <span className="block mt-1 text-xs font-poppins font-light">({paidItems} confermate)</span>
        }
      </div>
      <div className="mt-8">
        <DataTable columns={columns} data={data} />
      </div>
    </Suspense>
  )
}
