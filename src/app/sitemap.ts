import type { MetadataRoute } from 'next'
 
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://www.goinupvertical.it',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.1,
      images: ['https://www.goinupvertical.it/images/flyers/goinup-7-md.webp'],
    },
    {
      url: 'https://www.goinupvertical.it/regulation',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.1,
    },
    {
      url: 'https://www.goinupvertical.it/results',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.5,
    },
    {
      url: 'https://www.goinupvertical.it/photos',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.5,
    },
  ]
}
