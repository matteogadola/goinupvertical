'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

import headerImage from 'public/images/header.jpg'
import classNames from 'classnames'
import { useSupabase } from './supabase-provider'
import NavbarUserBadge from './navbar-user-badge'
import { useState } from 'react'

interface Props {
  cover?: boolean | undefined;
}

const navLinks = [
  { name: "Classifiche", path: "/results" },
  { name: "Foto", path: "/photos" },
  { name: "Regolamento", path: "/regulation" },
  //{ name: "Accedi", path: "sign-in" },
]

// w-full h-256 bg-cover-image bg-cover bg-center
export default function Navbar({ cover }: Props) {
  const isHome = usePathname() === '/'

  const [isHamburgerOpen, setIsHamburgerOpen] = useState<boolean>(false);

  //const { supabase } = useSupabase();
  //let user;
  
  //supabase.auth.getSession().then(res => user = res.data.session?.user).catch(e => console.error(e));
  //supabase.auth.update({password: "password"})
  const toggleHamburger = () => {
    setIsHamburgerOpen(!isHamburgerOpen);
  }

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
    <Link href="/results" className="lg:hidden relative top-20 bg-red-400 bg-opacity-80 px-4 py-2 rounded">Classifiche</Link>
  </div>
  </div> }
    <nav>
      <div className="h-12 pl-4 md:px-8 md:flex md:items-center md:justify-between">
        <div className="flex justify-between items-center">
          {!isHome && 
            <div className="text-lg md:text-xl font-unbounded font-bold hover:opacity-70">
              <Link href="/">GO<span className="text-accent">in</span>UP</Link>
            </div>
          }
          
          <div className="hidden">{/*flex e/o block md:hidden*/}
            <button type="button" onClick={() => toggleHamburger()} className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 hover:opacity-70">
            { isHamburgerOpen
              ? <svg className="w-6 h-6" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z" /></svg>
              : <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
            }
          </button>
          </div>
        </div>

        <div className={classNames("hidden lg:flex lg:items-center lg:gap-4 z-10 text-gray-600", {" text-white": isHome })}>
          {
            navLinks.map((link, index) => (
              <Link href={link.path} key={index}>
                <span className="block mt-2 md:mt-0 hover:opacity-70">{link.name}</span>
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
