import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/types/supabase'
import { cookies } from 'next/headers'
import NavbarContent from './navbar-content'

export default async function Navbar() {
  const supabase = createServerComponentClient<Database>({ cookies });
  const { data: { session } } = await supabase.auth.getSession();

  return (
    <>
      <NavbarContent session={session} />
    </>
  )
}
