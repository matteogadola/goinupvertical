import type { Metadata } from 'next'
import './globals.css'
import { fonts } from '@/utils/fonts'
import { MantineProvider } from '@mantine/core'
import MantineContainer from '@/components/mantine/container'

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
          <MantineContainer>
            {children}
          </MantineContainer>
        </MantineProvider>
      </body>
    </html>
  );
}
