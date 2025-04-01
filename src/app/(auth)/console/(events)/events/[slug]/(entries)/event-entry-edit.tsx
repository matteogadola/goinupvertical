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
import { DownloadIcon, UserPenIcon } from "lucide-react";
import { isNotEmpty, useForm } from "@mantine/form";
import { isTinValid, verifyTin } from "@/utils/tin";
import { capitalize } from "@/utils/text";

const clubs = getClubs()

export default function EntryEditButton({
  entry,
  onUpdate,
}: {
  readonly entry: any,
  readonly onUpdate?: any
}) {
  const [opened, { open, close }] = useDisclosure(false)
  // il bottone loading={loading} loaderProps={{ type: 'dots' }}
  return (
    <>
      <Button variant="outline" size="sm" onClick={open}>
        <UserPenIcon className="size-4" aria-hidden="true" />
      </Button>
      <Modal opened={opened} onClose={close} title={"MODIFICA ISCRIZIONE - " + entry.last_name + " " + entry.first_name} withCloseButton={false} closeOnClickOutside={false} size="xl">
        <ConsoleEventEntryEdit entry={entry} onClose={close} onUpdate={onUpdate} />
      </Modal>
    </>
  )
}

function ConsoleEventEntryEdit({ entry, onClose, onUpdate }: { entry: any, onClose: any, onUpdate: any }) {
  const supabase = createClient()

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      first_name: entry.first_name,
      last_name: entry.last_name,
      tin: entry.tin,
      club: entry.club,
      email: entry.email,
      phone_number: entry.phone_number
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

    /*try {
      if (await entryExist(event.id, data.tin)) {
        form.setFieldError('tin', 'Codice fiscale già iscritto alla gara');
        return
      }
    } catch(e: any) {
      console.log(e.message)
      // mostra errore
    }*/

    const delta = Object.fromEntries(Object.entries(data).filter(([key, value]: any) => value !== entry[key]))

    if (Object.keys(delta).length) {
      console.log(`delta (${entry.order_item_id})`, delta)
      const updatedEntry = await updateEntry(entry.order_item_id, delta)
      return onUpdate(updatedEntry)
    }
    return onClose()
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
        <Button onClick={onClose} variant="subtle" color="gray">Chiudi</Button>
        <Button onClick={onSubmit} variant="filled">Salva</Button>
      </div>

    </form>
  )
}

const updateEntry = async (order_item_id: number, params: any) => {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('entries')
    .update(params)
    .eq('order_item_id', order_item_id);

  if (error) {
    throw new Error(error.message)
  }

  return { ...params, order_item_id }
}
