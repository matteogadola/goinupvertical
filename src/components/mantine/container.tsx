'use client'

import Link from 'next/link';
import { AppShell } from '@mantine/core';
import { useUiStore } from '@/store/ui';
import { useMemo } from 'react';
import { useMediaQuery } from '@mantine/hooks';
import { usePathname } from 'next/navigation'

export default function MantineContainer({
  children,
}: {
  children: React.ReactNode
}) {
  const { sidenavOpened } = useUiStore()

  //const layout = useMemo(() => alt,[])

  return (
    <AppShell
      header={{ height: 80 }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: !sidenavOpened, desktop: true },
      }}
      padding="md"
    >
      {children}
    </AppShell>
  )
}
