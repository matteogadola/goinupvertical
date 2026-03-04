'use client'

import { AppShell } from '@mantine/core';
import { useUiStore } from '@/store/ui';

export default function MantineContainer({
  children,
}: {
  children: React.ReactNode,
}) {
  const { sidenavOpened } = useUiStore()

  //const layout = useMemo(() => alt,[])

  return (
    <AppShell
      header={{ height: 80, offset: false }}
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
