import type { Metadata } from 'next'
import './globals.css'
import { fonts } from '@/utils/fonts'

import { AppShell, MantineProvider, AppShellHeader,
  AppShellNavbar,
  AppShellMain
 } from '@mantine/core';
import AppContainer from '@/components/ui/mantine/app';
import Navbar from '@/components/ui/mantine/navbar';
import Sidebar from '@/components/ui/mantine/sidebar';

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
    <html lang="it">
      <body className={`${fonts.map(font => font.variable).join(' ')} antialiased flex flex-col min-h-screen`}>
        <MantineProvider>
          <AppContainer>
            {children}
          </AppContainer>
        </MantineProvider>
      </body>
    </html>
  );
}
