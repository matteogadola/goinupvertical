'use client'

import { notFound, useRouter, useSearchParams } from 'next/navigation'
import { Suspense, use, useEffect, useState } from 'react'
import { getItem } from '@/lib/items'
import { base64 } from '@/lib/helpers'
import { Item } from '@/types/items'
import { useStore } from '@/store/store'
import { useSupabase } from '../../components/supabase-provider'
import { SubmitHandler, useForm } from 'react-hook-form'
import classNames from 'classnames'
import Link from 'next/link'
import { createClient } from '@/lib/supabase-auth-browser'

/* Sarebbe carino funzionasse così
export default async function EntryPage() {
  const ticketId = Number(useSearchParams().get('q'))
  const ticket = await getTicket(ticketId)*/

export interface SignUpForm {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

export default function SignIn() {
  const router = useRouter();
  //const { supabase } = useSupabase()
  const supabase = createClient()

  useEffect(() => {
    // ENTRA QUI OGNI VOLTA CHE SPOSTO FOCUS
    supabase.auth.getSession().then(res => {
    
      console.log("getSession", res.data.session)
      if (res.data.session) {
        router.replace('/admin');
      }
    })
  }, [supabase]);

  const [error, setError] = useState<string | undefined>(undefined)

  const [state, setState] = useState({
    error: undefined,
    mode: 'sign-in'
  });

  //const [mode, setMode] = useState<'sign-in' | 'sign-up'>('sign-in');
  //const supabase = useStore((state) => state.supabase);

  //console.log(supabase.auth)

  const handleEmailLogin = async (auth: any) => {
    console.log("dentro3")
    const { data, error } = await supabase.auth.signInWithPassword({
      email: 'gadola.matteo@gmail.com',
      password: 'password',
    })

    if (error) {
      setError(error.message)
    }

    console.log("dentro4")
    console.log(data)

  }

  const signUp = async () => {
    const { data, error } = await supabase.auth.signUp({
      email: 'gadola.matteo@gmail.com',
      password: 'password',
      options: {
        data: {
          first_name: 'John',
          last_name: '',
        }
      }
    })

    if (error) {
      setError(error.message)
    }

    console.log(data)
    /*
    {
    "id": "2850ce01-c98c-48ea-aff5-14e041a5855b",
    "aud": "authenticated",
    "role": "authenticated",
    "email": "gadola.matteo@gmail.com",
    "phone": "",
    "confirmation_sent_at": "2023-03-14T15:52:13.376063818Z",
    "app_metadata": {
        "provider": "email",
        "providers": [
            "email"
        ]
    },
    "user_metadata": {},
    "identities": [
        {
            "id": "2850ce01-c98c-48ea-aff5-14e041a5855b",
            "user_id": "2850ce01-c98c-48ea-aff5-14e041a5855b",
            "identity_data": {
                "email": "gadola.matteo@gmail.com",
                "sub": "2850ce01-c98c-48ea-aff5-14e041a5855b"
            },
            "provider": "email",
            "last_sign_in_at": "2023-03-14T15:52:13.374186326Z",
            "created_at": "2023-03-14T15:52:13.374225Z",
            "updated_at": "2023-03-14T15:52:13.374225Z"
        }
    ],
    "created_at": "2023-03-14T15:52:13.369364Z",
    "updated_at": "2023-03-14T15:52:14.807617Z"
    }*/
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
  }


  const {
    register,
    handleSubmit,
    control,
    getValues,
    setValue,
    clearErrors,
    reset,
    formState: { errors }
  } = useForm<SignUpForm>({
    mode: 'onTouched',
  })

  const onSubmit: SubmitHandler<SignUpForm> = async (data) => {
    console.log("dentro")
    if (state.mode === 'sign-in') {
      console.log("dentro2")
      handleEmailLogin(data);
    }
    reset()
  }

  const toggle = () => {
    const mode = state.mode === 'sign-in' ? 'sign-up' : 'sign-in'
    setState({ ...state, mode })
  }

  /*await supabase.auth.signInWithPassword({
    email: 'jon@supabase.com',
    password: 'password',
  })*/
  //const ticket = base64.decode<Ticket>(searchParams.q)

  // verifica se utente loggato...se si mostra campi compilati
  // se no mostra pulsante per accedere (poi la registrazione si potrà selezionare da sign-in)
  
  return (
    <section className="page">
      <div className="w-1/3 mx-auto">
      <form className="" autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className={classNames({'hidden': state.mode === 'sign-in'})}>
            <label className="label" htmlFor="first_name">Nome</label>
            <input
              type="text"
              className={classNames("field", {"invalid": errors.first_name})}
              {...register("first_name", { required: state.mode === 'sign-in' ? false : 'Campo obbligatorio' })}
            />
            {errors.first_name && <small className="validation-error">{errors.first_name.message}</small>}
          </div>
          <div className={classNames({'hidden': state.mode === 'sign-in'})}>
            <label className="label" htmlFor="last_name">Cognome</label>
            <input
              type="text"
              className={classNames("field", {"invalid": errors.last_name})}
              {...register("last_name", { required: state.mode === 'sign-in' ? false : 'Campo obbligatorio' })}
            />
            {errors.last_name && <small className="validation-error">{errors.last_name.message}</small>}
          </div>

          <div className="col-span-1 lg:col-span-2">
            <label className="label" htmlFor="email">Email</label>
            <input
              type="text"
              className={classNames("field", {"invalid": errors.email})}
              {...register("email", { required: 'Campo obbligatorio' })}
            />
            {errors.email && <small className="validation-error">{errors.email.message}</small>}
          </div>
          <div className="col-span-1 lg:col-span-2">
            <label className="label" htmlFor="password">Password</label>
            <input
              type="password"
              className={classNames("field", {"invalid": errors.password})}
              {...register("password", { required: 'Campo obbligatorio' })}
            />
            {errors.password && <small className="validation-error">{errors.password.message}</small>}
          </div>

          <button type="submit" className="col-span-1 lg:col-span-2 mt-4 bg-blue-200 hover:opacity-80 font-bold py-2 px-4 rounded">
            Iscriviti
          </button>

        </div>
      </form>

      <div className="flex justify-center mt-8">
        { state.mode === 'sign-in'
          ? <span className="text-xs">Non hai un account? <button onClick={toggle} className="text-button hover:opacity-80">Iscriviti</button></span>
          : <span className="text-xs">Hai un account? <button onClick={toggle} className="text-button hover:opacity-80">Accedi</button></span>
        }
      </div>
      
      </div>
    </section>
  )
}