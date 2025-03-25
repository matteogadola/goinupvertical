import { dt } from '@/utils/date';
import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';
import { getClaims } from '@/utils/supabase/helpers';
import type { Event } from '@/types/events'
import { AppShellHeader, AppShellMain, AppShellNavbar } from '@mantine/core';
import Sidebar from '@/components/ui/mantine/sidebar';
import Navbar from '@/components/ui/mantine/navbar';
//export const metadata: Metadata = {
//  title: 'Console di amministrazione',
//}

const links: any[] = []
const enabledLinks: any[] = []

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
    <>
    <AppShellHeader>
      <Navbar links={enabledLinks} />
    </AppShellHeader>
    <AppShellNavbar p="md">
      <Sidebar links={links} />
    </AppShellNavbar>
    <AppShellMain className="page">
      <div className="flex">
        <div className="min-w-64 pr-4 border-r-1 hidden md:flex">
          <div className="mt-4">
            <span className="font-unbounded text-xl">Eventi</span>
            <ul className="separator mt-4">
              {events?.map((item: any, index) =>
                <li key={index} className="py-2 whitespace-nowrap">
                  <Link href={'/console/events/' + item.slug}>{item.name}</Link>
                </li>
              )}
            </ul>
          </div>

        </div>
        <div className="pl-4">
          <div className="page">
            <div className="p-4">
              <span className="">Seleziona un evento</span>
            </div>
          </div>
        </div>
      </div>
    </AppShellMain>
    </>
    
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
