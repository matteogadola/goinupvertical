'use server'

import { Role } from '@/types/user';
import { getClaims } from '@/utils/supabase/helpers';

const roles = ['admin', 'manager', 'editor', 'owner', 'viewer']

export default async function Guard({
  children,
  hasRole
}: {
  children: any
  hasRole: Role
}) {
  const claims = await getClaims()

  if (!claims || !claims.user_role) return <></>

  if (roles.indexOf(claims.user_role) <= roles.indexOf(hasRole)) {
    return <>{children}</>
  }

  return <></>
}
