import Image from 'next/image'
import { urlFor } from '@/utils/sanity'

type Props = {
  flyer: any
  className?: string
}

export default async function HomeFlyer({ flyer }: Readonly<Props>) {

  return (
    <div className="flex mt-32 justify-center items-center">
      <Image
        alt="Locandina"
        src={urlFor(flyer)}
        width={800}
        height={800}
      />
    </div>
  )
}
