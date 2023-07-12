import Link from 'next/link';

interface Props {
  promoter?: string;
  routePath?: string | null;
}

export default function NavbarBrand({ promoter, routePath }: Props) {
  if (routePath === '/') {
    return <div></div>
  }

  if (promoter === 'goinup') {
    return (
      <div className="text-lg md:text-xl font-unbounded font-bold hover:opacity-70">
        <Link href="/">GO<span className="text-accent">in</span>UP</Link>
      </div>
    )
  }

  if (promoter === 'team-valtellina') {
    return (
      <div></div>
    )
  }

  return (
    <div></div>
  )
}
