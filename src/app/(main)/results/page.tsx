import { dt } from '@/utils/date';
import ResultList from './result-list';
import { getAvailableYears, getResultsByYear } from './actions';

export const revalidate = 3600

export const metadata = {
  title: 'Classifiche',
}

export default async function ResultsPage() {
  const availableYears = await getAvailableYears()
  const lastAvailableYear = Math.max(...availableYears)
  const events = await getResultsByYear(lastAvailableYear)

  return (
    <>
      {/*<h3><span className="highlighted">2024</span></h3>*/}
      <h1 className="title">Classifiche</h1>

      <ResultList
        initialYear={lastAvailableYear}
        availableYears={availableYears}
        initialResults={events}
      />
    </>
  )
}
