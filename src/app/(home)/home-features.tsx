import { ScrollAnimation } from '@/components/animations/scroll-animation';
import FeatureCard, { FeatureItem } from '@/components/feature-card/feature-card';
import Image from 'next/image';
import React from 'react';

// --- Domain & Types ---
// Definiamo i dati fuori dal componente o in un file separato per pulizia.
/*export interface FeatureItem {
  id: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  // Colore di sfondo opzionale per il cerchio dell'immagine per differenziare le categorie
  accentColorClass?: string; 
}*/

interface Props {
  features: FeatureItem[];
  title?: string;
  subtitle?: string;
  className?: string;
}

// --- Sub-Component: FeatureCard ---
// Isolare la card rende il codice più leggibile e testabile.
/*const FeatureCard: React.FC<{ item: FeatureItem }> = ({ item }) => {
  return (
    <div className="group relative flex flex-col items-center rounded-2xl bg-white p-8 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ring-1 ring-gray-100">

      <div className={`mb-6 flex h-24 w-24 items-center justify-center rounded-full ${item.accentColorClass || 'bg-blue-50'} transition-transform duration-300 group-hover:scale-110`}>
        <div className="relative h-16 w-16">
           <Image
            src={item.imageSrc}
            alt={item.imageAlt}
            fill
            className="object-contain" // Assicura che l'immagine non venga tagliata
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </div>

      <h3 className="mb-3 text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
        {item.title}
      </h3>
      <p className="text-base leading-relaxed text-gray-600">
        {item.description}
      </p>
    </div>
  );
};*/
const title = "I nostri punti di forza"
const subtitle = "Ecco perché il nostro circuito è unico nel suo genere."

export default async function HomeFeatures({ features }: Readonly<Props>) {

  return (
    <section className="py-16 sm:py-24">
      <div className="px-2 sm:px-4 lg:px-6">
        
        {/* Header della sezione */}
        {/*<div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            {title}
          </h2>
          <p className="mt-4 text-lg text-gray-500">
            {subtitle}
          </p>
        </div>*/}

        {/* Grid delle Features */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {features.map((feature, index) => (
            <ScrollAnimation key={feature._id} animation="zoom" delay={0.1 * index}>
              <FeatureCard item={feature} />
            </ScrollAnimation>
          ))}
        </div>
      </div>
    </section>
  );
// --- Main Component ---
//export const HomeFeatures: React.FC = () => {
  
  /*
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
  */
};

//export default HomeFeatures;