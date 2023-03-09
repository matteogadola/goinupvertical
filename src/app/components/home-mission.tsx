import classNames from 'classnames'
import Image from 'next/image'
import missionImage from 'public/images/mission.png'

export default async function HomeMission({ className }: { className?: string }) {

  return (
    <section className={classNames("grid grid-cols-1 lg:grid-cols-2 justify-items-center gap-4", className)}>
      
      <div className="mt-4 lg:mt-12">
        <h3 className="overtitle">Finalità Benefica</h3>
        <h1 className="title">Chi siamo?</h1>
        <p className="mt-8 max-w-md">
          GOinUP è un gruppo di associazioni che coordina e promuove l&apos;omonimo circuito di gare di montagna.
          Il nostro obbiettivo è quello di riuscire a donare il maggior numero di attrezzature e servizi a
          diverse associazioni benefiche nel mandamento di Morbegno.
        </p>
      </div>
      <div className="flex lg:relative bg-slate-600 opacity-80">
        <Image
          src={missionImage}
          alt="Mission"
          height={400}
        />
      </div>
    </section>
  )
}
