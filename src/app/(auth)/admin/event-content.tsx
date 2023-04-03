'use client';

import { getItem } from '@/lib/items'
import Link from 'next/link'
import Image from 'next/image'

import { base64 } from '@/lib/helpers'
import { Suspense, useState } from 'react'
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

type EventForm = Partial<Event>

// https://tailwindcomponents.com/component/tags
//export default async function HomeBanner({ ticket }: { ticket: Ticket }) {
export default function EventContent({ event, className }: { event: Event | undefined, className?: string }) {
  //const entries = await getEntries('cech-vertical-2')
  
  const {
    register,
    handleSubmit,
    control,
    getValues,
    setValue,
    clearErrors,
    reset,
    formState: { errors }
  } = useForm<EventForm>({
    mode: 'onTouched',
  })

  const onSubmit: SubmitHandler<EventForm> = async (data) => {
    
  }


  return (
    <Suspense fallback={<Spinner />}>
      { event &&
      <section className={classNames(className, "")}>

        <h3 className="overtitle">{event.name}</h3>
        
        <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>

        </form>

        
      </section>
      }
    </Suspense>
  )
}
