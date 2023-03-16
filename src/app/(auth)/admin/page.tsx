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
import { useStore } from '@/store/store'
import { getOrders } from '@/app/lib/views'
import OrdersList from './orders-list'
import EntriesList from './entries-list'

export default async function AdminPage() {
  //const orders = await getOrders()

  return (
    <>
      <section className="page">

        {/* @ts-expect-error Server Component */}
        <OrdersList className="mt-8" />
        
      </section>
    </>
  )
}

