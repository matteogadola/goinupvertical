import Link from 'next/link'
import Image from 'next/image'

import carnetImage from 'public/images/carnet-1.png'

// https://tailwindcomponents.com/component/tags
//export default async function HomeBanner({ ticket }: { ticket: Ticket }) {
export default function HomeCarnet() {
  const eventId = 'circuito-goinup-5'

  return (
      <section className="grid-cols-1 md:grid-cols-2 lg:mx-20 grid justify-items-center">
        
        <div className="mt-8">
          <h1 className="overtitle">Prevendita</h1>
          <h3 className="title">Carnet 11 gare</h3>
          <p className="mt-8 max-w-md">Acquista il carnet per tutte e 11 le gare del circuito GOinUP.</p>
          <Link href={`events/${eventId}`}>
            <button className="link inline-flex items-center mt-8 right-20">Informazioni
              <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14"></path>
                <path d="M12 5l7 7-7 7"></path>
              </svg>
            </button>
          </Link>
        </div>

        <div className="flex order-first lg:order-none">
          <Image
            src={carnetImage}
            height={300}
            alt="Mission"
          />
        </div>

      </section>
  )
}
