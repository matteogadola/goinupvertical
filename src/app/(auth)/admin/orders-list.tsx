import { getItem } from '@/lib/items'
import Link from 'next/link'
import Image from 'next/image'

import { base64 } from '@/lib/helpers'
import { Suspense } from 'react'
import { getEvents } from '@/lib/events'
import { dt, getDate } from '@/lib/date'
//import { base64 } from '@/lib/helpers'

import goinup from 'public/images/credits/goinup.png'

import classNames from 'classnames'
import Spinner from '@/components/spinner'
import { getOrders } from '@/app/lib/orders'

// https://tailwindcomponents.com/component/tags
//export default async function HomeBanner({ ticket }: { ticket: Ticket }) {
export default async function OrdersList({ className }: { className?: string }) {
  const orders = await getOrders()
  
  return (
    <Suspense fallback={<Spinner />}>
      { orders?.length &&
      <section className={classNames(className, "")}>
        <div className="text-center">
          <h3 className="overtitle">Carnet <span className="text-gray-600 font-normal">({orders.length})</span></h3>
        </div>

        <table className="text-sm">
          <thead>
            <tr>
              <td className="pr-5 border-b py-2">ID</td>
              <td className="pr-10 border-b py-2">DATA</td>
              <td className="pr-10 border-b py-2">METODO</td>
              <td className="pr-10 border-b py-2">STATO</td>
              <td className="pr-10 border-b py-2">NOTIFICA</td>
            </tr>
          </thead>
          <tbody>
          { orders.map((order, index) =>
            <tr key={index}>
              <td className="pr-5 py-1">{order.id}</td>
              <td className="pr-10 py-1">{dt(order.date).datetime()}</td>
              <td className="pr-10 py-1">{order.payment_method}</td>
              <td className="pr-10 py-1">{order.payment_status}</td>
              <td className="pr-10 py-1">{order.payment_id}</td>
              <td className="pr-10 py-1">{order.notification_status}</td>
            </tr>
          )}
          </tbody>
        </table>
      </section>
      }
    </Suspense>
  )
}
