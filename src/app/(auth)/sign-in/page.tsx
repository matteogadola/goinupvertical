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
  const { supabase, session } = useSupabase()

  useEffect(() => {
    if (session?.user) {
      router.replace('/admin');
    }
    /*supabase.auth.getSession().then(res => {
      console.log("getSession", res.data.session)
      if (res.data.session) {
        router.replace('/admin');
      }
    })*/
  }, [session]);

  const [error, setError] = useState<string | undefined>(undefined)

  const [state, setState] = useState({
    error: undefined,
    mode: 'sign-in'
  });

  //const [mode, setMode] = useState<'sign-in' | 'sign-up'>('sign-in');
  //const supabase = useStore((state) => state.supabase);

  //console.log(supabase.auth)

  const signIn = async (formData: any) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    })

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }

  const signUp = async (formData: any) => {
    const { data, error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        data: {
          first_name: formData.first_name,
          last_name: formData.last_name,
        }
      }
    })

    if (error) {
      throw new Error(error.message);
    }

    return data;
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
    try {
      if (state.mode === 'sign-in') {
        await signIn(data);
      } else if (state.mode === 'sign-up') {
        await signUp(data);
      } else {
        throw new Error('Operazione non gestita');
      }
      // router.refresh();
    } catch (e: any) {
      setError(e.message);
      return;
    }
    // reset();
  }

  const toggle = () => {
    const mode = state.mode === 'sign-in' ? 'sign-up' : 'sign-in'
    setState({ ...state, mode })
  }

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

          { error &&
            <div className="col-span-1 lg:col-span-2 mt-4">
              <div className="relative px-2 py-1 leading-normal text-red-700" role="alert">
                <span className="absolute inset-y-0 left-0 flex items-center ml-4">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" fillRule="evenodd"></path></svg>
                </span>
                <p className="ml-8">{error}</p>
              </div>
            </div>
          }

          <button type="submit" className="col-span-1 lg:col-span-2 mt-4 bg-blue-200 hover:opacity-80 font-bold py-2 px-4 rounded">
            { state.mode === 'sign-in' ? 'Accedi' : 'Iscriviti' }
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