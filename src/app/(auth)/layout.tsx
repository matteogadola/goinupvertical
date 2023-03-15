import { fonts } from '@/lib/fonts'
import Navbar from '@/app/components/navbar'
import Footer from '@/app/components/footer'

import SupabaseListener from '@/app/components/supabase-listener'
import SupabaseProvider from '@/app/components/supabase-provider'
import { createClient } from '@/lib/supabase-auth-server'

//export const revalidate = 0;

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  /*
  const supabase = createClient()

  const {
    data: { session },
  } = await supabase.auth.getSession()

  console.log("layout", session?.user)
*/
  return (
    <>
    {/*<SupabaseProvider>
      <SupabaseListener serverAccessToken={session?.access_token} />
      <main>{children}</main>
    </SupabaseProvider>*/}
    <main>{children}</main>
    </>
  )
}
