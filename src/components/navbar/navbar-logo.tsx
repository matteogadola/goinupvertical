import Image from 'next/image'
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation'
import goinupLogo from 'public/images/credits/goinup.png'
import teamValtellinaLogo from 'public/images/credits/team-valtellina.webp'

interface Props {
  promoter?: string;
}

export default function NavbarLogo({ promoter }: Props) {

  if (promoter === 'goinup') {
    return (
      <>
        <div className="text-lg md:text-xl font-unbounded font-bold hover:opacity-70">
          <Link href="/">GO<span className="text-accent">in</span>UP</Link>
        </div>
      </>
    )
  }

  if (promoter === 'team-valtellina') {
    return (
      <></>
    )
  }

  return (
    <></>
  )
}
