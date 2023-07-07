'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'

import headerImage from 'public/images/header.jpg'
import classNames from 'classnames'
import { useState, useEffect } from 'react'
import { User } from '@supabase/auth-helpers-nextjs'

import { useStore } from '@/store/store'
// w-full h-256 bg-cover-image bg-cover bg-center

export default function NavbarLogo() {
  const routePath = usePathname();
  const isHome = routePath === '/';

  console.log(routePath)

  return (
    <>
    </>

  )
}
