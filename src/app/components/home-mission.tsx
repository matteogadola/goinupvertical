import Image from 'next/image'
import missionImage from 'public/images/mission-8.png'

export default async function HomeMission() {

  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 justify-items-center gap-4">
      <div className="flex lg:relative">
        <Image
          className=""
          src={missionImage}
          alt="Mission"
          height={400}
        />
      </div>
      <div className="mt-4 lg:mt-12">
        <h3 className="overtitle">Finalità Benefica</h3>
        <h1 className="title">Chi siamo?</h1>
        <p className="mt-8 max-w-md">GOinUP è un&apos;associazione con finalità benefica.<br />Il nostro obbiettivo è quello di riuscire a donare il maggior numero di attrezzature e servizi a diverse associazioni identificate nel mandamento di Morbegno.</p>
      </div>
    </section>
  )
}
