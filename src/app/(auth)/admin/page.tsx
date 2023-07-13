import { Event } from '@/types/events'
import { dt } from '@/lib/date';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/types/supabase';
import { cookies } from 'next/headers';
import { notFound, redirect } from 'next/navigation';
import AdminConsole from './admin-console';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Console di amministrazione',
}

// rinomina in manage ???

export default async function Admin() {
  const supabase = createServerComponentClient<Database>({ cookies });
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    redirect('/auth/login');
  }

  const { data: events } = await supabase
    .from('events')
    .select(`*, attachments(*)`)
    .neq('id', 'pietro-vertical-5')
    .gte('date', dt().startOf('year').format())
    .order('date', { ascending: true })
    .returns<Event[]>();

  if (!events?.length) {
    return (
      <>
        <div className="page">
          <div className="flex flex-col bg-red-100 bg-opacity-80 max-w-lg p-4">
            <span className="font-semibold ">Utente non abilitato</span>
            <span>Contattare l'amministratore per richiedere le abilitazioni necessarie</span>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <AdminConsole events={events} />
    </>
  )
}
