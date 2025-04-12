import Link from 'next/link';
import HeaderBurger from './header-burger';
import HeaderUserButton from './header-user';
import HeaderCartButton from './header-cart';
import { createClient } from '@/utils/supabase/server';
import { AppShellHeader } from '@mantine/core';
import Sidebar from '../sidebar';

export default async function Header({
  links,
}: {
  links: any[]
}) {
  const supabase = await createClient()
  const { data: { user }, error } = await supabase.auth.getUser()

  return (
    <>
      <AppShellHeader>
        <div className="content header-grid">
          <HeaderBurger />

          <div className="flex items-center justify-center md:justify-start">
            <Link href="/" className="hover:scale-105">
              <img src="/images/logo/goinup.webp" className="h-14 object-contain" alt="Logo" />
            </Link>
          </div>

          <div className="hidden md:flex items-center justify-center">
            <ul className="space-x-8">
              {
                links.filter(item => item?.visible !== false).map((link, index) => (
                  <li key={index} className="inline-block">
                    <Link href={link.path}>
                      <span className="block mt-2 md:mt-0 hover:opacity-70">{link.name}</span>
                    </Link>
                  </li>
                ))
              }
            </ul>
          </div>

          <div className="flex items-center justify-end">
            <HeaderCartButton />
            <HeaderUserButton user={user} />
          </div>
        </div>
      </AppShellHeader>
      <Sidebar links={links} />
    </>
  )
}
