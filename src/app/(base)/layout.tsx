import {
  AppShell,
  MantineProvider,
  AppShellHeader,
  AppShellNavbar,
  AppShellMain
} from '@mantine/core';
import Navbar from '@/components/ui/mantine/navbar';
import Sidebar from '@/components/ui/mantine/sidebar';
import Footer from '@/components/footer';

const links = [
  { name: "Home", path: "/", visible: false },
  { name: "Classifiche", path: "/results" },
  { name: "Foto", path: "/photos" },
  { name: "Regolamento", path: "/regulation" },
]

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
      <AppShellMain className="page"> {/* elimina */}
        {children}
        <Footer />
      </AppShellMain>
    </>
  );
}
