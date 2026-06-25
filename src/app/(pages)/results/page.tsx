import type { Metadata } from 'next';
import Image from 'next/image';
import { Box, Button, Container, Stack, Title, Text } from '@mantine/core'
import { ScrollAnimation } from '@/components/animations/scroll-animation';
import { getAvailableYears, getResultsByYear } from './actions';
import ResultTabs from './result-tabs';
import { getPage } from '@/utils/sanity/queries';
import { urlFor } from '@/utils/sanity';

export const metadata: Metadata = {
  title: 'GOinUP Classifiche',
}

export default async function ResultsPage() {
  const page = await getPage('results');
  const availableYears = await getAvailableYears()
  const initialYear = Math.max(...availableYears)
  const initialResults = await getResultsByYear(initialYear)

  return (
    <>
    <div className="flex items-center justify-center">
        <h1 className="title mt-28">Classifiche</h1>
      </div>

      <Box h="25vh" className="hidden">
        <section className="relative -top-20 w-full h-full overflow-hidden bg-gray-900">
          <div className="absolute inset-0 z-0">

              <Image
                  src={urlFor(page.cover_image)}
                  alt="image alt"
                  fill
                  priority
                  className="object-cover object-center opacity-90"
                  sizes="100vw"
                />
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-white/20" aria-hidden="true" />
            
            {/* Gradiente dal basso */}
            <div className="absolute inset-0 bg-linear-to-t from-gray-900 via-transparent to-transparent opacity-80" aria-hidden="true" />
          </div>
  
          <div className="relative z-10 flex flex-col mt-[100px] lg:mt-[180px] px-2 text-primary font-archivo sm:px-4 lg:px-6 max-w-6xl mx-auto">
            <h1 className="flex flex-col text-center uppercase">
              <ScrollAnimation animation="slide-left" delay={0.08} width='100%'>
                <span className="text-4xl lg:text-5xl">
                  {page.name}
                </span>
              </ScrollAnimation>
            </h1>
          </div>
        </section>
      </Box>
      

      <div className="mt-6">
        <ResultTabs
          availableYears={availableYears}
          initialYear={initialYear}
          initialResults={initialResults}
        />
      </div>
    </>
  )
}
