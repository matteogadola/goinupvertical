import './globals.css'
import { fonts } from '../lib/fonts'
import Navbar from '@/app/components/navbar'
import Footer from '@/app/components/footer'
import SupabaseProvider from '@/app/components/supabase-provider'
import SupabaseListener from '@/app/components/supabase-listener'
import { createClient } from '@/lib/supabase-auth-server'

//import SupabaseListener from './components/supabase-listener'
//import SupabaseProvider from './components/supabase-provider'
//import { createClient } from '../lib/supabase-auth-server'

//export const revalidate = 0;

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = createClient()

  const {
    data: { session },
  } = await supabase.auth.getSession()

  return (
    <html lang="it" className={`${fonts.map(font => font.variable).join(' ')}`}>
      <head />
      <body className="flex flex-col min-h-screen">
        <SupabaseProvider session={session}>
          <SupabaseListener serverAccessToken={session?.access_token} />
          <Navbar />
          <main>
            {children}
          </main>
        </SupabaseProvider>
        {/*<Navbar />
        <main>
          {children}
        </main>*/}
        <Footer />
      </body>
    </html>
  )
}
