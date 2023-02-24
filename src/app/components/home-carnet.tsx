import { getItem } from '@/lib/items'
import Link from 'next/link'
import Image from 'next/image'

import carnetImage from 'public/images/carnet-1.png'
import { base64 } from '@/lib/helpers'
//import { base64 } from '@/lib/helpers'


// https://tailwindcomponents.com/component/tags
//export default async function HomeBanner({ ticket }: { ticket: Ticket }) {
export default async function HomeCarnet() {
  const ticket = await getItem(1001) // più evengante?

  return (
      <section className="grid grid-cols-1 md:grid-cols-2 justify-items-center">
        
        <div className="mt-8">
          <h1 className="subtitle">Prevendita</h1>
          <h3 className="title">Carnet 11 gare</h3>
          <p className="mt-8 max-w-md text">Acquista il carnet per tutte e 11 le gare del circuito GOinUP.</p>
          <Link href={{ pathname: 'events/entry', query: { q: base64.encode(ticket) } }}>
            <button className="bg-button text-white rounded-lg px-4 py-2 mt-8">Informazioni</button>
          </Link>
        </div>

        <div className="flex order-first lg-order-none">
          <Image
            src={carnetImage}
            height={300}
            alt="Mission"
          />
        </div>

      </section>
  
  )
}
