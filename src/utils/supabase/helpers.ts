import { Session } from '@supabase/supabase-js'
import { jwtDecode } from 'jwt-decode'
import { createClient } from './server'
import { Claims, Role } from '@/types/user'

export const getClaims = async (session?: Session | null) => {

  try {
    if (!session) {
      const supabase = await createClient()
      const { data } = await supabase.auth.getSession()
      session = data.session
    }

    if (!session) return null

    return jwtDecode<Claims>(session.access_token)
  } catch(e) {
    return null
  }
}


const roles = ['viewer', 'editor', 'manager', 'admin', 'owner']
export const hasRole = (role: Role, claims?: Claims | null) => {
  if (!claims || !claims.user_role) return false

  if (roles.indexOf(claims.user_role) >= roles.indexOf(role)) {
    return true
  }
  return false
}
