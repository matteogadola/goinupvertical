'use client'

import { NextPage } from 'next'
import Image from 'next/image'
import { Event } from '@/types/events'
import { getEvent, getEvents } from '@/lib/events'
import { getItem } from '@/lib/items'
import { dt, getReadableDate } from '@/lib/date'
import { base64 } from '@/lib/helpers'
import { getEntry } from '@/lib/entries'
import { redirect, useSearchParams } from 'next/navigation'
import { Order } from '@/types/orders'

interface SearchParams {
  session_id?: string;
  q: string;
}
/*
interface Order {
  event_id: string;
  item_id: number;
  entry_id: string;
}*/


export default function ConfirmPage() {
  const order = base64.decode<Order>(useSearchParams()?.get('q') ?? '')

  // NO - MOSTRA ERRORE
  if (order?.items === undefined || !order.items.length) redirect('/')
  
  // se non ci sono params fai redirect a home
  //const order = base64.decode<Order>(encoded)
  //const entry = await getEntry(entry_id)
  //const item = await getItem(item_id)

  /*if (entry === null || item === null) {
    redirect('/')
  }*/

  return (
    <section className="page">
      <span className="overtitle">Conferma</span>
      <h1 className="title mt-3">Ordine n. { order.id }</h1>
      <div className="text mt-2">
        <span>Grazie per aver completato l&apos;ordine</span>
        <table className="border border-slate-400 mt-8">
          <thead>
            <tr className="bg-slate-200">
              <td className="w-80 border-b py-2">Riferimento</td>
              <td className="w-60 border-b py-2">Descrizione</td>
              <td className="w-32 border-b py-2">Quantità</td>
              <td className="w-32 border-b py-2">Prezzo</td>
            </tr>
          </thead>
          <tbody>
            {
              order.items.map((item, index) => 
                <tr key={index}>
                  <td className="py-2">{item.name}</td>
                  <td className="py-2">{item.description}</td>
                  <td className="py-2">{item.quantity}</td>
                  <td className="py-2">{item.price / 100}€</td>
                </tr>
              )
            }
          </tbody>
        </table>

        <p className="mt-8">A breve riceverai una mail con {
          order.payment_method === 'sepa' ? 'le istruzioni per poter effettuare il bonifico' :
          order.payment_method === 'cash' ? 'le istruzioni per poter effettuare il pagamento in contanti' :
          'la conferma di pagamento'
        }
        .</p>
      </div>
    </section>
  )
}

