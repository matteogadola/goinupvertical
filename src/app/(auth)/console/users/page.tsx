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

export default async function ConsoleUsersPage() {
  const claims = await getClaims()

  return (
    <></>
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
