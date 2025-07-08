import type { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
  return {
	rules: {
      userAgent: '*',
      allow: [
        '/$',
        '/favicon.ico',
		'/sitemap.xml',
		'/regulation',
        '/results',
		'/media',
      ],
      disallow: '/',
    },
    sitemap: 'https://goinupvertical.it/sitemap.xml',
  }
}
