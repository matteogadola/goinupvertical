'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Session, createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation';

interface Props {
  session: Session | null;
}

export default function NavbarUserBadge({ session }: Props) {
  const router = useRouter();
  const supabase = createClientComponentClient();

  const [isOpen, setIsOpen] = useState(false)

  const toggle = async () => {
    setIsOpen(!isOpen);
  }

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    setIsOpen(false);

    if (error) {
      console.error(error)
    }

    router.refresh();
  }

  return (
    <>
      {session?.user &&
        <div className="flex justify-center">
          <div className="relative inline-block">
            <button onClick={toggle} className="relative z-10 flex items-center p-2 text-sm border border-transparent rounded-md">
              <span className="mx-0.5">{session?.user.email}</span>
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 15.713L18.01 9.70299L16.597 8.28799L12 12.888L7.40399 8.28799L5.98999 9.70199L12 15.713Z" fill="currentColor"></path>
              </svg>
            </button>

            {isOpen &&
              <div className="absolute right-0 z-20 pt-2 mt-2 overflow-hidden bg-white rounded-md shadow-xl">
                <a className="flex min-w-max items-center p-3 -mt-2 text-sm text-gray-600 transition-colors duration-200 transform hover:bg-gray-100">
                  <img className="flex-shrink-0 object-cover mx-1 rounded-full w-9 h-9" src="/images/logos/goinup.png" alt="avatar" />
                  <div className="mx-1">
                    <h1 className="text-sm font-semibold text-gray-700">{session?.user.user_metadata.first_name}</h1>
                    <p className="text-sm text-gray-500">{session?.user.email}</p>
                  </div>
                </a>

                <hr className="border-gray-200 dark:border-gray-700 " />

                <a className="line-through block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-200 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white">
                  Profilo
                </a>

                <a className="line-through block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-200 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white">
                  Impostazioni
                </a>

                <hr className="border-gray-200 dark:border-gray-700 " />

                <Link
                  href="/admin"
                  onClick={toggle}
                  className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-200 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  Amministrazione
                </Link>

                <hr className="border-gray-200 dark:border-gray-700 " />

                <button onClick={handleLogout} className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-200 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white">
                  Esci
                </button>
              </div>}
          </div>
        </div>

      }
    </>

  )
}
