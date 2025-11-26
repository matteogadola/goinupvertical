import { AppShellNavbar } from '@mantine/core';
import SidebarNav from './sidebar-nav';
import { NavLink } from '@/types/app';

export default function Sidebar({
  links,
}: Readonly<{
  links: NavLink[],
}>) {

  return (
    <AppShellNavbar p="md">
      <SidebarNav links={links} />
    </AppShellNavbar>
  )
}
