'use client'

import React, { useState, useTransition, useMemo } from 'react';
import { FloatingIndicator, Tabs } from '@mantine/core';
import type { Event } from '@/types/events';
import { getLinksByYear } from './actions';
import Spinner from '@/components/ui/spinner';
import PhotoList from './photo-list';

type Props = {
  availableYears: number[];
  initialYear: number;
  initialLinks: Event[];
}

export default function LinksTabs({
  availableYears,
  initialYear,
  initialLinks,
}: Readonly<Props>) {
  const [selectedYear, setSelectedYear] = useState<string | null>(initialYear.toString())
  const [links, setLinks] = useState<Event[]>(initialLinks)
  const [isPending, startTransition] = useTransition();

  const handleTabChange = (value: string | null) => {
    setSelectedYear(value)

    startTransition(async () => {
      try {
        const fetchedEvents = await getLinksByYear(Number(value));
        setLinks(fetchedEvents);
      } catch (err) {
        setLinks([]);
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
            : <PhotoList links={links} />
          }
        </Tabs.Panel>
      )}
    </Tabs>
  )
}