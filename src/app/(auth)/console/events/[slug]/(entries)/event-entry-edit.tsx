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

const dateParser: DateInputProps['dateParser'] = (input) => {
  if (/^[0-9]{4}$/.test(input)) {
    return new Date(Number(input), 0, 1);
  }

  return dt(input, ['DD/MM/YYYY', 'D/MM/YYYY', 'DD/M/YYYY', 'D/M/YYYY']).toDate();
};

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/shadcn/form"
import { Input } from "@/components/ui/shadcn/input"
import { Autocomplete, Button, Modal, TextInput } from "@mantine/core";
import { DownloadIcon, UserPenIcon } from "lucide-react";
import { isNotEmpty, useForm } from "@mantine/form";
import { isTinValid, verifyTin } from "@/utils/tin";
import { capitalize } from "@/utils/text";

const clubs = getClubs()

export default function EntryEditButton({
  entry,
  onUpdate,
}: {
  entry: any,
  onUpdate?: any
}) {
  const [opened, { open, close }] = useDisclosure(false)
  // il bottone loading={loading} loaderProps={{ type: 'dots' }}
  return (
    <>
      <Button variant="outline" size="sm" onClick={open}>
        <UserPenIcon className="size-4" aria-hidden="true" />
      </Button>
      <Modal opened={opened} onClose={close} title={"MODIFICA ISCRIZIONE - " + entry.last_name + " " + entry.first_name} withCloseButton={false} closeOnClickOutside={false} size="xl">
        <ConsoleEventEntryUpdate entry={entry} onClose={close} onUpdate={onUpdate} />
      </Modal>
    </>
  )
}

function ConsoleEventEntryUpdate({ entry, onClose, onUpdate }: { entry: any, onClose: any, onUpdate: any }) {
  const supabase = createClient()

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      first_name: entry.first_name ?? '',
      last_name: entry.last_name ?? '',
      tin: entry.tin ?? '',
      gender: entry.gender ?? '',
      birth_date: '',
      birth_place: '',
      club: entry.club ?? '',
      //email: entry.email ?? '',
      //phone_number: entry.phone_number ?? '',
    },
    validate: {
      first_name: isNotEmpty('Inserisci il nome'),
      last_name: isNotEmpty('Inserisci il cognome'),
      //email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Indirizzo mail non valido'),
      tin: (value) => isTinValid(value)
    },
  });

  const onSubmit = async () => {
    const data = form.getValues()

    const { data: { user }, error } = await supabase.auth.getUser()

    try {
      verifyTin(data.tin, data.first_name, data.last_name)
    } catch(e: any) {
      form.setFieldError('tin', e.message);
      return
    }
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
    <>
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

        </div>
      
        <p className="mt-6">
          <span className="block text-xs text-gray-600 dark:text-gray-500">
            Completando l&apos;iscrizione accetti i <a href="/legal/terms" target="_blank" className="link" rel="noopener noreferrer">Termini e condizioni</a> e l&apos;<a href="/legal/privacy-policy" target="_blank" className="link" rel="noopener noreferrer">informativa sulla privacy</a>
          </span>
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
          <Button onClick={onClose} variant="subtle" color="gray">Chiudi</Button>
          <Button onClick={onSubmit} variant="filled">Vai al pagamento</Button>
        </div>

      </form>
    </>
  )
}


const updateOrderItems = async (id: number) => {
  const supabase = createClient()
  const params = {
    status: 'confirmed',
    payment_status: 'paid',
    payment_date: dayjs.utc().format(),
  }

  const { data, error } = await supabase
    .from('order_items')
    .update(params)
    .eq('order_id', id);

  if (error) {
    throw new Error(error.message)
  }

  return { ...params, order_id: id }
}
