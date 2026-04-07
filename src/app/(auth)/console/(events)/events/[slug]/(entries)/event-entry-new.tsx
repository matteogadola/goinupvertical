'use client'

import { dt } from "@/utils/date";
import { getClubs, getMunicipalities } from "@/utils/sanity/queries";
import { DateInput, DateInputProps } from "@mantine/dates";
import { useDisclosure } from "@mantine/hooks";
import { use, useEffect, useMemo, useState } from "react";
import CodiceFiscale from 'codice-fiscale-js'
import ErrorTexty from "@/components/ui/error-text";
import ErrorText from "@/components/ui/error-text";
import { createClient } from "@/utils/supabase/client";
import { Order } from "@/types/orders";
import dayjs from "dayjs";
import { YearPickerInput } from '@mantine/dates';

import { Autocomplete, Button, Modal, Switch, TextInput } from "@mantine/core";
import { DownloadIcon, PlusIcon, UserPenIcon } from "lucide-react";
import { isNotEmpty, useForm } from "@mantine/form";
import { isTinValid, verifyTin } from "@/utils/tin";
import { capitalize } from "@/utils/text";
import { Event } from "@/types/events";
import { FunctionsHttpError } from "@supabase/supabase-js";


const clubs = getClubs()

export default function EntryNewButton({
  event,
  onCreate,
  children,
}: {
  event: Partial<Event>,
  onCreate?: any,
  children: any,
}) {
  const [opened, { open, close }] = useDisclosure(false)

  // il bottone loading={loading} loaderProps={{ type: 'dots' }}
  const product = event.products?.[0]

  if (!product) {
    return <></>
  }

  return (
    <>
      <Button variant="outline" size="sm" onClick={open}>
        <PlusIcon />{children}
      </Button>
      <Modal opened={opened} onClose={close} title={`NUOVA ISCRIZIONE - ${product.name}`} withCloseButton={false} closeOnClickOutside={false} size="xl">
        <ConsoleEventEntryNew event={event} onClose={close} onCreate={onCreate} />
      </Modal>
    </>
  )
}

function ConsoleEventEntryNew({ event, onClose, onCreate }: { event: Partial<Event>, onClose: any, onCreate: any }) {
  const supabase = createClient()
  const product = event.products?.[0]
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      /*event_id: event.id,
      product_id: product.id,
      product_name: product.name,
      price: product.price,
      quantity: 1,
      payment_method: 'cash',
      payment_status: 'pending',
      end_sale_date: product.date ?? event.date ? dt(event.date).subtract(2, 'days').format() : null,

      first_name: '',
      last_name: '',
      //birth_year: '',
      gender: '',
      country: 'ITA',
      club: '',
      email: '',
      phone_number: '',
      tin: ''*/
      first_name: '',
      last_name: '',
      tin: '',
      gender: '',
      birth_date: '',
      birth_place: '',
      club: '',
      email: '',
      phone_number: '',
      payment_status: 'pending',
    },
    validate: {
      //first_name: isNotEmpty('Inserisci il nome'),
      //last_name: isNotEmpty('Inserisci il cognome'),
      //email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Indirizzo mail non valido'),
      //tin: (value) => isTinValid(value)
    },
  });

  const onSubmit = async () => {
    const data = form.getValues()
    setLoading(true)
    setError(null)

    let tin;
    try {
      tin = verifyTin(data.tin, data.first_name, data.last_name);
    } catch (e: any) {
      form.setFieldError('tin', 'Errore in Codice Fiscale');
      return
    }

    /*createEntry({
      ...data,
      description: capitalize(`${data.first_name} ${data.last_name}`),
      quantity: 1,
      first_name: capitalize(data.first_name),
      last_name: capitalize(data.last_name),
      //birth_date: data.birth_year
      //  ? `${data.birth_year}-01-01`
      //  : `${tin.year}-${String(tin.month).padStart(2, '0')}-${String(tin.day).padStart(2, '0')}`,
      birth_date: `${tin.year}-${String(tin.month).padStart(2, '0')}-${String(tin.day).padStart(2, '0')}`,
      tin: data.tin.toUpperCase(),
      gender: data.gender || tin.gender,
      email: data.email.toLowerCase(),
      club: data.club ? data.club.trim().toUpperCase() : null,
    })*/

    try {
      const entry = await createEntry({
        event_id: event.id,
        product_id: product.id,
        product_name: product.name,
        price: product.price,
        quantity: 1,
        payment_method: 'cash',
        payment_status: data.payment_status,
        end_sale_date: product.date ?? event.date ? dt(event.date).subtract(2, 'days').format() : null,
        description: capitalize(`${data.first_name} ${data.last_name}`),
        entry: {
          ...data,
          first_name: capitalize(data.first_name),
          last_name: capitalize(data.last_name),
          tin: data.tin.toUpperCase(),
          birth_date: `${tin.year}-${String(tin.month).padStart(2, '0')}-${String(tin.day).padStart(2, '0')}`,
          gender: data.gender || tin.gender,
          email: data.email.toLowerCase(),
          club: data.club ? data.club.trim().toUpperCase() : null,
        },
      })
      console.log("SBREM", entry)
      onCreate(entry)
      onClose()
    } catch (e: any) {
      setError(e.message)
    } finally {
      setLoading(false)
    }

    

    /**/
    //onCreate(data)
    /*try {
      verifyTin(data.tin, data.first_name, data.last_name)
    } catch(e: any) {
      form.setFieldError('tin', e.message);
      return
    }*/
    /*
    try {
      if (await entryExist(event.id, data.tin)) {
        form.setFieldError('tin', 'Codice fiscale già iscritto alla gara');
        return
      }
    } catch(e: any) {
      console.log(e.message)
      // mostra errore
    }

    if (await save(data)) {
      router.push('/checkout')
    } else if (!form.isDirty()) {
      const items = useCartStore.getState().items

      if (items.length) {
        form.clearErrors()
        router.push('/checkout')
      }
    }

    addItem({
      product_id: product._id,
      product_name: product.name,
      description: capitalize(`${data.first_name} ${data.last_name}`),
      price: product.price,
      quantity: 1,
      payment_methods: product.payment_methods,
      event_id: event._id,
      entry: {
        ...data,
        first_name: capitalize(data.first_name),
        last_name: capitalize(data.last_name),
        tin: data.tin.toUpperCase(),
        email: data.email.toLowerCase(),
      },
    })*/

  }

  return (
    <form className="py-4">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">

        <TextInput
          withAsterisk
          label="Nome"
          className="col-span-2"
          key={form.key('first_name')}
          {...form.getInputProps('first_name')}
        />

        <TextInput
          withAsterisk
          label="Cognome"
          className="col-span-2"
          key={form.key('last_name')}
          {...form.getInputProps('last_name')}
        />


        <TextInput
          withAsterisk
          label="Codice fiscale"
          className="col-span-2"
          inputWrapperOrder={['label', 'input', 'description', 'error']}
          key={form.key('tin')}
          {...form.getInputProps('tin')}
        />

        {/*<YearPickerInput
          withAsterisk
          label="Anno di nascita"
          className="col-span-2"
          key={form.key('birth_year')}
          {...form.getInputProps('birth_year')}
        />*/}

        <Autocomplete
          label="Società"
          placeholder="Opzionale"
          className="col-span-2"
          limit={5}
          key={form.key('club')}
          {...form.getInputProps('club')}
          data={clubs}
        />

        <TextInput
          withAsterisk
          label="Email"
          placeholder=""
          className="col-span-2"
          key={form.key('email')}
          {...form.getInputProps('email')}
        />

        <TextInput
          label="Telefono"
          placeholder="Opzionale"
          className="col-span-2"
          key={form.key('phone_number')}
          {...form.getInputProps('phone_number')}
        />

        <Switch
          defaultChecked
          color="green"
          labelPosition="left"
          label="Pagato?"
          key={form.key('payment_status')}
          {...form.getInputProps('payment_status')}
        />

      </div>

      <p className="mt-6">
        <span className="block text-xs text-red-600">{error}</span>
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
        <Button onClick={onClose} variant="subtle" color="gray">Chiudi</Button>
        <Button onClick={onSubmit} variant="filled">Salva</Button>
      </div>

    </form>
  )
}


const createEntry = async (item: any) => {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  console.log('sbrem', item)

  const response = await fetch('/api/checkout', {
    method: 'POST',
    body: JSON.stringify({
      customer_email: item.entry?.email,
      customer_first_name: item.entry?.first_name,
      customer_last_name: item.entry?.last_name,
      user_id: user?.id,
      payment_method: item.payment_method,
      items: [item]
    }),
  })
  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data
}
