import { urlFor } from '@/utils/sanity';
import { getCredits } from '@/utils/sanity/queries';
import clsx from 'clsx';

// Mappatura statica delle dimensioni. 
// Dato che le classi sono scritte esplicitamente qui, il compilatore di Tailwind
// le intercetterà sempre e verranno incluse nel CSS finale.
const sizeMap: Record<string, string> = {
  xs: 'h-14',
  sm: 'h-18',
  md: 'h-22',
  lg: 'h-24',
  xl: 'h-26',
};

export default async function Credits({ className }: { className?: string }) {
  const credits = await getCredits();
  const sponsor = credits.find((item: any) => item.slug.current === 'sponsor')
  const supporter = credits.find((item: any) => item.slug.current === 'supporter')
  const mediaPartner = credits.find((item: any) => item.slug.current === 'media-partner')

  return (
    <section className={clsx(className, "text-center mx-4 space-y-8")}>
      {!!sponsor &&
        <div className="py-4">
          <h3 className="title">{sponsor.name}</h3>
          <div className="flex flex-wrap items-center gap-y-8 mt-8">
            {sponsor.logos?.map((item, index) =>
              <div key={index} className="flex grow w-1/2 lg:w-1/4 justify-center items-center min-h-18">
                <a href={item.url} target="_blank" rel="noopener noreferrer" className={clsx({ "col-span-2 lg:col-span-3": index === sponsor.logos.length - 1 })}>
                  <img src={urlFor(item.imageUrl)} className={clsx(sizeMap[item.size || 'md'], "object-contain hover:scale-105 transition-transform")} alt={item.name} />
                </a>
              </div>
            )}
          </div>
        </div>
      }

      {!!supporter &&
        <div className="py-4">
          <h3 className="title">{supporter.name}</h3>
          <div className="flex flex-wrap items-center gap-y-8 mt-8">
            {supporter.logos?.map((item, index) =>
              <div key={index} className="flex grow w-1/2 lg:w-1/4 justify-center items-center min-h-18">
                <a href={item.url} target="_blank" rel="noopener noreferrer" className={clsx({ "col-span-2 lg:col-span-3": index === supporter.logos.length - 1 })}>
                  <img src={urlFor(item.imageUrl)} className={clsx(sizeMap[item.size || 'md'], "object-contain hover:scale-105 transition-transform")} alt={item.name} />
                </a>
              </div>
            )}
          </div>
        </div>
      }

      {!!mediaPartner &&
        <div className="py-4">
          <h3 className="title">{mediaPartner.name}</h3>
          <div className="flex flex-wrap items-center gap-y-8 mt-8">
            {mediaPartner.logos?.map((item, index) =>
              <div key={index} className="flex grow w-1/2 lg:w-1/4 justify-center items-center min-h-18">
                <a href={item.url} target="_blank" rel="noopener noreferrer" className={clsx({ "col-span-2 lg:col-span-3": index === mediaPartner.logos.length - 1 })}>
                  <img src={urlFor(item.imageUrl)} className={clsx(sizeMap[item.size || 'md'], "object-contain hover:scale-105 transition-transform")} alt={item.name} />
                </a>
              </div>
            )}
          </div>
        </div>
      }
    </section>
  )
}
