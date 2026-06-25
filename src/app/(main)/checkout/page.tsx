'use client'

import { useCartStore } from '@/store/cart';
import clsx from 'clsx';
import { useState } from 'react';
import { Button, Group, Switch } from '@mantine/core';
import ErrorText from '@/components/ui/error-text';
import { useRouter } from 'next/navigation'
import { dt } from '@/utils/date';
import { calcStripeFee } from '@/utils/stripe';

export default function CheckoutPage() {
  const { items, removeItem, clearItems, paymentMethod, setPaymentMethod } = useCartStore();

  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const router = useRouter()
  const totalAmount = items.reduce((a, b) => a + b.price, 0)
  const paymentMethods = items.reduce((a, b) => a.filter(v => b.payment_methods.includes(v)), ['stripe', 'cash', 'sepa'])

  const openLocations = () => {}

  const checkout = async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        body: JSON.stringify({
          customer_email: items[0].entry?.email,
          customer_first_name: items[0].entry?.first_name,
          customer_last_name: items[0].entry?.last_name,
          payment_method: paymentMethod,
          items: items
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
  }

  return (
    <section className="w-full lg:w-1/2 m-auto">
      {!!items.length &&
        <div className="">
          <div className="flex h-full flex-col">
            <div className="flex-1 overflow-y-auto px-4">
              <h1 className="title">Carrello</h1>

              <div className="">
                <div className="flow-root">
                  <ul className="divide-y divide-gray-100">
                    {items.map((item, index) =>
                      <li key={index} className="flex py-6">
                        <div className="flex flex-1 flex-col">
                          <div>
                            <div className="flex justify-between text-base text-gray-900">
                              <h3>{item.product_name}</h3>
                              <p className="">{item.price / 100}€</p>
                            </div>

                            <div className="flex justify-between text-base text-gray-900">
                              <p className="mt-1 text-sm text-gray-500">{item.description}</p>
                              <div className="flex">
                                <Button
                                  variant="transparent"
                                  styles={{ root: { padding: 0 } }}
                                  disabled={loading}
                                  onClick={() => removeItem(index)}
                                >
                                  Rimuovi
                                </Button>
                              </div>
                            </div>
                          </div>

                        </div>
                      </li>
                    )}

                    {paymentMethod === 'stripe' &&
                      <li className="flex pt-6">
                        <div className="flex flex-1 flex-col">
                          <div>
                            <div className="flex justify-between text-base text-gray-900">
                              <h3>Commissioni di servizio</h3>
                              <p className="">{calcStripeFee(items) / 100}€</p>
                            </div>
                          </div>
                        </div>
                      </li>
                    }

                  </ul>
                  <div className="flex justify-between text-base font-medium text-gray-900 my-4">
                    <p>Totale</p>
                    <p>{(totalAmount + (paymentMethod === 'stripe' ? calcStripeFee(items) : 0)) / 100}€</p>
                  </div>
                </div>
                <div className="border-t border-gray-200 py-4">
                  <span className="text-base font-medium text-gray-900">Metodo di Pagamento</span>
                  <div className="grid grid-cols-1 gap-y-2 mt-4">
                    {paymentMethods.includes('stripe') &&
                      <div className="flex items-center pl-4 border border-gray-200 rounded">
                        <input type="radio" value="stripe" id="payment-method-stripe" disabled={loading} checked={paymentMethod === 'stripe'} onChange={e => setPaymentMethod('stripe')} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300" />
                        <label htmlFor="payment-method-stripe" className={clsx("w-full ml-2 text-sm font-medium text-gray-900", { "py-2": paymentMethod === 'stripe', "py-4": paymentMethod !== 'stripe' })}>
                          <span>Online</span>
                          {paymentMethod === 'stripe' && <span className="block font-normal text-xs">Conferma immediata</span>}
                        </label>
                        <img src="/images/logo/mastercard.svg" className="h-7" alt="mastercard" />
                        <img src="/images/logo/visa.svg" className="h-8" alt="visa" />
                        <img src="/images/logo/amex-old.svg" className="h-6" alt="amex" />
                      </div>
                    }
                    {paymentMethods.includes('sepa') &&
                      <div className="flex items-center pl-4 pr-2 border border-gray-200 rounded">
                        <input type="radio" value="sepa" id="payment-method-sepa" disabled={loading} checked={paymentMethod === 'sepa'} onChange={e => setPaymentMethod('sepa')} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300" />
                        <label htmlFor="payment-method-sepa" className="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                          <span>Bonifico Bancario</span>
                          {paymentMethod === 'sepa' && <span className="block font-normal text-xs">Riceverai le coordinate via mail</span>}
                        </label>
                        <img src="/images/logo/sepa.svg" className="h-8" alt="sepa" />
                      </div>
                    }
                    {paymentMethods.includes('cash') &&
                      <div className="flex items-center pl-4 border border-gray-200 rounded">
                        <input type="radio" value="cash" id="payment-method-cash" disabled={loading} checked={paymentMethod === 'cash'} onChange={e => setPaymentMethod('cash')} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300" />
                        <label htmlFor="payment-method-cash" className={clsx("w-full ml-2 text-sm font-medium text-gray-900", { "py-2": paymentMethod === 'cash', "py-4": paymentMethod !== 'cash' })}>
                          <span>Contanti</span>
                          {paymentMethod === 'cash' &&
                            <span className="block font-normal text-xs">
                              Da effettuare presso 3Passi Patagonia Morbegno{items[0].end_sale_date !== null && <span> entro le ore 19 di {dt(items[0].end_sale_date).format('dddd D MMMM')}</span>}
                              {/*uno degli <button onClick={() => openLocations()} className="text-button">store abilitati</button>*/}
                            </span>}
                        </label>
                      </div>
                    }
                  </div>

                  {!!error && <ErrorText className="mt-4">{error}</ErrorText>}

<<<<<<< HEAD
                  <div className="mt-4">
                    <Button
                      variant="subtle"
=======
                  <div className="flex justify-end gap-4 mt-8">
                    <Button
                      variant="transparent"
>>>>>>> origin
                      disabled={loading}
                      onClick={() => clearItems()}
                    >
                      Svuota il carrelo
                    </Button>

                    <Button
                      loading={loading}
                      onClick={() => checkout()}
                    >
                      {paymentMethod === 'stripe' ? 'Vai al Pagamento' : 'Conferma iscrizione'}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
      {!items.length &&
        <div className="">
          <span>Nessun elemento nel carrello</span>
        </div>
      }
    </section>
  );
<<<<<<< HEAD
}
=======
}
>>>>>>> origin
