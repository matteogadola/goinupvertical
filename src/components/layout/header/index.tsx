import { AppShellHeader } from '@mantine/core';
import { NavLink } from '@/types/app';
import { HeaderWrapper } from './header-wrapper';
import HeaderBurger from './header-burger';
import Link from 'next/link';
import HeaderCartButton from './header-cart';
import HeaderUser from './header-user';
import { getUser } from '@/utils/user';

export default async function Header({
  links,
}: Readonly<{
  links: NavLink[],
}>) {
  const user = await getUser()

  return (
    <AppShellHeader>
      <HeaderWrapper>
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
            <HeaderUser user={user} />
          </div>
        </div>
      </HeaderWrapper>
    </AppShellHeader>
  )
}
