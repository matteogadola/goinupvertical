'use client'

import { dt } from "@/utils/date";
import clsx from "clsx";
import Link from "next/link";
import EventEntryForm from "./event-entry-form";
import EventEntryStatus from "@/components/events/entry-status";
import { useEffect, useState } from "react";
import { isNotEmpty, useForm } from "@mantine/form";
import { Button, TextInput, NumberInput } from "@mantine/core";
import { useRouter } from "next/navigation";

export default function EventReservation({ event, products }: { event: any, products: any[] }) {
  //const router = useRouter()

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      first_name: '',
      last_name: '',
      email: '',
      phone_number: '',
    },
    validate: {
      first_name: isNotEmpty('Inserisci il nome'),
      last_name: isNotEmpty('Inserisci il cognome'),
      email: (value) => (/^[\w-+.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value) ? null : 'Indirizzo mail non valido'),
    },
  });

  const onSubmit = async () => {
    if (form.validate().hasErrors) return;

    const data = form.getValues()

    // NO CHIAMATA
    /*addItem({
      product_id: product._id,
      product_name: product.name,
      description: capitalize(`${data.first_name} ${data.last_name}`),
      price: product.price,
      quantity: 1,
      payment_methods: product.payment_methods,
      event_id: event._id,
      end_sale_date: product.date ?? event.date ? dt(event.date).subtract(2, 'days').format() : null,
      entry: {
        ...data,
        first_name: capitalize(data.first_name),
        last_name: capitalize(data.last_name),
        tin: data.tin.toUpperCase(),
        email: data.email.toLowerCase(),
      },
    })*/
  }

  /*const updateQuantity = (id: number, quantity: number) => {
    const updateItem = (items: OrderItem[]) => {
      const originalItem = items.find(item => item.id === id)

      return items.map(item =>
        item.id === id ? { ...originalItem!, quantity } : item
      )
    }

    setState(state => ({ ...state, items: updateItem(state.items) }))
  }

  useEffect(() => {
    const items: any[] = event.items
      ?.sort((a, b) => a.id - b.id)
      ?.map(item => ({ ...item, quantity: 0 }))
      ?? []

    setState(state => ({ ...state, items }))
  }, [event]);*/

  return (
    <section className="mt-8">
      <span className="overtitle my-2">Modulo di prenotazione</span>
      <form className="mt-4 py-4" autoComplete="off">
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

          {!!products.length &&
            products.map((item, index) => (
              <div key={index} className="py-6 flex flex-wrap md:flex-nowrap">
                <div className="flex justify-between content-between w-full">
                  <div>
                    <h2 className="text-xl text-gray-800">{item.name}</h2>
                    <p className="text-sm text-gray-600">{item.summary}</p>
                  </div>
                  <div className="flex items-center md:mr-4">
                    <span className="text-gray-800 text-lg uppercase">{item.price / 100}€</span>
                  </div>
                </div>

                <div className="md:mr-4 items-center flex">
                  <NumberInput
                    label={item.name}
                    description={item.price / 100}
                    placeholder="Seleziona quantità"
                    allowNegative={false}
                  />
                </div>

              </div>
            ))
          }

        </div>

        <p className="mt-6">
          <span className="block text-xs text-gray-600 dark:text-gray-500">
            Completando l&apos;iscrizione accetti i <a href="/legal/terms" target="_blank" className="link" rel="noopener noreferrer">Termini e condizioni</a> e l&apos;<a href="/legal/privacy-policy" target="_blank" className="link" rel="noopener noreferrer">informativa sulla privacy</a>
          </span>
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
          <Button onClick={onSubmit} variant="filled">Conferma prenotazione</Button>
        </div>
      </form>
    </section>
  )
}
