import { dt } from '@/utils/date'
import { getLinksByYear } from './actions'
import PhotoList from './photo-list'

export const revalidate = 3600

export const metadata = {
  title: 'Goinup | Foto',
  description: 'Foto',
}

export default async function MediaPage() {
  const currentYear = dt().year()
  const availableYears = [2023, 2024, 2025]
  const events = await getLinksByYear(currentYear)
  
  return (
    <>
      <h1 className="title">Foto</h1>

      <PhotoList
        initialYear={currentYear}
        availableYears={availableYears}
        initialResults={events}
      />
    </>
  )
}
