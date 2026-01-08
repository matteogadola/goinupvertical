import { getAvailableYears, getLinksByYear } from './actions'
import PhotoTabs from './photo-tabs'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Foto",
}

export default async function MediaPage() {
  const availableYears = await getAvailableYears()
  const initialYear = Math.max(...availableYears)
  const initialLinks = await getLinksByYear(initialYear)

  return (
    <>
      <h1 className="title">Foto</h1>

      <div className="mt-6">
        <PhotoTabs
          availableYears={availableYears}
          initialYear={initialYear}
          initialLinks={initialLinks}
        />
      </div>
    </>
  )
}
