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
    <section className="mx-28 grid grid-cols-1 md:grid-cols-2 justify-items-center gap-4">
        <div className="hidden md:flex md:relative ">
          <Image
            src={missionImage}
            alt="Mission"
          />
        </div>
        
        <div className="text-slate-800 font-unbounded">
          <h1 className="text-2xl md:text-1xl text-accent">Finalità Benefica</h1>
          <h3 className="text-1xl md:text-4xl">Chi siamo?</h3>
          <p>GOinUP ha finalità benefica, con una quota degli introiti dalle iscrizioni e dalle donazioni volontarie, si pone come obbiettivo quello di donare delle attrezzature e/o servizi all&apos;associazione: VALTELLINA ACCESSIBILE DAPPERTUTTO</p>
        </div>

        
      </section>
  )
}
