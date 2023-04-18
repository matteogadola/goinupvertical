'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'


import headerImage from 'public/images/header.jpg'
import classNames from 'classnames'
import { useSupabase } from './supabase-provider'
import NavbarUserBadge from './navbar-user-badge'

interface Props {
  cover?: boolean | undefined;
}

const navLinks = [
  //{ name: "Classifiche", path: "/results" },
  { name: "Regolamento", path: "/regulation" },
  //{ name: "Mission", path: "mission" },
  //{ name: "Accedi", path: "sign-in" },
]

// w-full h-256 bg-cover-image bg-cover bg-center
export default function Navbar({ cover }: Props) {
  const isHome = usePathname() === '/'

  //const { supabase } = useSupabase();
  //let user;
  
  //supabase.auth.getSession().then(res => user = res.data.session?.user).catch(e => console.error(e));
  //supabase.auth.update({password: "password"})


  return (
  <header className={classNames("w-full", {" relative bg-black h-screen": isHome })}>
    { isHome && <div><Image
      className="opacity-60"
      src={headerImage}
      alt="Header image"
      fill
      style={{objectFit: "cover", objectPosition: "center"}}
    /><div className="display absolute top-20 left-10 lg:top-40 lg:left-20 w-36 md:w-96 lg:w-auto">
    <h1>GO<span className="text-accent">in</span>UP</h1>
    <h3>Circuito di 11 gare vertical<br /><span className="whitespace-nowrap">in montagna</span></h3>
  </div></div> }
    <nav>
      <div className="h-12 mx-4 md:mx-8 md:flex md:items-center md:justify-between">
        <div className="flex justify-between items-center">
          {!isHome && 
            <div className="text-lg md:text-xl font-unbounded font-bold hover:opacity-70">
              <Link href="/">GO<span className="text-accent">in</span>UP</Link>
            </div>
          }
          
          <div className="hidden">{/*flex md:hidden*/}
            <button type="button" className="text-gray-500 hover:text-gray-600 focus:outline-none focus:text-gray-600" aria-label="toggle menu">
              <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current">
                <path fillRule="evenodd" d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"></path>
              </svg>
            </button>
          </div>
        </div>

        <div className={classNames("hidden md:flex md:items-center md:gap-4 z-10 text-gray-600 hover:text-gray-500", {" text-white": isHome })}>
          {
            navLinks.map((link, index) => (
              <Link href={link.path} key={index}>
                <span className="block mt-2 md:mt-0">{link.name}</span>
              </Link>
            ))
          }
          <NavbarUserBadge />
        </div>
      </div>
    </nav>
    </header>
  )
}
