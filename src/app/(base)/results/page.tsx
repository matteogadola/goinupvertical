import { dt } from '@/utils/date';
import ResultList from './result-list';
import { getResultsByYear } from './actions';

export const revalidate = 3600

export const metadata = {
  title: 'Classifiche',
}

export default async function ResultsPage() {
  const currentYear = dt().year()
  const availableYears = [2023, 2024, 2025]
  const events = await getResultsByYear(currentYear)

  return (
    <>
      {/*<h3><span className="highlighted">2024</span></h3>*/}
      <h1 className="title">Classifiche</h1>

      <ResultList
        initialYear={currentYear}
        availableYears={availableYears}
        initialResults={events}
      />
    </>
  )
}
