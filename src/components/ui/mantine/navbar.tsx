import Link from 'next/link';
import NavbarBurger from './navbar-burger';
import NavbarUserButton from './navbar-user';
import NavbarCartButton from './navbar-cart';
import { createClient } from '@/utils/supabase/server';

export default async function Navbar({
  links,
}: {
  links: any[]
}) {
  const supabase = await createClient()
  const { data: { user }, error } = await supabase.auth.getUser()

  return (
    <div className="page header-grid">
      <NavbarBurger />

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
        <NavbarCartButton />
        <NavbarUserButton user={user} />
      </div>
    </div>
  )
}
