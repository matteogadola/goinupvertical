import './globals.css'
import { fonts } from '../lib/fonts'
import Navbar from '@/app/components/navbar'
import Footer from '@/app/components/footer'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="it" className={`${fonts.map(font => font.variable).join(' ')}`}>
      <head />
      <body className="flex flex-col min-h-screen">
        <Navbar />
        <main>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
