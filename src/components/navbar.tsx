'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

interface Props {
  cover?: boolean | undefined;
}

const navLinks = [
  //{ name: "Classifiche", path: "rankings" },
  { name: "Regolamento", path: "regulation" },
  //{ name: "Mission", path: "mission" },
  //{ name: "Accedi", path: "sign-in" },
]

export default function Navbar({ cover }: Props) {
  const notHome = usePathname() !== '/'

  return (
    // sticky top-0 z-20 bg-white 
    <nav>
      <div className="h-12 mx-8 md:flex md:items-center md:justify-between">
        <div className="flex justify-between items-center">
          {notHome && 
            <div className="text-lg md:text-xl font-unbounded text-slate-800 hover:opacity-70">
              <Link href="/">GO<span className="text-accent">in</span>UP</Link>
            </div>
          }
          <div className="flex md:hidden">
            <button type="button" className="text-gray-500 hover:text-gray-600 focus:outline-none focus:text-gray-600" aria-label="toggle menu">
              <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current">
                <path fillRule="evenodd" d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"></path>
              </svg>
            </button>
          </div>
        </div>

        <div className="hidden md:flex md:items-center md:gap-4">
          {
            navLinks.map((link, index) => (
              <Link href={link.path} key={index}>
                <span className="block mt-2 md:mt-0 text-sm hover:text-gray-500">{link.name}</span>
              </Link>
            ))
          }
        </div>
      </div>
    </nav>
  )
}
