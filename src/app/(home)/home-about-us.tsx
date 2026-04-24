import Image, { StaticImageData } from 'next/image'
import jolette from '../../../public/images/homepage/jolette-unmask.webp'
import joletteMask from '../../../public/images/homepage/jolette-mask.webp'
import trail from '../../../public/images/homepage/trail-unmask.webp'
import trailMask from '../../../public/images/homepage/trail-mask.webp'
import gusto from '../../../public/images/homepage/gusto.webp'
import gustoMask from '../../../public/images/homepage/gusto-mask.webp'
import { ReactNode } from 'react'
import { ScrollAnimation } from '@/components/animations/scroll-animation'

type Props = {
  className?: string
}

export default async function HomeAboutUs() {

  // flex min-h-[512px] justify-center items-center
  return (
    <div className="my-8 lg:my-16">
      <div className="content grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="px-8 pt-4 pb-18 lg:py-24 text-primary">
          <h1 className="flex text-5xl lg:text-7xl font-matroska">
            <ScrollAnimation animation="zoom" delay={0}><span>GO</span></ScrollAnimation>
            <ScrollAnimation animation="zoom" delay={0.05}><span>in</span></ScrollAnimation>
            <ScrollAnimation animation="zoom" delay={0.1}><span className="text-accent">UP</span></ScrollAnimation>
          </h1>
          {/*<h1 className="text-5xl lg:text-7xl font-matroska">GOin<span className="text-accent">UP</span></h1>*/}
          <ScrollAnimation animation="zoom" delay={0.2}>
            <h2 className="mb-4 text-lg">Circuito di 10 gare vertical di montagna a <span className="font-normal">finalità benefica</span>.</h2>
            <p className="mt-8 text-xl">
              GOinUP è un gruppo di associazioni che coordina e promuove l&apos;omonimo circuito di gare di montagna. Il nostro obbiettivo è quello di riuscire a donare il maggior numero di attrezzature e servizi a diverse associazioni benefiche nel mandamento di Morbegno
            </p>
          </ScrollAnimation>
        </div>
        <div className="hidden lg:flex justify-items-end">
          <div className="px-4 lg:px-0 h-full w-full grid grid-cols-1 lg:grid-cols-2 gap-4">
            <ScrollAnimation animation="zoom" delay={0.2}>
            <div className="h-full min-h-48 w-256px">
              <ImageCard src={trail} mask={trailMask} alt="Foto trail running">
                <h3 className="uppercase font-archivo text-shadow-lg text-background text-center text-5xl lg:text-6xl">Beneficenza</h3>
              </ImageCard>

            </div>
            </ScrollAnimation>
            <ScrollAnimation animation="zoom" delay={0.3}>
            <div className="h-full grid grid-cols-1 justify-items-end gap-4">
              
              <div className="min-h-48 w-full lg:w-4/5 rounded-4xl group">
                <ImageCard src={jolette} mask={joletteMask} alt="Foto jolette">
<h3 className="uppercase font-archivo text-shadow-lg text-background text-center text-6xl lg:text-5xl">Inclusività</h3>
                </ImageCard>
              </div>
              <div className="min-h-48 w-full lg:w-4/5 rounded-4xl group">
                <ImageCard src={gusto} mask={gustoMask} alt="Foto birra">
                  <h3 className="uppercase font-archivo text-shadow-lg text-background text-center text-6xl lg:text-5xl">Gusto</h3>
                </ImageCard>
              </div>
              
            </div>
            </ScrollAnimation>
          </div>
        </div>
      </div>
      {/*Box pos="relative" w={400}>
        <Image src={aboutUs} alt="Mission" style={{ position: 'relative' }} />
        <Text style={{ position: 'absolute', top: 60, left: 40, zIndex: 1, color: 'var(--color-gray-50)', fontSize: '3rem', fontWeight: 'bold', fontFamily: 'var(--font-matroska)', textShadow: '2px 4px 3px rgba(0,0,0,0.3)' }}>INCLUSIVITÀ</Text>
        <Image src={aboutUsMask} alt="Mission" style={{ position: 'absolute', top: 0, left: 0, zIndex: 2 }}/>
    </Box>*/}
    </div>
  )
}

interface FullFillImageProps {
  src: string | StaticImageData;
  alt: string;
  className?: string; // Opzionale: per aggiungere ombre o bordi specifici
}

export function FullFillImage({ src, alt, className = "" }: FullFillImageProps) {
  return (
    <div
      className={`
        relative
        w-full h-full
        overflow-hidden
        ${className}
      `}
    >
      <Image
        src={src}
        alt={alt}
        fill              /* Posizionamento assoluto automatico */
        className="object-cover" /* Scala mantenendo le proporzioni e taglia l'eccesso */
        sizes="(max-width: 768px) 100vw, 50vw"
      />
    </div>
  );
}

interface ImageCardProps {
  src: string | StaticImageData;
  mask?: string | StaticImageData;
  alt: string;
  children?: ReactNode;      // Il testo o i bottoni da mostrare sopra
  className?: string;        // Per eventuali stili extra sul container
  overlayOpacity?: string;   // Opzionale: per regolare l'intensità del gradiente
}

export function ImageCard({
  src,
  mask,
  alt,
  children,
  className = "",
  overlayOpacity = "from-black/70 via-black/20 to-transparent" // Default: scuro sotto, chiaro sopra
}: ImageCardProps) {
  return (
    <div
      className={`
        relative 
        w-full h-full 
        rounded-4xl
        overflow-hidden
        shadow 
        group
        ${className}
      `}
    >
      {/* 1. L'IMMAGINE DI SFONDO group-hover:scale-105 */}
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 50vw"
      />

      {/* 2. L'OVERLAY (SCRIM) */}
      {/* Senza questo, il testo bianco non si legge su immagini chiare.
          pointer-events-none permette di cliccare l'immagine sotto se necessario. */}
      <div
        className={`absolute inset-0 bg-linear-to-t ${overlayOpacity} pointer-events-none`}
      />
      

      {/* 3. IL CONTENUTO (TESTO) */}
      {/* h-full permette di usare flexbox per posizionare il testo (es. in basso) */}
      <div className="relative z-5 h-full mx-auto w-full px-2 py-4 wrap-anywhere group-hover:scale-110 transition-transform duration-700">
        {children}
      </div>
      {mask && (
        <Image
        src={mask}
        alt={alt}
        fill
        className=" absolute z-10 top-0 left-0 object-cover"
        sizes="(max-width: 768px) 100vw, 50vw"
      />
      )}
    </div>
  );
}