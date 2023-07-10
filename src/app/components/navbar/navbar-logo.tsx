'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

export default function NavbarLogo() {
  const promoter = usePathname()?.split('/')?.[1];

  // a tendere il logo sarà sempre quello del sito (es. kronoman)
  // il link alla pagina dell'organizzatore sarà sotto

  if (promoter === 'team-valtellina') {
    return (
      <>
      </>
    )

    /*return (
      <div>
        <Link href="/team-valtellina">
          <img src="images/logos/team-valtellina.webp" className="h-10" />
        </Link>
      </div>
    )*/

    /*return (
      <div className="text-lg md:text-xl font-unbounded font-bold hover:opacity-70">
        <Link href="/"><div className="whitespace-nowrap"><span className=" bg-red-400 bg-opacity-40">Team</span> <span className="">Valtellina</span></div></Link>
      </div>
    )*/
  }

  return (
    <div className="text-lg md:text-xl font-unbounded font-bold hover:opacity-70">
      <Link href="/">GO<span className="text-accent">in</span>UP</Link>
    </div>
  )
}
