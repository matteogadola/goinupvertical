import { AppShellMain } from '@mantine/core'
import Header from '@/components/mantine/header'
import Footer from '@/components/footer';
import { Metadata } from 'next';

const links = [
  { name: "Home", path: "/", visible: false },
  { name: "Classifiche", path: "/results" },
  { name: "Foto", path: "/photos" },
  { name: "Regolamento", path: "/regulation" },
]

export const metadata: Metadata = {
  title: "GOinUP Vertical",
  description: "Circuito di gare vertical a scopo benefico",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <>
      <Header links={links} />
      <AppShellMain className="page">
        {children}
      </AppShellMain>
      <Footer />
    </>
  )
}
