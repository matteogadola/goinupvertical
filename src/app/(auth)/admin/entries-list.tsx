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
import { getOrders, getEntries } from '@/app/lib/views'

// https://tailwindcomponents.com/component/tags
//export default async function HomeBanner({ ticket }: { ticket: Ticket }) {
export default async function EntriesList({ className }: { className?: string }) {
  const entries = await getEntries('cech-vertical-2')
  
  return (
    <Suspense fallback={<Spinner />}>
      { entries?.length &&
      <section className={classNames(className, "")}>
        <div className="text-center">
          <h3 className="overtitle">Carnet <span className="text-gray-600 font-normal">({entries.length})</span></h3>
        </div>

        <table className="text-sm">
          <thead>
            <tr>
              <td className="pr-5 border-b py-2">ORDINE</td>
              <td className="pr-10 border-b py-2">NOME</td>
              <td className="pr-10 border-b py-2">COGNOME</td>
              <td className="pr-10 border-b py-2">CF</td>
              <td className="pr-10 border-b py-2">ANNO</td>
              <td className="pr-10 border-b py-2">GENERE</td>
              <td className="pr-10 border-b py-2">TEAM</td>
              <td className="pr-10 border-b py-2">EMAIL</td>
              <td className="pr-10 border-b py-2">NUMERO</td>
            </tr>
          </thead>
          <tbody>
          { entries.map((entry, index) =>
            <tr key={index}>
              <td className="pr-5 py-1">{entry.order_id}</td>
              <td className="pr-10 py-1">{entry.first_name}</td>
              <td className="pr-10 py-1">{entry.last_name}</td>
              <td className="pr-10 py-1">{entry.tin}</td>
              <td className="pr-10 py-1">{entry.birth_year}</td>
              <td className="pr-10 py-1">{entry.gender}</td>
              <td className="pr-10 py-1">{entry.team}</td>
              <td className="pr-10 py-1">{entry.email}</td>
              <td className="pr-10 py-1">{entry.phone_number}</td>
            </tr>
          )}
          </tbody>
        </table>
      </section>
      }
    </Suspense>
  )
}
