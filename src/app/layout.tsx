import '@/app/globals.css'
import { fonts } from '@/app/lib/fonts'

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="it" className={`${fonts.map(font => font.variable).join(' ')}`}>
      <head />
      <body className="flex flex-col min-h-screen">
        {children}
      </body>
    </html>
  )
}
