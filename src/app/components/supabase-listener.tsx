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
      console.log("cambiato")
      if (session?.access_token !== serverAccessToken) {
        console.log("refresh")
        router.refresh()
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [supabase, router, serverAccessToken])

  return null
}