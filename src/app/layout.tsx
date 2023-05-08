import './globals.css'
import { fonts } from '@/app/lib/fonts'
import Navbar from '@/app/components/navbar'
import Footer from '@/app/components/footer'
import SupabaseProvider from '@/app/components/supabase-provider'
import SupabaseListener from '@/app/components/supabase-listener'
import { createClient } from '@/lib/supabase-auth-server'

//export const revalidate = 0;

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <html lang="it" className={`${fonts.map(font => font.className).join(' ')}`}>
      <head />
      <body className="flex flex-col min-h-screen">
        <SupabaseProvider session={session}>
          <SupabaseListener serverAccessToken={session?.access_token} />
          <Navbar />
          <main>
            {children}
          </main>
        </SupabaseProvider>
        <Footer />
      </body>
    </html>
  )
}
