//import { usePathname } from 'next/navigation';
//import Link from 'next/link';

//import Image from 'next/image'
//import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
//import { cookies } from 'next/headers';
//import googleLogo from '/public/images/logo/google.png'
// si risolve ???
// https://stackoverflow.com/questions/78055882/update-parts-of-the-ui-when-authenticated-with-supabase-and-nextjs-14
// https://github.com/giuppidev/giuppi.dev/tree/main

'use client'

import { useMemo, useState } from 'react'
import { useFormStatus } from 'react-dom'
import { Button, MantineProvider, PasswordInput, TextInput } from '@mantine/core'
import { useAuthStore } from '@store/auth'
//import { loginWithGoogle, signIn } from '../login-actions'
import ErrorText from '@components/ui/error-text'
import { useForm } from '@mantine/form'
import { useUiStore } from '@/store/ui'
import { useToggle } from '@mantine/hooks'

interface Credentials {
  email: string
  password: string
}

interface Props {
  isLoading: boolean
  loadingProvider: string | null
  error: string | null
  onClick: () => Credentials

  onLogin: any
  onRegister: any
}

export default function EmailLoginForm({
  onLogin,
  onRegister,
}: Partial<Props>) {
  const { loginLoading, loginProvider, setLoginProvider } = useUiStore()
  const [ error, setError ] = useState<string | null>(null)
  const [ type, toggle ] = useToggle(['login', 'register'])

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      email: '',
      password: '',
      first_name: '',
      last_name: '',
    },
    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
      password: (val) => (val.length <= 6 ? 'Password should include at least 6 characters' : null),
    },
  });

  const onSubmit = async (data: any) => {
    setError(null)
    setLoginProvider('email')

    try {
      if (type === 'login') {
        await onLogin(data)
      } else {
        await onRegister(data)
      }
    } catch(e: any) {
      setError(e.message)
      return
    } finally {
      setLoginProvider(null)
    }
  }

  return (
    <div id="email-login">

      <form onSubmit={form.onSubmit(onSubmit)} className="flex flex-col space-y-2">

        <TextInput
          withAsterisk={type === 'register'}
          label="Email"
          key={form.key('email')}
          {...form.getInputProps('email')}
          required
        />
        <PasswordInput
          withAsterisk={type === 'register'}
          label="Password"
          key={form.key('password')}
          {...form.getInputProps('password')}
          required
        />

        {type === 'register' &&
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <TextInput
              withAsterisk={type === 'register'}
              label="Nome"
              key={form.key('first_name')}
              {...form.getInputProps('first_name')}
              required
            />
            <TextInput
              withAsterisk={type === 'register'}
              label="Cognome"
              key={form.key('last_name')}
              {...form.getInputProps('last_name')}
              required
            />
          </div>
        }

        {!!error &&
          <ErrorText className="mt-2">{error}</ErrorText>
        }

        
        <div className="flex justify-between items-center mt-2">
          {type === 'login'
            ? <span className="text-xs">Non hai un account? <button type="button" onClick={() => toggle()} className="hover:cursor-pointer hover:opacity-80">Iscriviti</button></span>
            : <span className="text-xs">Hai un account? <button type="button" onClick={() => toggle()} className="hover:cursor-pointer hover:opacity-80">Accedi</button></span>
          }
          <Button type="submit" className="" loading={loginProvider === 'email'} disabled={loginLoading}>{ type === 'login' ? 'Accedi' : 'Registrati' }</Button>
        </div>
      </form>
    </div>
  )
}
