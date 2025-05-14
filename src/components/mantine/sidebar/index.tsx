import { AppShellNavbar } from '@mantine/core';
import Link from 'next/link';
import SidebarNav from './sidenav-nav';

export default function Sidebar({
  links,
}: {
  links: any[]
}) {

  return (
    <AppShellNavbar p="md">
      <SidebarNav links={links} />
    </AppShellNavbar>
  )
}
