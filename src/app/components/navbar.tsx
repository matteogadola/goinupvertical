import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/types/supabase'
import { cookies } from 'next/headers'
import NavbarContent from './navbar-content'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

import headerImage from 'public/images/header.jpg'
import classNames from 'classnames'
import NavbarUserBadge from './navbar-user-badge'
import { useState } from 'react'
import { ArrowRightIcon, ChevronRightIcon, HamburgerIcon } from './icons'
import NavbarLogo from './navbar/navbar-logo'

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

export default async function Navbar() {
  const supabase = createServerComponentClient<Database>({ cookies });
  const { data: { session } } = await supabase.auth.getSession();

  return (
    <>
      <NavbarContent session={session} />
    </>
  )
}
