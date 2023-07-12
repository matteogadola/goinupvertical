'use client'

import { usePathname } from 'next/navigation';
import NavbarBrand from './navbar-brand'
import NavbarLinks from './navbar-links'
import NavbarUser from './navbar-user'

interface Props {
  promoter?: string;
}

export default function Navbar({ promoter }: Props) {
  const routePath = usePathname();
  const navLinks = [
    { name: "Home", path: "/", visible: false },
    { name: "Classifiche", path: "/results" },
    { name: "Media", path: "/media" },
    { name: "Regolamento", path: "/regulation" },
  ]

  return (
    <header className="z-10 w-full">
      <div className="flex h-12 px-8 items-center justify-between">
        <NavbarBrand promoter={promoter} routePath={routePath} />

        <div className="flex space-x-6">
          <NavbarLinks links={navLinks} promoter={promoter} routePath={routePath} />
          <NavbarUser />
        </div>
      </div>
    </header>
  )
}