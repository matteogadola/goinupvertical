import { AppShellMain } from '@mantine/core'
import Header from '@/components/mantine/header'
import Footer from '@/components/footer';

const links = [
  { name: "Home", path: "/", visible: false },
  { name: "Classifiche", path: "/results" },
  { name: "Foto", path: "/photos" },
  { name: "Regolamento", path: "/regulation" },
]

export default function BaseLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <>
      <Header links={links} />
      <AppShellMain>
        {children}
      </AppShellMain>
      <Footer />
    </>
  )
}
