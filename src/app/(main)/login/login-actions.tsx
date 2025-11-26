'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { SignInWithPasswordCredentials } from '@supabase/supabase-js'
import { getClaims } from '@/utils/supabase/helpers'

export const handleSubmit = async (event: any) => {
  event.preventDefault();
  console.log(event.target)
}

// https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations
export async function loginWithPassword(credentials: { email: string, password: string }): Promise<void> {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.signInWithPassword(credentials)

  if (error) {
    switch (error.code) {
      case 'invalid_credentials':
        throw new Error('Indirizzo email o password non corretti.')
      case 'signup_disabled':
        throw new Error('Le registrazioni sono attualmente disabilitate.')
      default:
        throw new Error(error.message)
    }
  }

  // 
  const url = (await getClaims(data.session))?.user_role ? '/console' : '/account'

  revalidatePath(url, 'layout')
  redirect(url)
}

export async function register(formData: { email: string, password: string, first_name: string, last_name: string }): Promise<void> {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.signUp({
    email: formData.email,
    password: formData.password,
    options: {
      emailRedirectTo: `https://www.goinupvertical.it/auth/callback`,
      data: {
        first_name: formData.first_name,
        last_name: formData.last_name,
      }
    }
  })

  if (error) {
    switch (error.code) {
      case 'invalid_credentials':
        throw new Error('Indirizzo email o password non corretti.')
      case 'signup_disabled':
        throw new Error('Le registrazioni sono attualmente disabilitate.')
      default:
        throw new Error(error.message)
    }
  }

  revalidatePath('/', 'layout')
  redirect('/')

  // ---

  // dovranno pushare a confirm apassowrd
  // router.push(data.user.app_metadata.role ? '/admin' : '/account');
  //router.push(data.user?.app_metadata.role ? '/admin' : '/');
  // CONFERMA MAIL
  //router.refresh();

  //return data;
}

export async function loginWithGoogle() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: 'https://www.goinupvertical.it/auth/callback',
    },
  })

  if (error) {
    throw new Error(error.message)
  }
  
  if (data.url) {
    redirect(data.url)
  }
}

export async function loginWithFacebook() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'facebook',
    options: {
      redirectTo: 'https://www.goinupvertical.it/auth/callback',
    },
  })

  if (error) {
    throw new Error(error.message)
  }

  if (data.url) {
    redirect(data.url) // use the redirect API for your server framework
  }
  
}

export async function loginWithStrava() {
}
