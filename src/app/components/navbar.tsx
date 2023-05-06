'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

import headerImage from 'public/images/header.jpg'
import classNames from 'classnames'
import NavbarUserBadge from './navbar-user-badge'
import { useState } from 'react'
import { ArrowRightIcon, ChevronRightIcon, HamburgerIcon } from './icons'

interface Props {
  cover?: boolean | undefined;
}

const navLinks = [
  { name: "Home", path: "/", visible: false },
  { name: "Classifiche", path: "/results" },
  { name: "Media", path: "/media" },
  { name: "Regolamento", path: "/regulation" },
  //{ name: "Accedi", path: "sign-in" },
]

// w-full h-256 bg-cover-image bg-cover bg-center
export default function Navbar({ cover }: Props) {
  const routePath = usePathname();
  const isHome = routePath === '/';

  const [isSidenavOpen, setIsSidenavOpen] = useState<boolean>(false);

  //const { supabase } = useSupabase();
  //let user;

  //supabase.auth.getSession().then(res => user = res.data.session?.user).catch(e => console.error(e));
  //supabase.auth.update({password: "password"})
  const openSidenav = () => {
    setIsSidenavOpen(true);
  }

  const closeSidenav = () => {
    setIsSidenavOpen(false);
  }

  return (
    <section>
      <header className={classNames("w-full", { "relative bg-black h-screen": isHome })}>
        {isHome && <div><Image
          className="opacity-60"
          src={headerImage}
          alt="Header image"
          fill
          style={{ objectFit: "cover", objectPosition: "center" }}
        /><div className="display absolute top-20 left-10 lg:top-40 lg:left-20 w-36 md:w-96 lg:w-auto">
            <h1>GO<span className="text-accent">in</span>UP</h1>
            <h3>Circuito di 11 gare vertical<br /><span className="whitespace-nowrap">in montagna</span></h3>
          </div>
        </div>}
        <nav>
          <div className="flex h-12 pl-4 px-8 items-center justify-between">
            {!isHome &&
              <div className="text-lg md:text-xl font-unbounded font-bold hover:opacity-70">
                <Link href="/">GO<span className="text-accent">in</span>UP</Link>
              </div>
            }

            <div className={classNames("hidden md:flex md:items-center md:w-full md:justify-end md:gap-6 z-10 text-gray-600", { " text-white": isHome })}>
              {
                navLinks.filter(item => item?.visible !== false).map((link, index) => (
                  <Link href={link.path} key={index}>
                    <span className="block mt-2 md:mt-0 hover:opacity-70">{link.name}</span>
                  </Link>
                ))
              }
              <NavbarUserBadge />
            </div>

            <div className={classNames("flex justify-end w-full md:hidden z-10 text-gray-600", { " text-white": isHome })}>
              <button className="outline-none" onClick={openSidenav}>
                <HamburgerIcon />
              </button>
            </div>

          </div>
        </nav>
        {isSidenavOpen && <div className="flex-col w-2/3 absolute top-0 right-0 z-10 shadow-md bg-slate-100 h-screen">
          <div className="flex h-12 pl-4 px-8 items-center justify-end">
            <button className="outline-none" onClick={closeSidenav}>
              <ChevronRightIcon />
            </button>
          </div>

          <ul className="w-full">
            {
              navLinks.map((link, index) => (
                <li key={index}>
                  <Link href={link.path} onClick={closeSidenav}>
                    <span className="block px-2 py-4 hover:opacity-70">{link.name}</span>
                  </Link>
                </li>
              ))
            }
          </ul>
        </div>}
      </header>


    </section>
  )
}
