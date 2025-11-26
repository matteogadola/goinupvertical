import { Analytics } from '@vercel/analytics/next';
import { MantineProvider } from '@mantine/core';
import AppContainer from '@/components/layout/container';
import { fonts } from '@/utils/fonts';
import './globals.css'
import type { Metadata } from 'next'

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
    <html lang="it">
      <body className={`${fonts.map(font => font.variable).join(' ')} antialiased flex flex-col min-h-screen`}>
        <MantineProvider>
          <AppContainer>
            {children}
          </AppContainer>
        </MantineProvider>
        <Analytics />
      </body>
    </html>
  );
}
