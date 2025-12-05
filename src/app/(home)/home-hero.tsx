'use client'

import { Box, Button, Container, Stack, Title, Text } from '@mantine/core'
import { CSSProperties, useEffect, useState } from 'react'
import Image from 'next/image';
import Link from 'next/link';

interface HeroSectionProps {
  title: string;
  subtitle?: string;
  backgroundImageSrc: string;
  backgroundImageAlt: string;
  ctaText?: string;
  ctaHref?: string;
  // Opzionale: permette di cambiare il colore dello "shape divider"
  // se la sezione successiva non è bianca.
  dividerColor?: string;
}




type Props = {
  images?: string[]
  className?: string
}

const images: string[] = [
  //'hero-1.webp',
  'hero-2.webp'
]

export function HomeHeroOld() {
  const [image, setImage] = useState<string>('hero-1.webp')

  useEffect(() => {
    setRandomImage()
  }, [])

  const setRandomImage = () => {
    const randomIndex = Math.floor(Math.random() * images.length)
    setImage(images[randomIndex])
  }

  return (
    <Box
      h="100vh"
      style={getBackgroudStyle(image)}
          // Stile d'esempio per lo sfondo della Hero
          //style={{
          //  backgroundImage:
          //    "linear-gradient(to top, rgba(0,0,0,0.6), rgba(0,0,0,0.2)), url(https://www.fidal.it/upload/files/GGG/Immagini/AdobeStock_11266696-1.jpg)",
          //  backgroundSize: "cover",
          //  backgroundPosition: "center",
          //}}
    >
      
      <Container size="xl" h="100%">
        <Stack justify="center" h="100%" align="left">
          <Title order={1} c="blue" fz={60} >
            GOinUP
          </Title>
          <Text c="gray.2" size="xl" ta="center" maw={600}>
            Circuito di 10 gare vertical di montagna a finalità benefica
          </Text>
        </Stack>
      </Container>
    </Box>
  );
}

export default function HomeHero({ serie, className }: Readonly<{ serie: any, className?: string }>) {
  const [image, setImage] = useState<string>('hero-1.webp')

  useEffect(() => {
    setRandomImage()
  }, [])

  const setRandomImage = () => {
    const randomIndex = Math.floor(Math.random() * images.length)
    setImage(images[randomIndex])
  }

  const title = "GOinUP"
  const subtitle = "Circuito di 10 gare vertical di montagna a finalità benefica"
  const ctaText = "Scopri la flotta"
  const ctaHref = "/"
  const dividerColor = "text-white"
  const dividerHeight = "lg:h-48"
  const imageSrc = "/images/homepage/${image}"

  return (
    <Box h="100vh">
    <section className="relative w-full h-full min-h-[600px] overflow-hidden bg-gray-900">

      {/* --- 1. Background Image (Next/Image Best Practices) --- */}
      <div className="absolute inset-0 z-0">
        <Image
          src={'/images/homepage/' + image}
          alt="image alt"
          fill // Riempie il container padre (relative)
          priority // FONDAMENTALE: Questa è l'immagine LCP. Caricala immediatamente.
          className="object-cover object-center opacity-90" // object-cover mantiene le proporzioni
          sizes="100vw" // Indica al browser che l'immagine occupa tutta la larghezza
        />
        {/* Un leggero overlay scuro per migliorare la leggibilità del testo */}
        <div className="absolute inset-0 bg-linear-to-b from-trasparent to-white/20" aria-hidden="true"></div>
      </div>

      {/* --- 2. Content --- */}
      {/* Centriamo il contenuto usando flexbox e z-index per metterlo sopra l'immagine */}
      <div className="relative z-10 flex flex-col mt-[200px] px-2 text-primary sm:px-4 lg:px-6">

        <h3 className="text-2xl font-unbounded uppercase text-white font-bold drop-shadow-md">
          Il circuito di gare vertical che fa bene al territorio
        </h3>
        {subtitle && (
          <p className="hidden mt-4 max-w-2xl text-lg sm:text-xl text-white drop-shadow-sm">
            <span>GOinUP è un gruppo di associazioni che coordina e promuove l'omonimo circuito di gare di montagna.</span>
            <span className="block">
              Il nostro obbiettivo è quello di riuscire a donare il maggior numero di attrezzature e servizi
              a diverse associazioni benefiche nel mandamento di Morbegno
            </span>
          </p>
        )}

        {serie && ctaText && ctaHref && (
          <div className="mt-8">
            <Link
              href={ctaHref}
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-accent px-4 py-2 text-base font-medium text-black hover:bg-yellow-200 lg:px-6 lg:py-3 lg:text-lg transition-colors duration-200 shadow-lg"
            >
              Iscriviti alla prossima gara
            </Link>
          </div>
        )}
      </div>


      {/* --- 3. The "Skewed & Rounded" SVG Shape Divider --- */}
      {/*
         Questo è il trucco. Invece di tagliare l'immagine, posizioniamo un SVG
         dello stesso colore dello sfondo della sezione successiva sopra l'immagine.
         Questo SVG ha la forma "inversa" del taglio desiderato.

         - bottom-0 left-0 w-full: Si ancora in basso e occupa tutta la larghezza.
         - h-16 / h-24 / h-32: L'altezza del taglio varia in base al breakpoint per responsiveness.
         - text-white (o dividerColor): Usa il colore del testo di Tailwind per riempire l'SVG.
      */}
      <div className={`absolute bottom-0 left-0 w-full z-20 leading-[0] ${dividerColor}`}>
        <svg
          className={`relative block w-full ${dividerHeight}`}
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          {/* SPIEGAZIONE DEL PATH (La geometria del taglio):
            
            M0,120     -> Inizia in basso a sinistra (copre l'angolo)
            L1200,120  -> Linea fino in basso a destra
            L1200,0    -> Sale fino in alto a destra (questo crea il picco alto a dx)
            
            La magia avviene qui (Curva di Bézier):
            C 1100,10 900,80 0,90
            
            - Start: (1200,0) Alto a destra
            - Control Point 1 (1100, 10): Mantiene la curva alta vicino al bordo destro, iniziando morbida.
            - Control Point 2 (900, 80): Spinge la curva drasticamente verso il basso mentre si va a sinistra.
            - End Point (0, 90): Arriva al lato sinistro quasi in fondo, ma non a zero.
            
            Z          -> Chiude la forma.
          */}
          <path
            d="M0,120 L1200,120 L1200,0 C1050,5 900,60 0,100 Z"
            fill="var(--background)"
          ></path>
        </svg>
      </div>
    </section>
    </Box>
  );
}

function getBackgroudStyle(image: string): CSSProperties {
  const url = `/images/homepage/${image}`

  return {
    backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.0), rgba(0,0,0,0.0)), url("${url}")`,
    //backgroundImage: `url("${url}") no-repeat center center`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  }
}
