'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { CartIcon, UserIcon } from '@/components/icons';
import { useCartStore } from '@/store/cart';
import { Badge, Drawer, MantineProvider, Button, UnstyledButton, ActionIcon } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import CartItems from '@/components/cart/cart-items';
import { ShoppingCart } from 'lucide-react';

export default function HeaderCartButton() {
  const { items, clearItems } = useCartStore();
  const [opened, { open, close }] = useDisclosure(false);
  const router = useRouter()
  const pathname = usePathname()

  const handleClear = () => {
    close();
    clearItems();
  }

  const handleClick = () => {
    close();
    router.push('/checkout');
  }

  return (
    <>
    {!!(items.length && pathname !== '/checkout') &&
    <div>
    <UnstyledButton className="flex items-center" onClick={open}>
      <ShoppingCart size={28} color="#000000" absoluteStrokeWidth />
      <Badge size="xs" circle className="relative -left-2 -top-2">{items.length}</Badge>
    </UnstyledButton>

    <Drawer opened={opened} position="right" onClose={close} title="Carrello">
      <div className="flex flex-col justify-between" style={{height:"calc(100vh - 64px - 32px)"}}>
        <CartItems />
        {!!items.length &&
          <div>
            <div className="text-xs text-gray-900 mt-4">
              Il totale verrà mostrato nella schermata successiva
            </div>
            <div className="flex justify-between mt-4">
              <Button
                variant="transparent"
                styles={{ root: { padding: 0 } }}
                onClick={handleClear}
              >
                Svuota il carrelo
              </Button>

              <Button
                onClick={handleClick}
              >
                Vai al pagamento
              </Button>
            </div>
          </div>
        }
      </div>

    </Drawer>
    </div>
    }
    </>
  )
}