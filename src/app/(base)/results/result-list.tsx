'use client'

import React, { useState, useTransition, Suspense, useMemo } from "react";
import { getResultsByYear } from "./actions";
import { Event } from "@/types/events";
import { urlForDowload } from "@/utils/sanity";
import { dt } from "@/utils/date";

interface PhotoDisplayProps {
  initialYear: number;
  initialResults: any[];
  availableYears: number[];
}

export default function ResultList({
  initialYear,
  initialResults,
  availableYears,
}: PhotoDisplayProps) {
  const [selectedYear, setSelectedYear] = useState<number>(initialYear)
  const [events, setEvents] = useState<Event[]>(initialResults)
  const serie = useMemo(() => events.find(event => event.type === 'serie'), [events])
  const races = useMemo(() => events.filter(event => event.type === 'race'), [events])
  const [isPending, startTransition] = useTransition();

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newYear = parseInt(event.target.value, 10);
    setSelectedYear(newYear)

    // Avvia la transizione per il fetch dei dati in background
    startTransition(async () => {
      try {
        const fetchedEvents = await getResultsByYear(newYear);
        setEvents(fetchedEvents);
      } catch (err) {
        setEvents([]);
      }
    });
  };

  return (
    <div className="mt-8">
      <select
        id="year-select"
        value={selectedYear}
        onChange={handleYearChange}
        disabled={isPending} // Disabilita durante il caricamento
      >
        {availableYears.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>

      {!!serie &&
        <div className="w-full mt-4 lg:mt-8">
          <h1 className="title">{serie.name}</h1>
          {serie.type === 'race' &&
            <span className="block text-xs text-gray-600">{dt(serie.date).format('DD MMMM YYYY')}</span>
          }

          <div className="mt-4">
            <ul className="space-y-4">
              {serie.results?.map((attachment: any, index: any) =>
                <li key={index} className="flex space-x-2">
                  <a href={urlForDowload(attachment.file, attachment.title)} target='_blank' className="text-lg hover:opacity-70">{attachment.title}</a>
                </li>
              )}
            </ul>
          </div>
        </div>
      }

      {races.length > 0 ? (
        <div className="mt-4 lg:mt-8 grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-8">
          {races.map((event: any, index: any) =>
            <div key={index} className="w-full lg:w-1/2 pt-6">
              <h1 className="title">{event.name}</h1>
              <span className="block text-xs text-gray-600">{dt(event.date).format('DD MMMM YYYY')}</span>
              <div className="mt-4">
                <ul className="space-y-4">
                  {event.results?.map((attachment: any, index: any) =>
                    <li key={index} className="flex space-x-2">
                      <a href={urlForDowload(attachment.file, attachment.title)} target='_blank' className="text-lg hover:opacity-70">{attachment.title}</a>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          )}
        </div>
      ) : (
        !isPending && <p className="mt-4">Nessun dato presente per quest'anno.</p>
      )}
    </div>
  )
}