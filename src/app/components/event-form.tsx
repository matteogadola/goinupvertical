'use client'

import { FormEvent, useEffect, useState } from 'react'
import { base64 } from '@/lib/helpers'
import { useRouter } from 'next/navigation'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'

import teams from 'public/localization/it/teams.json'
import countries from 'public/localization/it/countries.json'

import Autocomplete from '@/components/ui/autocomplete'

import classNames from 'classnames'
import { useStore } from '@/store/store'
import { Event, EventStatus } from '@/types/events';
import QuantityInput from './quantity-input'
import { createCheckout } from '@/lib/checkout'

interface Props {
  //list: Item[] | undefined;
  event: Event;
}

export interface EventOrderForm {
  first_name: string;
  last_name: string;
  email: string;
  //phone_number: string;
  //privacy_policy: boolean;
}

export interface EventOrder {
  first_name: string;
  last_name: string;
  email: string;
  items: any[];
  //phone_number: string;
  //privacy_policy: boolean;
}

export interface OrderItem {
  id: number;
  event_id: string;
  name: string;
  price: number;
  quantity: number;
  description: string;
  summary: string; // no togli...
}

export default function EventForm({ event }: Props) {
  const router = useRouter()

  const cartItems = useStore((state) => state.cartItems)
  const addCartItem = useStore((state) => state.addCartItem)

  let defaultValues: any = {
    privacy_policy: false,
    country: 'ITA',
  }

  const {
    register,
    handleSubmit,
    control,
    getValues,
    setValue,
    setError,
    clearErrors,
    reset,
    formState: { errors }
  } = useForm<EventOrderForm>({
    mode: 'onTouched',
    defaultValues
  })

  const onSubmit: SubmitHandler<EventOrderForm> = async data => {
    try {
      const items = state.items.filter(item => item.quantity > 0).map(item => ({
        id: item.id,
        event_id: item.event_id,
        name: item.name,
        quantity: item.quantity,
        price: item.price
      }))

      const order = await createCheckout({
        payment_method: 'on-site',
        user_email: data.email,
        customer_first_name: data.first_name,
        customer_last_name: data.last_name,
        items: items
      })

      //setError(null)

      if (order) {
        //clearCartItems()
        router.replace(`/confirm?q=${base64.encode(order)}`)
      }
    } catch (e: any) {
      console.log(JSON.stringify(e.message))
      //setError(e.message)
    } finally {
      //setState({ ...state, isLoading: false })
    }
    /*data.tin = data.tin.toUpperCase()

    const duplicateIndex = cartItems.findIndex(item => item.entry?.tin === data.tin)

    if (duplicateIndex !== -1) {
      setError('tin', { message: 'Codice fiscale già presente in carrello' })
      return
    }

    addCartItem({
      id: item.id,
      event_id: item.event_id,
      name: item.name,
      price: item.price,
      quantity: 1,
      description: `${data.first_name} ${data.last_name}`,
      entry: data,
    })*/

    // si ma dopo submit
    // reset()
  }

  const updateQuantity = (id: number, quantity: number) => {
    const updateItem = (items: OrderItem[]) => {
      const originalItem = items.find(item => item.id === id)

      return items.map(item =>
        item.id === id ? { ...originalItem!, quantity } : item
      )
    }

    setState(state => ({ ...state, items: updateItem(state.items) }))
  }

  const [state, setState] = useState<{ items: OrderItem[] }>({ items: [] })

  useEffect(() => {
    const items: any[] = event.items
      ?.sort((a, b) => a.id - b.id)
      ?.map(item => ({ ...item, quantity: 0 }))
      ?? []

    setState(state => ({ ...state, items }))
  }, [event]);

  return (
    <section className="mt-8">
      <span className="overtitle my-2">Modulo di prenotazione</span>
      <form className="mt-4 py-4" autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          <div>
            <label className="label" htmlFor="first_name">Nome</label>
            <input
              type="text"
              className={classNames("field", { "invalid": errors.first_name })}
              {...register("first_name", { required: 'Campo obbligatorio' })}
            />
            {errors.first_name && <small className="field-error">{errors.first_name.message}</small>}
          </div>

          <div>
            <label className="label" htmlFor="last_name">Cognome</label>
            <input
              type="text"
              className={classNames("field", { "invalid": errors.last_name })}
              {...register("last_name", { required: 'Campo obbligatorio' })}
            />
            {errors.last_name && <small className="field-error">{errors.last_name.message}</small>}
          </div>

          <div className="">
            <label className="label" htmlFor="email">Email</label>
            <input
              type="email"
              aria-invalid={errors.email ? "true" : "false"}
              {...register("email", {
                required: 'Campo obbligatorio',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Indirizzo mail non valido"
                },
              })}
              className="field"
            />
            {errors.email && <small className="field-error">{errors.email.message}</small>}
          </div>

          {/*<div className="">
            <label className="label" htmlFor="phone_number">Telefono</label>
            <input
              type="text"
              aria-invalid={errors.phone_number ? "true" : "false"}
              placeholder='Opzionale'
              {...register("phone_number", {
                required: 'Campo obbligatorio',
                pattern: {
                  value: /^((00|\+)39)??(3\d{2}|0\d{1,3})\d{6,7}$/,
                  message: "Numero di telefono non valido"
                },
              })}
              className="field"
            />
            {errors.phone_number && <small className="field-error">{errors.phone_number.message}</small>}
          </div>*/}

          {/*<div className="flex items-end">
            <div className="relative flex items-start">
              <div className="flex items-center h-5 mt-1">
                <input
                  type="checkbox"
                  aria-invalid={errors.privacy_policy ? "true" : "false"}
                  {...register("privacy_policy", {
                    required: 'Campo obbligatorio',
                  })}
                  className=""
                />
              </div>
              <label htmlFor="hs-checkbox-delete" className="ml-3">
                <span className="block text-sm font-semibold text-gray-800 dark:text-gray-300">Privacy Policy</span>
                <span id="hs-checkbox-delete-description" className="block text-xs text-gray-600 dark:text-gray-500">Accetto i <a href="/legal/terms" target="_blank" className="text-button" rel="noopener noreferrer">Termini e condizioni</a> e l&apos;<a href="/legal/privacy-policy" target="_blank" className="text-button" rel="noopener noreferrer">informativa sulla privacy</a> di Goinup</span>
                {errors.privacy_policy && <small className="field-error">{errors.privacy_policy.message}</small>}
              </label>
            </div>
          </div>*/}

          <div className="lg:col-span-2">

            {!!state.items.length &&
              state.items.map((item, index) => (
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
                    <QuantityInput quantity={item.quantity} onChange={(quantity) => updateQuantity(item.id, quantity)} />
                  </div>

                </div>
              ))
            }
          </div>





        </div>

        {/*!!state.items.filter(item => item.quantity > 0).length &&
          <div>
            <div className="relative flex py-4 items-center">
              <div className="flex-grow border-t border-gray-200"></div>
              <span className="flex-shrink mx-4 text-gray-600">Totale</span>
              <div className="flex-grow border-t border-gray-200"></div>
            </div>

            <div className="">

              Totale: {state.items.reduce((a, b) => a + b.price * b.quantity, 0)}
            </div>
          </div>
          */}


        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-12">
          {/*<Button label="Indietro" className="col-span-3 hover:text-gray-600 py-2" onClick={() => router.back()} />*/}
          <button onClick={() => router.back()} className="hover:text-slate-500 py-2 px-4">
            Indietro
          </button>

          <button type="submit" className="bg-blue-200 hover:opacity-80 font-bold py-2 px-4 rounded disabled:cursor-not-allowed disabled:opacity-40"
            disabled={!state.items.filter(item => item.quantity > 0).length}
          >
            Conferma prenotazione
          </button>
        </div>
      </form>
    </section>
  )
}
