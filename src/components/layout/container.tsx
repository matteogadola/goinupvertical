'use client';

import { AppShell } from '@mantine/core';
import { useUiStore } from '@/store/ui';
import { ScrollProvider } from '@/contexts/scroll-context';

export default function AppContainer({
  children,
}: Readonly<{
  children: React.ReactNode,
}>) {
  const { sidenavOpened } = useUiStore()

  return (
    <AppShell
      header={{ height: 80, offset: false }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: !sidenavOpened, desktop: true },
      }}
    >
      <ScrollProvider>
        {children}
      </ScrollProvider>
    </AppShell>
  )
}
