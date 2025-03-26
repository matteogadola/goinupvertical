import type { Metadata } from 'next'

import { AppShell, MantineProvider, AppShellHeader,
  AppShellNavbar,
  AppShellMain
 } from '@mantine/core';
import AppContainer from '@/components/ui/mantine/app';
import Navbar from '@/components/ui/mantine/navbar';
import Sidebar from '@/components/ui/mantine/sidebar';

/*export const metadata: Metadata = {
  title: "Goinup Vertical",
  description: "Circuito di gare vertical a scopo benefico",
};
*/
const links = [
  { name: "Home", path: "/", visible: false },
  { name: "Classifiche", path: "/results" },
  { name: "Foto e Video", path: "/photos" },
  { name: "Regolamento", path: "/regulation" },
]

export const metadata: Metadata = {
  title: "Goinup Vertical",
  description: "Circuito di gare vertical a scopo benefico",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <>
      <AppShellHeader>
        <Navbar links={links} />
      </AppShellHeader>
      <AppShellNavbar p="md">
        <Sidebar links={links} />
      </AppShellNavbar>
      <AppShellMain className="page">
        {children}
      </AppShellMain>
    </>
  );
}
