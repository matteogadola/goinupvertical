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
import { getEntries } from '@/app/lib/views'
import { CSVLink, CSVDownload } from 'react-csv'
import DownloadCsv from './download-csv'

// https://tailwindcomponents.com/component/tags
//export default async function HomeBanner({ ticket }: { ticket: Ticket }) {
export default async function OrdersList({ className }: { className?: string }) {
  const eventName = 'cech-vertical-2';
  const orders = await getEntries(eventName)
  
  return (
    <Suspense fallback={<Spinner />}>
      { orders?.length &&
      <section className={classNames(className, "")}>
        <div className="text-center">
          <h3 className="overtitle">Iscrizioni Carnet <span className="text-gray-600 font-thin">({orders.length})</span></h3>
        </div>

        <table className="mt-8 text-sm">
          <thead>
            <tr>
              <td className="pr-5 border-b py-2">ID</td>
              <td className="pr-10 border-b py-2">DATA</td>
              <td className="pr-10 border-b py-2">METODO</td>
              <td className="pr-10 border-b py-2">STATO</td>
              <td className="pr-10 border-b py-2">ISCRIZIONE</td>
              <td className="pr-10 border-b py-2">NOME</td>
              <td className="pr-10 border-b py-2">COGNOME</td>
              <td className="pr-10 border-b py-2">ANNO</td>
              <td className="pr-10 border-b py-2">GENERE</td>
              <td className="pr-10 border-b py-2">TEAM</td>
              <td className="pr-10 border-b py-2"></td>
            </tr>
          </thead>
          <tbody>
          { orders.map((order, index) =>
            <tr key={index}>
              <td className="pr-5 py-1">{order.order_id}</td>
              <td className="pr-10 py-1 whitespace-nowrap">{dt(order.date).format('DD-MM-YY')}</td>
              <td className="pr-10 py-1">{order.payment_method}</td>
              <td className="pr-10 py-1">{order.payment_status}</td>
              <td className="pr-10 py-1">{order.category}</td>
              <td className="pr-10 py-1">{order.first_name}</td>
              <td className="pr-10 py-1">{order.last_name}</td>
              <td className="pr-10 py-1">{order.birth_year}</td>
              <td className="pr-10 py-1">{order.gender}</td>
              <td className="pr-10 py-1">{order.team}</td>
              { (order.payment_method === 'cash' && order.payment_status === 'pending') &&
                <td className="pr-10 py-1">CONFERMA</td>
              }
            </tr>
          )}
          </tbody>
        </table>
        <DownloadCsv data={orders} name={eventName} className="mt-8" />
      </section>
      }
    </Suspense>
  )
}
