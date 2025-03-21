export interface User {
  id: string;
  name: string;
  logo: string | null;
  stripe_account: string | null;
}

export type Role = 'owner' | 'admin' | 'manager' | 'editor' | 'viewer'

export type Claims = {
  user_role?: Role
  user_groups?: number[]
}
