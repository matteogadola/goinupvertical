import { createClient } from './supabase/server'
import { cookies } from 'next/headers'
import { cache } from 'react'

// cache() deduplica le chiamate durante il render
export const getUser = cache(async () => {
  //const cookieStore = cookies()
  //const supabase = createClient(cookieStore)
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  return user
})