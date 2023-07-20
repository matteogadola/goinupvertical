'use client'

import { Metadata, NextPage } from 'next'
import Image from 'next/image'
import { Event } from '@/types/events'
import { getEvent, getEvents } from '@/lib/events'
import { getItem } from '@/lib/items'
import { dt, getReadableDate } from '@/lib/date'
import { base64 } from '@/lib/helpers'
import { getEntry } from '@/lib/entries'
import { redirect, useSearchParams } from 'next/navigation'
import { Order } from '@/types/orders'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'

interface SearchParams {
  session_id?: string;
  q: string;
}

export interface Props {
  searchParams: SearchParams;
}

// Serve ma non funziona
//export default function ConfirmPage({ searchParams }: Props) {
//  const order = base64.decode<Order>(searchParams.q);
export default function ConfirmPage() {
  const order = base64.decode<Order>(useSearchParams()?.get('q') ?? '')

  if (order?.items === undefined || !order.items.length) {
    return (
      <>
        <Navbar promoter="goinup" />
        <section className="page">
          <span className="overtitle">Conferma</span>
          <div className="text mt-2">
            L'iscrizione è stata completata con successo ma ci sono stati problemi nella generazione di questa pagina.<br />
            Riceverai a breve una mail di conferma.<br />
          </div>
        </section>
      </>
    )
  }

  return (
    <>
      <Navbar promoter={order.promoter_id} />
      <section className="page">
        <span className="overtitle">Conferma</span>
        <h1 className="title mt-3">Ordine n. {order.id}</h1>
        <div className="text mt-2">
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
      <Footer promoter={order.promoter_id} />
    </>
  )
}

export const metadata: Metadata = {
  title: 'Conferma ordine',
}
