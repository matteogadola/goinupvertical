import type { Metadata } from 'next'
import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'
import { dt } from '@/utils/date'
import { redirect } from 'next/navigation';
import { AppShellHeader, AppShellMain, AppShellNavbar } from '@mantine/core';
import Navbar from '@/components/ui/mantine/navbar';
import { Event } from '@/types/events'
import Sidebar from '@/components/ui/mantine/sidebar';
import { getClaims } from '@/utils/supabase/helpers';
import { hasRole } from '@/utils/supabase/auth';
import { Role } from '@/types/user';

const links: { name: string, path: string, hasRole?: Role }[] = [
  { name: "Eventi", path: "/console/events" },
  { name: "Utenti", path: "/console/users", hasRole: "admin" },
]

export default async function ConsoleLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const events = await getEvents()

  return (
    <>
      
    </>
  );
}

const getUser = async () => {
  const supabase = await createClient()
  const { data: { user }, error } = await supabase.auth.getUser()

  if (error) {
    console.log(error)
    return null;
  }
  return user;
}

const getEvents = async () => {
  const supabase = await createClient()

  const { data } = await supabase
    .from('events')
    .select()
    .gte('date', dt().startOf('year').format())
    .order('date', { ascending: true })
    .returns<Event[]>();
  
  return data ?? []
}
