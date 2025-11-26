import Header from '@/components/layout/header';
import HomeHero from './home-hero';
import Sidebar from '@/components/layout/sidebar';
import { AppShellMain } from '@mantine/core';
import Credits from '@/components/credits';
import Footer from '@/components/footer';


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
