'use client'

import { FormEvent, useEffect, useState } from 'react'
import { base64 } from '@/lib/helpers'
import { useRouter } from 'next/navigation'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'

import places from 'public/localization/it/places.json'
import teams from 'public/localization/it/teams.json'

import Autocomplete from '@/components/ui/autocomplete'

import classNames from 'classnames'
import { useStore } from '@/store/store'
import Dialog from '@/components/ui/dialog'
import CodiceFiscale from 'codice-fiscale-js'
import { Attachment, Event } from '@/types/events'
import { Entry } from '@/types/entries'
import { Item } from '@/types/items'
import { createCheckout } from '@/lib/checkout'
import { useSupabase } from '@/app/components/supabase-provider'
import { createClient } from '@/lib/supabase-auth-browser'

type AttachmentForm = Omit<Attachment, 'id'>
/*interface AttachmentForm extends Attachment {
}*/

type Props = {
  className?: string;
  attachment: Attachment | undefined;
  //items: Item[];
  onResult(e: any): void;
  onClose(e: any): void;
}

interface State {
  error: string | undefined;
  isLoading: boolean;
}

const supabase = createClient();

const createAttachment = async (attachment: Attachment) => {
  const { data } = await supabase
    .from('attachments')
    .insert(attachment)
    .select()
    .returns<Attachment[]>()
    .single();

  console.log(data)
  return data;
};

export default function AttachmentDialog({ className, attachment, onResult, onClose }: Props) {
  const { supabase, session } = useSupabase()

  const [state, setState] = useState<State>({ error: undefined, isLoading: false });

  // se attachmente undefined
  
  const { register, handleSubmit, control, setValue, setError, reset, formState: { errors } } = useForm<AttachmentForm>({
    defaultValues: attachment
  })

  const onSubmit: SubmitHandler<AttachmentForm> = async data => {
    /*data.tin = data.tin.toUpperCase();

    const item = items.find(item => item.id === Number(data.item_id));

    if (item === undefined) {
      console.warn('Ticket non valido', data);
      setState({ ...state, error: 'Ticket non valido' });
      return
    }

    try {
      setState({ ...state, isLoading: true });

      const order = await createCheckout({
        user_id: session?.user.id,
        payment_method: 'cash',
        user_email: data.email,
        items: [{
          id: item.id,
          event_id: event.id,
          name: item.name,
          price: item.price,
          quantity: 1,
          description: `${data.first_name} ${data.last_name}`,
          entry: data,
        }]
      })
      //setError(null)
      
      if (order) {
        console.debug('[add-entry-dialog] Order inserito correttamente', order);
        onEntryCreated(order);
      }
    } catch (e: any) {
      console.log(JSON.stringify(e.message))
      //setError(e.message)
    } finally {
      setState({ ...state, isLoading: false });
    }*/
  }

  return (
    <section className={classNames(className, "overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center bg-gray-500 bg-opacity-75 transition-opacity")}>
      <div className="relative w-auto my-6 mx-auto max-w-2xl">
        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
          <div className="p-5 border-b border-solid border-slate-200 rounded-t">
            <h3 className="overtitle">Allegato</h3>
            <h1 className="title">{attachment?.name || 'Nuovo'}</h1>
          </div>

          <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
            <div className="relative p-6 flex-auto">

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">


              <div>
                <label className="label" htmlFor="type">Tipologia</label>
                <select
                  className={classNames("field", {"invalid": errors.type})}
                  {...register("type", { required: 'Campo obbligatorio' })}
                >
                  <option value='result'>Classifica</option>
                  <option value='photo'>Foto</option>
                </select>
                {errors.type && <small className="field-error">{errors.type.message}</small>}
              </div>

                <div>
                  <label className="label" htmlFor="name">Nome</label>
                  <input
                    type="text"
                    className={classNames("field", {"invalid": errors.name})}
                    {...register("name", { required: 'Campo obbligatorio' })}
                  />
                  {errors.name && <small className="field-error">{errors.name.message}</small>}
                </div>

                <div className="col-span-1 lg:col-span-2">
                  <label className="label" htmlFor="url">Url</label>
                  <textarea
                    className={classNames("field", {"invalid": errors.url})}
                    {...register("url", { required: 'Campo obbligatorio' })}
                  />
                  {errors.url && <small className="field-error">{errors.url.message}</small>}
                </div>

              </div>

            







            </div>
            <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
              <button onClick={onClose} className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">
                Annulla
              </button>

              <button
                type="submit"
                disabled={state.isLoading}
                className="rounded-md bg-button px-6 py-3 text-base font-medium text-white hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-40"
              >
                { state.isLoading &&
                  <svg aria-hidden="true" role="status" className="inline mr-2 w-4 h-4 text-gray-200 animate-spin dark:text-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"></path>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2"></path>
                  </svg>
                }
                Conferma
              </button>
            </div>

          </form>
        </div>
      </div>
    </section>
  )
}
