import type { Metadata } from 'next'
import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'
import { AppShellMain, AppShellNavbar, Tabs } from '@mantine/core';

import { getClaims } from '@/utils/supabase/helpers';
import { hasRole } from '@/utils/supabase/auth';
import { Role, User } from '@/types/user';
import Header from '@/components/layout/header';
import { dt } from '@/utils/date';
import Sidebar from '@/components/layout/sidebar';

const links: { name: string, path: string, hasRole?: Role }[] = [
  { name: "Eventi", path: "/console" },
  { name: "Utenti", path: "/console/users", hasRole: "admin" },
]

export default async function ConsoleEventsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const events = await getEvents()

  const sidenavLinks = events.map((event) => ({
    name: event.name,
    path: `/console/events/${event.slug}`
  }))

  return (
    <>
      <Header />
      <Sidebar links={sidenavLinks} />
      <AppShellMain className="page">
        <div className="flex">
          <div className="min-w-64 pr-4 border-r hidden md:flex">
            <div className="mt-4">
              <span className="font-unbounded text-xl">Eventi</span>
              <ul className="separator mt-4">
                {sidenavLinks?.map((item: any, index) =>
                  <li key={index} className="py-2 whitespace-nowrap">
                    <Link href={item.path}>{item.name}</Link>
                  </li>
                )}
              </ul>
            </div>
      
          </div>
          <div className="pl-4">{children}</div>
        </div>
      </AppShellMain>
    </>
  );
}

const getEvents = async () => {
  const supabase = await createClient()

  const { data } = await supabase
    .from('events')
    .select()
    .gte('date', dt().startOf('year').format())
    .order('date', { ascending: true })
    .overrideTypes<Event[]>();
  
  return data ?? []
}
