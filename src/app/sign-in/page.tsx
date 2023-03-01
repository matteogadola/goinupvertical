'use client'

import { notFound, useSearchParams } from 'next/navigation'
import { Suspense, use } from 'react'
import { getItem } from '@/lib/items'
import { base64 } from '@/lib/helpers'
import { Item } from '@/types/items'
import { useStore } from '@/store/store'

/* Sarebbe carino funzionasse così
export default async function EntryPage() {
  const ticketId = Number(useSearchParams().get('q'))
  const ticket = await getTicket(ticketId)*/


export default function SignIn() {
  const supabase = useStore((state) => state.supabase);

  /*await supabase.auth.signInWithPassword({
    email: 'jon@supabase.com',
    password: 'password',
  })*/
  //const ticket = base64.decode<Ticket>(searchParams.q)

  // verifica se utente loggato...se si mostra campi compilati
  // se no mostra pulsante per accedere (poi la registrazione si potrà selezionare da sign-in)
  
  return (
    <section className="mt-4 md:mx-12">
      
    </section>
  )
}
