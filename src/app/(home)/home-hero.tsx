'use client'

import { CSSProperties, useEffect, useState } from 'react'
import Image from 'next/image';
import { Box, Button, Container, Stack, Title, Text } from '@mantine/core'
import { ScrollAnimation } from '@/components/animations/scroll-animation';
import { CtaButton } from '@/components/cta-button';
import { MuxBackgroundVideo } from '@mux/mux-background-video/react';

type Props = {
  className?: string;
  showCta?: boolean;
  onClickCta?: () => void;
}

export default function HomeHero({ className, showCta, onClickCta }: Readonly<Props>) {
  const [image, setImage] = useState<string>('hero-3.webp')
  const [media, setMedia] = useState<'video' | 'image'>('image')

            /*
            <video
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover object-center"
              >
                <source src="https://stream.mux.com/rR8P8mSaKDzz02TsftugTUdI00cQPJX00oy.m3u8" type="video/webm" />
              </video>
              */
  return (
    <Box h="100vh">
      <section className="relative -top-20 w-full h-full min-h-[600px] overflow-hidden bg-gray-900">
        <div className="absolute inset-0 z-0">
          {media === 'video'
            ? <MuxBackgroundVideo src="https://stream.mux.com/x02sgAt1kis5icZ1UwlHO0201psFkTW800entlPPgAwF4To.m3u8">
                {/*<img src="https://image.mux.com/x02sgAt1kis5icZ1UwlHO0201psFkTW800entlPPgAwF4To/thumbnail.webp?time=0" alt="Mux Background Video" />*/}
              </MuxBackgroundVideo>
            : <Image
                src={`/images/homepage/${image}`}
                alt="image alt"
                fill
                priority
                className="object-cover object-center opacity-90"
                sizes="100vw"
              />
          }
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-white/20" aria-hidden="true" />
          
          {/* Gradiente dal basso */}
          <div className="absolute inset-0 bg-linear-to-t from-gray-900 via-transparent to-transparent opacity-80" aria-hidden="true" />
        </div>

        <div className="relative z-10 flex flex-col mt-[150px] lg:mt-[250px] px-2 text-primary font-archivo sm:px-4 lg:px-6 max-w-6xl mx-auto">
          <h1 className="flex flex-col text-center uppercase">
            <ScrollAnimation animation="slide-left" delay={0.08} width='100%'>
              <span className="text-4xl lg:text-5xl">
                Il circuito di gare vertical
              </span>
            </ScrollAnimation>
            <ScrollAnimation animation="slide-left" delay={0.12} width='100%'>
              <span className=" text-5xl lg:text-6xl">
                che fa bene al territorio
              </span>
            </ScrollAnimation>
          </h1>

          {showCta === true && (
            <div className="mt-8 mx-auto">
              <CtaButton
                text="Scopri le gare"
                anchor="upcoming-events"
              />
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
