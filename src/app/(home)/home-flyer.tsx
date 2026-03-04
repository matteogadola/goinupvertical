import Image from 'next/image'
import { urlFor } from '@/utils/sanity'
import clsx from 'clsx'

type Props = {
  flyer: any
  className?: string
}

export default async function HomeFlyer({ flyer, className }: Readonly<Props>) {

  return (
    <div className={clsx('flex mt-32 justify-center items-center', className)}>
      <Image
        alt="Locandina"
        src={urlFor(flyer)}
        width={800}
        height={800}
      />
    </div>
  )
}
