import { createClient } from '@supabase/supabase-js';

export default createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
/*
import { headers, cookies } from 'next/headers';
import { createServerComponentSupabaseClient } from '@supabase/auth-helpers-nextjs';

import type { Database } from '@/types/supabase';

export const createServerClient = () =>
  createServerComponentSupabaseClient<Database>({
    headers,
    cookies,
  });
*/
