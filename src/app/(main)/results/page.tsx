import { getAvailableYears, getResultsByYear } from './actions';
import ResultTabs from './result-tabs';
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Classifiche',
}

export default async function ResultsPage() {
  const availableYears = await getAvailableYears()
  const initialYear = Math.max(...availableYears)
  const initialResults = await getResultsByYear(initialYear)

  return (
    <>
      <h1 className="title">Classifiche</h1>

      <div className="mt-6">
        <ResultTabs
          availableYears={availableYears}
          initialYear={initialYear}
          initialResults={initialResults}
        />
      </div>
    </>
  )
}
