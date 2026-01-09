'use client'

import { Box, Button, Container, Stack, Title, Text } from '@mantine/core'
import { CSSProperties, useEffect, useState } from 'react'
import Image from 'next/image';
import Link from 'next/link';
import { ScrollAnimation } from '@/components/animations/scroll-animation';
import { HeroCTA } from './home-hero-cta';
import { CtaButton } from '@/components/cta-button';

type Props = {
  className?: string;
  showCta?: boolean;
  onClickCta?: () => void;
}

//const images: string[] = [
//'hero-1.webp',
//  'hero-3.webp'
//]

export default function HomeHero({ className, showCta, onClickCta }: Readonly<Props>) {
  const [image, setImage] = useState<string>('hero-3.webp')

  //useEffect(() => {
  //  setRandomImage()
  //}, [])

  //const setRandomImage = () => {
  //  const randomIndex = Math.floor(Math.random() * images.length)
  //  setImage(images[randomIndex])
  //}

  return (
    <Box h="100vh">
      <section className="relative -top-20 w-full h-full min-h-[600px] overflow-hidden bg-gray-900">
        <div className="absolute inset-0 z-0">
          <Image
            src={`/images/homepage/${image}`}
            alt="image alt"
            fill
            priority // FONDAMENTALE: Questa è l'immagine LCP. Caricala immediatamente.
            className="object-cover object-center opacity-90 " // object-cover mantiene le proporzioni
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-linear-to-b from-trasparent to-white/20" aria-hidden="true"></div>
        </div>

        <div className="relative z-10 flex flex-col mt-[100px] lg:mt-[150px] px-2 text-primary font-archivo sm:px-4 lg:px-6 max-w-6xl mx-auto">
          <h1 className="flex flex-col text-center uppercase">
            <ScrollAnimation animation="slide-left" delay={0.08}>
              <span className="text-4xl lg:text-5xl">
                Il circuito di gare vertical
              </span>
            </ScrollAnimation>
            <ScrollAnimation animation="slide-left" delay={0.12}>
              <span className=" text-5xl lg:text-6xl">
                che fa bene al territorio
              </span>
            </ScrollAnimation>
          </h1>

          <p className="mt-8 max-w-3xl mx-auto font-semibold text-center">
            Circuito di 10 gare vertical di montagna a finalità benefica coordinato
            da un gruppo di associazioni con lo scopo di riuscire a donare il maggior numero
            di attrezzature e servizi a diverse organizzazioni benefiche nel mandamento di Morbegno
          </p>

          {showCta === true && (
            <div className="mt-8 mx-auto">
              <CtaButton />
            </div>
          )}
        </div>
      </section>
    </Box>
  );
}

//function getBackgroudStyle(image: string): CSSProperties {
//  const url = `/images/homepage/${image}`

//  return {
//    backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.0), rgba(0,0,0,0.0)), url("${url}")`,
//backgroundImage: `url("${url}") no-repeat center center`,
//    backgroundSize: "cover",
//    backgroundPosition: "center",
//  }
//}
