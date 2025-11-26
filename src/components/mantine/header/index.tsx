import { AppShellHeader } from '@mantine/core';
import { createClient } from '@/utils/supabase/server';
import Sidebar from '../sidebar';
import HeaderScaffold from './header';

export default async function Header({
  links,
}: Readonly<{
  links: any[],
}>) {
  const supabase = await createClient()
  const { data: { user }, error } = await supabase.auth.getUser()

  return (
    <>
      <AppShellHeader>
        <HeaderScaffold  links={links} user={user} />
      </AppShellHeader>
      <Sidebar links={links} />
    </>
  )
}
