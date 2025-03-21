import { dt } from '@/utils/date';
import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';
import { getClaims } from '@/utils/supabase/helpers';
import type { Event } from '@/types/events'
//export const metadata: Metadata = {
//  title: 'Console di amministrazione',
//}

export default async function ConsolePage() {
  const claims = await getClaims()

  if (!claims?.user_role || !claims.user_groups?.length) {
    return (
      <>
        <div className="page">
          <div className="flex flex-col bg-red-100 bg-opacity-80 max-w-lg p-4">
            <span className="font-semibold">Utente non abilitato</span>
            <span>Contattare l&apos;amministratore per richiedere le abilitazioni necessarie</span>
          </div>
        </div>
      </>
    )
  }

  const events = await getEvents()

  if (!events?.length) {
    return (
      <>
        <div className="page">
          <div className="flex flex-col bg-yellow-100 bg-opacity-80 max-w-lg p-4">
            <span className="font-semibold">Nessun evento disponibile</span>
            <span>Contattare l&apos;amministratore nel caso si creda manchino le abilitazioni necessarie</span>
          </div>
        </div>
      </>
    )
  }

  return (
    <div className="page">
      <div className="p-4">
        <span className="">Seleziona un evento</span>
      </div>
    </div>
  )
}

const getEvents = async () => {
  const supabase = await createClient()

  const { data } = await supabase
    .from('events')
    .select()
    .gte('date', dt().startOf('year').format())
    .order('date', { ascending: true })
    .overrideTypes<Event[], { merge: false }>();

  return data ?? []
}
