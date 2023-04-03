import { NextPage } from 'next'
import Image from 'next/image'
import { Event } from '@/types/events'
import { getEvent, getEvents } from '@/lib/events'
import { getItem } from '@/lib/items'
import { dt, getReadableDate } from '@/lib/date'
import { base64 } from '@/lib/helpers'
import { getEntry } from '@/lib/entries'
import { redirect, useRouter, useSearchParams } from 'next/navigation'
import { Order } from '@/types/orders'
import { useEffect } from 'react'
import { getOrders } from '@/app/lib/views'
import OrdersList from './orders-list'
import Events from './events'

export default async function AdminPage() {
  //const orders = await getOrders()
  const events = await getEvents({ fromDate: dt().startOf('year').format(), orderBy: 'date' })

  return (
    <>
      <section className="page">

        <Events className="mt-8" events={events} />

        {/* @ts-expect-error Server Component 
        <OrdersList className="mt-8" />*/}
        
      </section>
    </>
  )
}

