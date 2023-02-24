import { getItem } from '@/lib/items'
import Link from 'next/link'
import Image from 'next/image'

import missionImage from 'public/images/mission-3new.jpg'
import { base64 } from '@/lib/helpers'
//import { base64 } from '@/lib/helpers'


// https://tailwindcomponents.com/component/tags
//export default async function HomeBanner({ ticket }: { ticket: Ticket }) {
export default async function HomeMission() {

  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 justify-items-center gap-4">
        <div className="flex lg:relative order-last lg:order-none">
          <Image
            src={missionImage}
            alt="Mission"
          />
        </div>
        
        <div className=" mt-8">
          <h1 className="subtitle">Finalità Benefica</h1>
          <h3 className="title">Chi siamo?</h3>
          <p className="mt-8 max-w-md text">GOinUP è un&apos;associazione con finalità benefica.<br />Con una quota degli introiti dalle iscrizioni e dalle donazioni volontarie, si pone come obbiettivo quello di donare delle attrezzature e/o servizi all&apos;associazione <a href="https://www.dappertutto.org" target="_blank" rel="noreferrer">Valtellina Accessibile Dappertutto</a> che tra le altre cose promuove l&apos;abbattimento delle barriere architettoniche e offre soluzioni per poter rendere accessibile a tutti la montagna.</p>
        </div>

      </section>
  )
}
