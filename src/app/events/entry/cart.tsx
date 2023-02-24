'use client'

import Image from 'next/image'
import classNames from 'classnames'
import { useStore } from '@/store/store'
import { createCheckout } from '@/lib/checkout'

import mastercardLogo from 'public/images/logos/mastercard.svg'
import visaLogo from 'public/images/logos/visa.svg'
import amexLogo from 'public/images/logos/amex-old.svg'
import sepaLogo from 'public/images/logos/sepa.svg'
import { useState } from 'react'

export default function EntryCart() {
  const cartItems = useStore((state) => state.cartItems)
  const paymentMethod = useStore((state) => state.paymentMethod)
  const removeCartItem = useStore((state) => state.removeCartItem)
  const setPaymentMethod = useStore((state) => state.setPaymentMethod)
  const [error, setError] = useState(null)

  const totalAmount = cartItems.reduce((a, b) => a + b.price, 0)

  const checkout = async () => {
    try {
      await createCheckout({
        payment_method: paymentMethod,
        items: cartItems
      })
      setError(null)
    } catch (e: any) {
      console.log(JSON.stringify(e.message))
      setError(e.message)
    }
  }

  return (
    <section>
      {cartItems.length >= 0 && 
        <div className="">
          <div className="flex h-full flex-col">
            <div className="flex-1 overflow-y-auto py-4 px-4 sm:px-6">
              <div className="">
                <h2 className="subtitle" id="slide-over-title">Conferma</h2>
                <h2 className="title">Carrello</h2>
              </div>

              <div className="">
                <div className="flow-root">
                  <ul role="list" className=" divide-y divide-gray-100">
                    { cartItems.map((item, index) => 
                      <li key={index} className="flex py-6">
                        <div className="ml-2 flex flex-1 flex-col">
                          <div>
                            <div className="flex justify-between text-base text-gray-900">
                              <h3>{item.name}</h3>
                              <p className="">{item.price / 100}€</p>
                            </div>

                            <div className="flex justify-between text-base text-gray-900">
                              <p className="mt-1 text-sm text-gray-500">{item.description}</p>
                              <div className="flex">
                                <button type="button" className="text-sm text-indigo-600 hover:text-indigo-500" onClick={() => removeCartItem(index)}>Rimuovi</button>
                              </div>
                            </div>
                          </div>
                        
                        </div>
                      </li>
                    )}

                  </ul>

                  <div className="ml-2 flex justify-between text-base font-medium text-gray-900 mt-6">
                    <p>Totale</p>
                    <p>{totalAmount / 100}€</p>
                  </div>

                </div>

              </div>
            </div>


            <div className="border-t border-gray-200 py-4 px-4 sm:px-6">

              <span className="text-base font-medium text-gray-900">Metodo di Pagamento</span>

              <div className="grid grid-cols-1 gap-y-2 mt-4">
  
                <div className="flex items-center pl-4 border border-gray-200 rounded">
                  <input type="radio" value="stripe" id="payment-method-stripe" checked={paymentMethod === 'stripe'} onChange={e => setPaymentMethod('stripe')} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300" />
                  <label htmlFor="payment-method-stripe" className={classNames("w-full ml-2 text-sm font-medium text-gray-900", {"py-2": paymentMethod === 'stripe', "py-4": paymentMethod !== 'stripe'} )}>
                    <span>Online</span>
                    {paymentMethod === 'stripe' && <span className="block font-normal text-xs">Conferma immediata</span>}
                  </label>
                  <Image src={mastercardLogo} height={30} alt="mastercard" />
                  <Image src={visaLogo} height={30} alt="visa" />
                  <Image src={amexLogo} height={30} alt="amex" />
                </div>

                <div className="flex items-center pl-4 pr-2 border border-gray-200 rounded">
                  <input type="radio" value="sepa" id="payment-method-sepa" checked={paymentMethod === 'sepa'} onChange={e => setPaymentMethod('sepa')} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300" />
                  <label htmlFor="payment-method-sepa" className="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Bonifico Bancario</label>
                  <Image src={sepaLogo} height={50} alt="sepa" />
                </div>
                <div className="flex items-center pl-4 border border-gray-200 rounded">
                  <input type="radio" value="cash" id="payment-method-cash" checked={paymentMethod === 'cash'} onChange={e => setPaymentMethod('cash')} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300" />
                  <label htmlFor="payment-method-cash" className={classNames("w-full ml-2 text-sm font-medium text-gray-900", {"py-2": paymentMethod === 'cash', "py-4": paymentMethod !== 'cash'} )}>
                    <span>Contanti</span>
                    {paymentMethod === 'cash' && <span className="block font-normal text-xs">Sarà necessario recarsi presso uno degli <button className="text-purple-500">store abilitati</button></span>}
                  </label>
                </div>
              </div>



              {error && <div className="mt-4">
                <div className="relative px-2 py-1 leading-normal text-red-700" role="alert">
                  <span className="absolute inset-y-0 left-0 flex items-center ml-4">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" fillRule="evenodd"></path></svg>
                  </span>
                  <p className="ml-8">{error}</p>
                </div>
              </div>}
              
              <div className="mt-4">
                
                <button
                  onClick={() => checkout()}
                  className="flex w-full items-center justify-center rounded-md bg-purple-500 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-purple-400">
                  { paymentMethod === 'stripe' ? 'Vai al Pagamento' : 'Conferma iscrizione' }
                </button>


              </div>
            </div>
          </div>
        </div>
      }
    </section>

  )
}
