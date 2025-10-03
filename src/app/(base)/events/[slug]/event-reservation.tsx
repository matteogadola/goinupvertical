'use client'

import { dt } from "@/utils/date";
import clsx from "clsx";
import Link from "next/link";
import EventEntryForm from "./event-entry-form";
import EventEntryStatus from "@/components/events/entry-status";
import { useEffect, useState } from "react";
import { isNotEmpty, useForm } from "@mantine/form";
import { Button, TextInput, NumberInput, Divider } from "@mantine/core";
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
      items: Object.fromEntries(products.map(item => [item._id, 0]))
    },
    validate: {
      first_name: isNotEmpty('Inserisci il nome'),
      last_name: isNotEmpty('Inserisci il cognome'),
      email: (value) => (/^[\w-+.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value) ? null : 'Indirizzo mail non valido'),
    },
  });

  const onItemChange = ({ target }: any) => {
    const totalAmount = Object.entries(form.getValues().items).reduce((a, [id, quantity]: any) => {
      const product = products.find((item: any) => item._id === id)
      return a + (quantity * product.price);
    }, 0);
    setTotalAmount(totalAmount);
  };

  const [totalAmount, setTotalAmount] = useState<number>(0);

  const onSubmit = async () => {
    if (form.validate().hasErrors) return;

    const data = form.getValues()

    console.log(data)

    const items = Object.entries(data.items)
      .filter(([id, quantity]: any) => quantity > 0)
      .map(([id, quantity]) => {
        const product = products.find((item: any) => item._id === id)

        return {
          product_id: id,
          product_name: product.name,
          description: '',
          price: product.price,
          quantity,
          payment_methods: 'cash',
          event_id: event._id,
          end_sale_date: product.date ?? event.date ? dt(event.date).subtract(2, 'days').format() : null,
        }
      })

    console.log(items)
    /*
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        body: JSON.stringify({
          customer_email: data.email,
          customer_first_name: data.first_name,
          customer_last_name: data.last_name,
          payment_method: 'cash',
          items: data.items
        }),
      })
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message);
      }

      router.replace(data.checkoutSessionUrl)
    } catch (e: any) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
    */

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
    <div className="px-4 py-2 bg-slate-50 shadow-sm">
      <div className="flex space-x-4 items-baseline">
        <h2 className ="font-unbounded text-xl">Modulo di prenotazione</h2>
      </div>

      <p className="text-gray-600 hidden">{}</p>

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
        </div>

        {!!products.length &&
          <div>
            <Divider my="md" />
            {products.map((item, index) => (
              <div key={index} className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 items-center">
                <div className="lg:col-span-2">
                  <h2 className="">{item.name}</h2>
                  <p className="text-sm text-gray-600">{item.summary}</p>
                </div>
                <div>
                  <span className="text-gray-800 text-lg uppercase">{item.price / 100}€</span>
                </div>
                <NumberInput
                  placeholder="Quantità"
                  allowNegative={false}
                  key={form.key(`items.${item._id}`)}
                  {...form.getInputProps(`items.${item._id}`)}
                  onChange={onItemChange}
                />
              </div>
            ))}
            <div>
              <span className="text-gray-800 text-lg uppercase">Totale</span>
              <span className="text-gray-800 text-lg uppercase">{totalAmount / 100}€</span>
            </div>
          </div>
        }

        <p className="mt-6">
          <span className="block text-xs text-gray-600 dark:text-gray-500">
            Completando l&apos;iscrizione accetti i <a href="/legal/terms" target="_blank" className="link" rel="noopener noreferrer">Termini e condizioni</a> e l&apos;<a href="/legal/privacy-policy" target="_blank" className="link" rel="noopener noreferrer">informativa sulla privacy</a>
          </span>
        </p>

        <div className="flex justify-end mt-4">
          <Button onClick={onSubmit} variant="filled">Conferma prenotazione</Button>
        </div>
      </form>
    </div>
  )
}
