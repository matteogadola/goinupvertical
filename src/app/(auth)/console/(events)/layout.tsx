import type { Metadata } from 'next'
import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'
import { dt } from '@/utils/date'
import { redirect } from 'next/navigation';
import { AppShellHeader, AppShellMain, AppShellNavbar } from '@mantine/core';
import Navbar from '@/components/ui/mantine_REMOVED/navbar';
import { Event } from '@/types/events'
import Sidebar from '@/components/ui/mantine_REMOVED/sidebar';
import { getClaims } from '@/utils/supabase/helpers';
import { hasRole } from '@/utils/supabase/auth';
import { Role, User } from '@/types/user';
import Header from '@/components/mantine/header';

const links: { name: string, path: string, hasRole?: Role }[] = [
  { name: "Eventi", path: "/console" },
  { name: "Utenti", path: "/console/users", hasRole: "admin" },
]

export default async function ConsoleUsersLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const events = await getUsers()

  return (
    <>
      <Header links={links} />
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
          <div className="pl-4">{children}</div>
        </div>
      </AppShellMain>
    </>
  );
}

const getUsers = async () => {
  const supabase = await createClient()

  const { data } = await supabase
    .from('users')
    .select();
  
  return data ?? []
}
