import Image from 'next/image';
import React from 'react';
import { PortableText, PortableTextReactComponents } from '@portabletext/react'
import { urlFor } from '@/utils/sanity';

// --- Domain & Types ---
/*export interface FeatureItem {
  id: string;
  title: string;
  description: string;
  backgroundImageSrc: string;
  backgroundImageAlt: string;
}*/

export interface FeatureItem {
  _id: string;
  index: number;
  title: string;
  description: any[];
  image: string;
  imageAlt: string;
  // Colore di sfondo opzionale per il cerchio dell'immagine per differenziare le categorie
  accentColorClass?: string; 
}

interface FeaturesSectionProps {
  features: FeatureItem[];
  title?: string;
  subtitle?: string;
}


const components: Partial<PortableTextReactComponents> = {
  marks: {
    link: ({value, children}) => {
      const target = (value?.href || '').startsWith('http') ? '_blank' : undefined
      return (
        <a href={value?.href} target={target} rel={target === '_blank' ? 'noindex nofollow' : ''} className='link'>
          {children}
        </a>
      )
    }},
  list: {
    bullet: ({children}) => <ul className="my-2">{children}</ul>,
  },
  listItem: {
    bullet: ({children}) => <li style={{
      listStyleType: 'disc',
      listStylePosition: 'inside'
    }}>{children}</li>,
  },
  block: {
    normal: ({children}) => <p className="mb-2">{children}</p>,
  },
}

const FeatureCard: React.FC<{ item: FeatureItem }> = ({ item }) => {
  return (
    <div className="relative isolate overflow-hidden h-80 flex flex-col items-center justify-center">
      <div className="relative z-10 px-4 text-center sm:px-6 lg:px-8 h-60">
        <h2 className="title">{item.title}</h2>
        
        {/* Descrizione */}
        <div className="mx-auto mt-6 max-w-2xl text-xl">
            <PortableText value={item.description} components={components} />
        </div>
      </div>

      <div className="absolute inset-0 z-0 h-80 w-80 opacity-40 top-1/2 left-1/2 -translate-1/2"> {/* grayscale */}
        <div className="relative h-full w-full">
           <Image
            src={urlFor(item.image)}
            alt={'imageAlt'}
            fill
            className="object-cover object-center" // Allinea l'immagine in alto - className="object-cover object-center""object-contain object-top"
            sizes="(max-width: 768px) 85vw, 60vw"
            priority // Caricamento prioritario se è above-the-fold
          />
          {/* Maschera sfumata (Fade Out):
             Questo gradiente bianco sfuma l'immagine verso il basso, 
             esattamente come nello screenshot.
          */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/90"></div>
        </div>
      </div>
    </div>
  );
};

// --- Sub-Component: BackgroundFeatureCard ---
const FeatureCardOld: React.FC<{ item: FeatureItem }> = ({ item }) => {
  return (
    <div className="relative h-96 w-full overflow-hidden sm:h-[400px]"> {/* rounded-2xl shadow */}
      
      {/* 1. Background Image with Zoom Effect */}
      <div className="absolute inset-0 z-0 h-full w-full transition-transform duration-700 ease-in-out group-hover:scale-110">
        <Image
          src={urlFor(item.image)}
          alt={item.title}
          fill
          className="object-cover object-center"
          // Best Practice: Definisci le sizes per ottimizzare il caricamento
          // Su mobile 100vw, su tablet 50vw, su desktop 33vw
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      {/* 2. Gradient Overlay */}
      {/* Fondamentale per la leggibilità. Usiamo un gradiente che parte dal basso (scuro) 
         verso l'alto (trasparente) per non coprire troppo l'immagine ma rendere leggibile il testo.
      */}
      {/*
      <div className="absolute inset-0 z-10 bg-linear-to-t from-black/90 via-black/50 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-90" />
      */}
      <div className="absolute inset-0 z-10 bg-linear-to-t from-white/90 via-white/90 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-90" />

      {/* 3. Content */}
      <div className="relative z-20 flex h-full flex-col justify-center p-6 sm:p-8">
        <h3 className="mb-3 text-2xl font-bold title drop-shadow-md uppercase"> {/* text-white */}
          {item.title}
        </h3>
        
        <div className="text-base leading-relaxed drop-shadow-sm opacity-90"> {/* text-white */}
          <PortableText value={item.description} components={components} />
        </div>
      </div>
    </div>
  );
};

// --- Main Component ---
/*export const BackgroundFeaturesSection: React.FC<FeaturesSectionProps> = ({
  features,
  title = "I nostri punti di forza",
  subtitle = "Ecco perché il nostro circuito è unico nel suo genere."
}) => {
  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="mb-12 text-center sm:mb-16">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            {title}
          </h2>
          {subtitle && (
            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-500">
              {subtitle}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <BackgroundFeatureCard key={feature.id} item={feature} />
          ))}
        </div>

      </div>
    </section>
  );
};*/

export default FeatureCard;