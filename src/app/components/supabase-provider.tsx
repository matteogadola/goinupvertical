'use client'

import { createContext, useContext, useState } from 'react'
import { createClient } from '../../lib/supabase-auth-client'

import type { Session, SupabaseClient } from '@supabase/auth-helpers-nextjs'
import type { Database } from '../../types/supabase'

type MaybeSession = Session | null;

type SupabaseContext = {
  supabase: SupabaseClient<Database>,
  session: MaybeSession
}

const Context = createContext<SupabaseContext | undefined>(undefined)

//export default 
function SupabaseProvider({ children, session }: { children: React.ReactNode, session: MaybeSession }) {
  const [supabase] = useState(() => createClient())

  return (
    <Context.Provider value={{ supabase, session }}>
      <>{children}</>
    </Context.Provider>
  )
}

//export
const useSupabase = () => {
  const context = useContext(Context);
  if (context === undefined) {
    throw new Error("useSupabase must be used inside SupabaseProvider");
  } else {
    return context;
  }
}
/*
export const useUser = async () => {
  const context = useContext(Context);
  if (context === undefined) {
    throw new Error("useUser must be used inside SupabaseProvider");
  } else {
    const session = await context.supabase.auth.getSession();
    return session.data.session?.user;
  }
}
*/