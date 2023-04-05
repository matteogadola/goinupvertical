'use client'

import { useStore } from '@/store/store'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useSupabase } from './supabase-provider'

export default function SupabaseListener({ serverAccessToken }: { serverAccessToken?: string }) {
  const { supabase } = useSupabase()
  const router = useRouter()

  const setAuthSession = useStore((state) => state.setAuthSession);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setAuthSession(session);
      if (session?.access_token !== serverAccessToken) {
        router.refresh();
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [supabase, router, serverAccessToken])

  return null
}