'use server'

import { Claims, Role } from "@/types/user"

const roles = ['viewer', 'editor', 'manager', 'admin', 'owner']

export const hasRole = async (role: Role, claims?: Claims | null) => {
  if (!claims || !claims.user_role) return false

  if (roles.indexOf(claims.user_role) >= roles.indexOf(role)) {
    return true
  }
  return false
}
