import { AppShellMain } from '@mantine/core'
import Header from '@/components/layout/header'
import Sidebar from '@/components/layout/sidebar';
import Footer from '@/components/layout/footer';
import Credits from '@/components/credits';
import type { Metadata } from 'next';

const links = [
  { name: 'Home', path: '/', visible: false },
  { name: 'Classifiche', path: '/results' },
  { name: 'Foto', path: '/photos' },
  { name: 'Regolamento', path: '/regulation' },
]

export const metadata: Metadata = {
  title: 'GOinUP Vertical',
  description: 'Circuito di gare vertical a scopo benefico',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode,
}>) {

  return (
    <>
      <Header links={links} threshold={50} />
      <Sidebar links={links} />
      <AppShellMain className="page-layout">
        {children}
      </AppShellMain>
      <Credits className="mt-16" />
      <Footer />
    </>
  )
}
