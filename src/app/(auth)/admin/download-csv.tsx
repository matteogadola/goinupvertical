'use client';

import { Suspense } from 'react'
import { getEvents } from '@/lib/events'
import { dt, getDate } from '@/lib/date'
//import { base64 } from '@/lib/helpers'

import goinup from 'public/images/credits/goinup.png'

import classNames from 'classnames'
import Spinner from '@/components/spinner'
import { getOrders, getEntries } from '@/app/lib/views'
import { CSVLink, CSVDownload } from 'react-csv';

// https://tailwindcomponents.com/component/tags
//export default async function HomeBanner({ ticket }: { ticket: Ticket }) {
export default function DownloadCsv({ data, name, className }: { data: any[], name: string, className?: string }) {
  
  return (
    <section className={classNames(className, "")}>
      <CSVLink data={data} filename={`iscrizioni-${name}.csv`} separator={";"} className="text-button">Scarica file</CSVLink>
    </section>
  )
}
