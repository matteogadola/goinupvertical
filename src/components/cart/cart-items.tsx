'use client'

import { useCartStore } from '@/store/cart';
import { Button } from '@mantine/core';
import clsx from 'clsx';

export default function CartItems({ className }: any) {
  const { items, removeItem } = useCartStore();

  return (
    <div className={clsx(className)}>
      {!!items.length &&
        <div className="flex h-full flex-col">
          <div className="">
            <div className="flex-1 overflow-y-auto">
              <div className="">
                <div className="flow-root">
                  <ul className=" divide-y divide-gray-100">
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
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
      {!items.length &&
        <div className="">
          Nessun elemento nel carrello
        </div>
      }
    </div>
  );
}
