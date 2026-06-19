'use client'

import React, { CSSProperties, useMemo } from 'react';
import { urlFor, urlForDowload } from '@/utils/sanity';
import { dt } from '@/utils/date';
import clsx from 'clsx';
import { formatEventDate } from '@/utils/events/entry-availability';
import { Button } from '@mantine/core';

type Props = {
  results: any[];
  className?: string;
}

export default function ResultList({
  results,
  className
}: Readonly<Props>) {
  const serie = useMemo(() => results.find(event => event.type === 'serie'), [results])
  const races = useMemo(() => results.filter(event => event.type === 'race'), [results])

  return (
    <div className={clsx(className)}>
      {!!serie &&
        <div className="w-full my-4 lg:my-8 border border-gray-300 rounded-lg p-4 lg:p-6 bg-gray-100">
          <h1 className="subtitle">{serie.name}</h1>
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-8">
          {races.map((event, index) =>
            <div key={index} className="w-full lg:w-1/2 pt-6">
              <h1 className="subtitle">{event.name}</h1>
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
        <p className="mt-4">Nessun dato presente per quest'anno.</p>
      )}
    </div>
  )
}

function getBackgroudStyle(event: any): CSSProperties {
  let url = '/images/default-summary.webp'

  if (event.summary_image) {
    url = urlFor(event.summary_image) ?? url
  }

  return { backgroundImage: `url("${url}")`, borderRadius: '1rem 1rem 0 0' } as CSSProperties
}