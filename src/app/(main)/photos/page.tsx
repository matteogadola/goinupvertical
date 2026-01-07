import { getAvailableYears, getLinksByYear } from './actions'
import PhotoList from './photo-list'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Foto",
}

export const revalidate = 3600

export default async function MediaPage() {
  const availableYears = await getAvailableYears()
  const lastAvailableYear = Math.max(...availableYears)
  const events = await getLinksByYear(lastAvailableYear)

  return (
    <>
      <h1 className="title">Foto</h1>

      <PhotoList
        initialYear={lastAvailableYear}
        availableYears={availableYears}
        initialResults={events}
      />
    </>
  )
}
