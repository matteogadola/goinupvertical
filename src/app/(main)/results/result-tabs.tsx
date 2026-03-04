'use client'

import React, { useState, useTransition, useMemo } from 'react';
import { FloatingIndicator, Tabs } from '@mantine/core';
import ResultList from './result-list';
import { getLinksByYear } from '../photos/actions';
import type { Event } from '@/types/events';
import { getResultsByYear } from './actions';
import Spinner from '@/components/ui/spinner';

type Props = {
  availableYears: number[];
  initialYear: number;
  initialResults: Event[];
}

export default function ResultTabs({
  availableYears,
  initialYear,
  initialResults,
}: Readonly<Props>) {
  const [selectedYear, setSelectedYear] = useState<string | null>(initialYear.toString())
  const [results, setResults] = useState<Event[]>(initialResults)
  const [isPending, startTransition] = useTransition();

  const handleTabChange = (value: string | null) => {
    setSelectedYear(value)

    startTransition(async () => {
      try {
        const fetchedEvents = await getResultsByYear(Number(value));
        setResults(fetchedEvents);
      } catch (err) {
        setResults([]);
      }
    });
  };

  const [rootRef, setRootRef] = useState<HTMLDivElement | null>(null);
  const [controlsRefs, setControlsRefs] = useState<Record<string, HTMLButtonElement | null>>({});
  const setControlRef = (val: string) => (node: HTMLButtonElement) => {
    controlsRefs[val] = node;
    setControlsRefs(controlsRefs);
  };

  return (
    <Tabs variant="none" value={selectedYear} onChange={handleTabChange}>
      <Tabs.List ref={setRootRef} className="list">
        {availableYears.map((year, index) =>
          <Tabs.Tab
            key={index}
            value={year.toString()}
            disabled={isPending}
            ref={setControlRef(year.toString())}
            className="tab"
          >
            {year}
          </Tabs.Tab>
        )}

        <FloatingIndicator
          target={selectedYear ? controlsRefs[selectedYear] : null}
          parent={rootRef}
          className="indicator"
        />
      </Tabs.List>

      {availableYears.map((year, index) =>
        <Tabs.Panel
          key={index}
          value={year.toString()}
        >
          {isPending === true
            ? <Spinner size="lg" />
            : <ResultList results={results} />
          }
        </Tabs.Panel>
      )}
    </Tabs>
  )
}