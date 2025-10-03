'use client'

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isNotEmpty, useForm } from "@mantine/form";
import { Button, TextInput, NumberInput, Divider } from "@mantine/core";
import { dt } from "@/utils/date";

export default function EventReservation({ event, products }: { event: any, products: any[] }) {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [totalAmount, setTotalAmount] = useState<number>(0);

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
    onValuesChange: (values) => {
      const totalAmount = Object.entries(values.items).reduce((a, [id, quantity]: any) => {
        const product = products.find((item: any) => item._id === id)
        return a + (quantity * product.price);
      }, 0);
      setTotalAmount(totalAmount);
    },
  });

  const onSubmit = async () => {
    if (form.validate().hasErrors) return;

    const data = form.getValues()
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
          payment_methods: 'on-site',
          event_id: event._id,
          end_sale_date: product.date ?? event.date ? dt(event.date).subtract(2, 'days').format() : null,
        }
      })

    console.log({
      customer_email: data.email,
      customer_first_name: data.first_name,
      customer_last_name: data.last_name,
      payment_method: 'on-site',
      items: items
    })

    try {
      const response: Response = await fetch('/api/checkout', {
        method: 'POST',
        body: JSON.stringify({
          customer_email: data.email,
          customer_first_name: data.first_name,
          customer_last_name: data.last_name,
          payment_method: 'on-site',
          items: items
        }),
      })
      const responseData = await response.json()

      if (!response.ok) {
        throw new Error(responseData.message);
      }

      router.replace(responseData.checkoutSessionUrl)
    } catch (e: any) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

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
                  <p className=" text-sm text-gray-600">{item.summary}</p>
                </div>
                <div>
                  <span className="">{item.price / 100}€</span>
                </div>
                <NumberInput
                  placeholder="Quantità"
                  allowNegative={false}
                  key={form.key(`items.${item._id}`)}
                  {...form.getInputProps(`items.${item._id}`)}
                />
              </div>
            ))}
            <div className="mt-6 flex justify-between">
              <span className="text-lg uppercase">Totale</span>
              <span className="text-lg">{totalAmount / 100}€</span>
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
