'server only'

import type { GetStaticPaths, Metadata } from 'next'
import { getPromoter, getPromoters } from '@/app/lib/promoters'

type Props = {
  params: { promoter: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function PromoterPage({ params }: Props) {

  return (
    <>
      <span>Pagina di prova {params.promoter}</span>
    </>
  )
}

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const promoter = await getPromoter(params.promoter);

  return {
    title: promoter?.name,
  };
}

export const getStaticPaths: GetStaticPaths = async () => {
  const promoters = await getPromoters();
  const paths = promoters.map(item => ({ params: { promoter: item.id } }));

  return {
    paths,
    fallback: false,
  }
}