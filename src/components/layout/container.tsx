'use client';

import { AppShell } from '@mantine/core';
import { useUiStore } from '@/store/ui';

export default function AppContainer({
  children,
}: Readonly<{
  children: React.ReactNode,
}>) {
  const { sidenavOpened } = useUiStore()

  return (
    <AppShell
      header={{ height: 80, offset: true }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: !sidenavOpened, desktop: true },
      }}
    >
      {children}
    </AppShell>
  )
}
