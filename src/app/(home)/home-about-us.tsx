import Image from 'next/image'
import aboutUs from '../../../public/images/homepage/about-us.webp'

export default async function HomeAboutUs() {

  return (
    <div className="bg-primary">
      <div className="content grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="px-8 py-16 text-white">
          <span className="text-7xl font-matroska">GOinUP</span>
          <p className="mt-8 text-xl font-poppins">
            Circuito di 10 gare vertical di montagna a <span className="font-normal">finalità benefica</span>.
            GOinUP è un gruppo di associazioni che coordina e promuove l&apos;omonimo circuito di gare di montagna. Il nostro obbiettivo è quello di riuscire a donare il maggior numero di attrezzature e servizi a diverse associazioni benefiche nel mandamento di Morbegno
          </p>
        </div>
        <div className="justify-items-end">
          <Image
            alt="Mission"
            src={aboutUs}
            sizes="100vw"
            style={{
              width: '100%',
              height: 'auto',
            }}
          />
        </div>
      </div>
    </div>
  )
}
