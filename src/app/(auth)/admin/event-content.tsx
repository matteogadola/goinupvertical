'use client';

import { getItem } from '@/lib/items'
import Link from 'next/link'
import Image from 'next/image'

import { base64 } from '@/lib/helpers'
import { Suspense, useState, use, useEffect } from 'react'
import { getEvents } from '@/lib/events'
import { dt, getDate } from '@/lib/date'
//import { base64 } from '@/lib/helpers'

import goinup from 'public/images/credits/goinup.png'

import classNames from 'classnames'
import Spinner from '@/components/spinner'
import { getOrders, getEntries } from '@/app/lib/views'
import { Event } from '@/types/events'
import { useSupabase } from '@/app/components/supabase-provider';
import { SubmitHandler, useForm } from 'react-hook-form';
import { createClient } from '@/lib/supabase-auth-browser'
import EntriesList from './entries-list';

type EventForm = Partial<Event>

const supabase = createClient();

async function fetchEvent(id: string | undefined) {
  if (id === undefined) return undefined;

  const { data } = await supabase.from('v_entries').select().eq('event_id', id).order('date');
  return data;
}

export default function EventContent({ event, className }: { event: Event | undefined, className?: string }) {
  const [entries, setEntries] = useState<any | undefined>(undefined)

  useEffect(() => {
    fetchEvent(event?.id)
      .then(entries => setEntries(entries))
      .catch(() => setEntries(undefined));
    
    setValue('status', event?.status);
  }, [event]);
  
  const {
    register,
    handleSubmit,
    control,
    getValues,
    setValue,
    clearErrors,
    reset,
    formState: { errors }
  } = useForm()

  const onSubmit: SubmitHandler<EventForm> = async (data) => {
    
  }

  return (
    <Suspense fallback={<Spinner />}>
      { event &&
        <section className={classNames(className, "")}>

          <h3 className="title">{event.name}</h3>
          
          {/*<form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
            <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">

              <div className="">
                <label className="label" htmlFor="status">Stato</label>
                <select
                  {...register("status")}
                  className="field"
                >
                  <option value="internal">Nascosto</option>
                  <option value="published">Visibile con Link</option>
                  <option value="scheduled">Visibile</option>
                </select>
              </div>

            </div>
          </form>*/}

          <EntriesList entries={entries} eventId={event.id} className="mt-8" />
        </section>
      }
    </Suspense>
  )
}
