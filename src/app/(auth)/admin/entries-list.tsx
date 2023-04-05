import { getItem } from '@/lib/items'
import Link from 'next/link'
import Image from 'next/image'

import { base64 } from '@/lib/helpers'
import { Suspense, useEffect, useState } from 'react'
import { getEvents } from '@/lib/events'
import { dt, getDate } from '@/lib/date'
//import { base64 } from '@/lib/helpers'

import goinup from 'public/images/credits/goinup.png'

import classNames from 'classnames'
import Spinner from '@/components/spinner'
import { getOrders, getEntries } from '@/app/lib/views'
import DownloadCsv from './download-csv'
import { Entry } from '@/types/entries'
import { createClient } from '@/lib/supabase-auth-browser'

const supabase = createClient();

//async function setPaymentStatus(orderId: number, status: string) {
//  const { data } = await supabase.from('orders').update({ payment_status: status }).eq('id', orderId);
//  return data;
//}

// https://tailwindcomponents.com/component/tags
//export default async function HomeBanner({ ticket }: { ticket: Ticket }) {
export default function EntriesList({ entries, eventId, className }: { entries: any[], eventId: string, className?: string }) {
  const [items, setItems] = useState<any[]>(entries)
  useEffect(() => setItems(entries), [entries]);

  const setPaymentStatus = async (orderId: number, status: string) => {
    const { data, error } = await supabase.from('orders').update({ payment_status: status }).eq('id', orderId);

    if (!error) {
      const index = items.findIndex(item => item.order_id === orderId);

      if (index >= 0) {
        const newItems = [...items];
        newItems.splice(index, 1, { ...newItems[index], payment_status: status });
        setItems(newItems);
      }
    }
    return data;
  }

  return (
    <Suspense fallback={<Spinner />}>
      { items?.length &&
        <section className={classNames(className, "")}>
          <div className="">
            <h3 className="overtitle">Iscritti <span className="text-gray-600 font-normal">({items.length})</span></h3>
          </div>

          <DownloadCsv data={items} name={eventId} className="mt-2" />

          <table className="mt-4 text-sm">
            <thead>
              <tr>
                <td className="pr-5 border-b py-2">ORDINE</td>
                <td className="pr-10 border-b py-2">ISCRIZIONE</td>
                <td className="pr-10 border-b py-2">DATA</td>
                <td className="pr-10 border-b py-2">METODO</td>
                <td className="pr-10 border-b py-2">STATO</td>
                <td className="pr-10 border-b py-2">NOME</td>
                <td className="pr-10 border-b py-2">COGNOME</td>
                <td className="pr-10 border-b py-2">ANNO</td>
                <td className="pr-10 border-b py-2">SESSO</td>
                <td className="pr-10 border-b py-2">TEAM</td>
                <td className="pr-10 border-b py-2"></td>
              </tr>
            </thead>
            <tbody>
            { items.map((entry, index) =>
              <tr key={index} className="border-b">
                <td className="pr-5 py-2">{entry.order_id}</td>
                <td className="pr-10 py-2">{entry.category}</td>
                <td className="pr-10 py-2 whitespace-nowrap">{dt(entry.date).format('DD-MM-YY')}</td>
                <td className="pr-10 py-2">{entry.payment_method}</td>
                <td className="pr-10 py-2">{entry.payment_status}</td>
                <td className="pr-10 py-2">{entry.first_name}</td>
                <td className="pr-10 py-2">{entry.last_name}</td>
                <td className="pr-10 py-2">{entry.birth_year}</td>
                <td className="pr-10 py-2">{entry.gender}</td>
                <td className="pr-10 py-2">{entry.team}</td>
                { (entry.payment_method === 'cash' && entry.payment_status === 'pending') &&
                  <td className="pr-10 py-2 whitespace-nowrap"><button className="text-button hover:opacity-70" onClick={() => setPaymentStatus(entry.order_id, 'paid')}>CONFERMA PAGAMENTO</button></td>
                }
              </tr>
            )}
            </tbody>
          </table>
        </section>
      }
    </Suspense>
  )
}
