'use client'

import React, { useMemo } from 'react';
import { dt } from '@/utils/date';

type Props = {
  links: any[];
}

export default function PhotoList({
  links,
}: Readonly<Props>) {
  const serie = useMemo(() => links.find(event => event.type === 'serie'), [links])
  const races = useMemo(() => links.filter(event => event.type === 'race'), [links])

  return (
    <div className="mt-4 lg:mt-8">
      {races.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-8">
          {races.map((event, eventIndex) =>
            <div key={eventIndex} className="w-full lg:w-1/2 pt-6">
              <h1 className="subtitle">{event.name}</h1>
              <span className="block text-xs text-gray-600">{dt(event.date).format('DD MMMM YYYY')}</span>
              <div className="mt-4">
                <ul className="space-y-4">
                  {event.links?.map((link: any, index: any) =>
                    <li key={index} className="flex space-x-2">
                      <a href={link.url} target='_blank' className="text-lg hover:opacity-70">{link.title}</a>
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