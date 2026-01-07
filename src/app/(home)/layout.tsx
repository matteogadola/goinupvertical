import { AppShellMain } from '@mantine/core';
import Header from '@/components/layout/header';
import Sidebar from '@/components/layout/sidebar';
import Footer from '@/components/layout/footer';
import Credits from '@/components/credits';

const links = [
  { name: "Home", path: "/", visible: false },
  { name: "Classifiche", path: "/results" },
  { name: "Foto", path: "/photos" },
  { name: "Regolamento", path: "/regulation" },
]

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <>
      <Header links={links} />
      <Sidebar links={links} />
      <AppShellMain>
        {children}
      </AppShellMain>
      <Credits className="mt-16" />
      <Footer />
    </>
  )
}
