'use client';

import { getItem } from '@/lib/items'
import Link from 'next/link'
import Image from 'next/image'

import { base64 } from '@/lib/helpers'
import { Suspense, useState, use, useEffect, cache } from 'react'
import { getEvents } from '@/lib/events'
import { dt, getDate } from '@/lib/date'
//import { base64 } from '@/lib/helpers'

import goinup from 'public/images/credits/goinup.png'

import classNames from 'classnames'
import Spinner from '@/components/spinner'
import { getOrders, getEntries } from '@/app/lib/views'
import { Attachment, Event } from '@/types/events'
import { useSupabase } from '@/app/components/supabase-provider';
import { SubmitHandler, useForm } from 'react-hook-form';
import { createClient } from '@/lib/supabase-auth-browser'
import EntriesList from './entries-list';
import { Entry } from '@/types/entries';
import { Item } from '@/types/items';
import AttachmentsList from './attachments-list';
import AttachmentDialog from './attachment-dialog';

type EventForm = Partial<Event>

interface State {
  items: Item[];
  entries: any[]; // any[]
  isAddEntryDialogOpened: boolean;
}

const supabase = createClient();

const fetchEventItems = cache(async (id: string | undefined) => {
  if (id === undefined) return [];

  const { data } = await supabase
    .from('items')
    .select()
    .eq('event_id', id)
    .returns<Item[]>();
  
    // if event date is today vendi solo on-site
    // in caso contrario solo ticket
  return data ?? [];
});

const fetchEntries = cache(async (id: string | undefined) => {
  if (id === undefined) return [];

  const { data } = await supabase.from('v_entries').select().eq('event_id', id);
  return data ?? [];
});

export default function EventContent({ event, className }: { event: Event | undefined, className?: string }) {
  /*const [state, setState] = useState<State>({ entries: [], items: [], isAddEntryDialogOpened: false });

  useEffect(() => {
    if (event?.id === undefined) {
      console.log("undefined")
      setState({ ...state, entries: [], items: [] });
    } else {
      console.log(event.id)
      fetchEntries(event.id)
        .then(entries => setState({ ...state, entries }))
        .catch(() => setState({ ...state, entries: [] }));

      fetchEventItems(event.id)
        .then(items => setState({ ...state, items }))
        .catch(() => setState({ ...state, items: [] }));
    }

    //setValue('status', event?.status);
  }, [event]);*/

  //const [entries, setEntries] = useState<any | undefined>(undefined)
  const [state, setState] = useState<State>({
    entries: [],
    items: [],
    isAddEntryDialogOpened: false,
  });

  useEffect(() => {
    Promise.all([
      fetchEntries(event?.id),
      fetchEventItems(event?.id)
    ]).then((values) => {
      setState({ ...state, entries: values[0], items: values[1] });
    }).catch((e) => {
      setState({ ...state, entries: [], items: [] });
    });

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

          { /* qui va la form di modifica evento */ }

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

          <AttachmentsList attachments={event.attachments} className="mt-8" />

          <EntriesList entries={state.entries} items={state.items} event={event} className="mt-8" />
        </section>
      }
    </Suspense>
  )
}
