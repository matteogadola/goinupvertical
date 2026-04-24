import { createClient } from 'next-sanity'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-02-19',
  useCdn: process.env.DEPLOY_STAGE === 'production',
  perspective: process.env.DEPLOY_STAGE === 'production' ? 'published' : 'drafts',
  token: process.env?.SANITY_API_TOKEN,
})
