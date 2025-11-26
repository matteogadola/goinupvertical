/*import Spinner from '@/components/spinner';
import { base64 } from '@/lib/helpers';
import { createClient } from '@/lib/supabase-auth-client';
import { Event } from '@/types/events';
import { redirect, usePathname, useSearchParams } from 'next/navigation'
import { Suspense, cache, useEffect, useState } from 'react';

interface SearchParams {
  q: string;
}

interface State {
  entries: any[];
  items: any[];
}

const supabase = createClient();

const fetchEntries = cache(async (id: string) => {
  const { data } = await supabase.from('v_entries_public').select().eq('event_id', id);
  return data ?? [];
});*/

import Spinner from "@/components/ui/spinner";
import { getEvent } from "@/utils/sanity/queries";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export default async function EventEntriesPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const event = await getEvent(slug);

  if (event === null || event.status === 'internal') {
    notFound();
  }

  const entries = await getEntries(event._id);

  /*const event = base64.decode<Event>(useSearchParams()?.get('q') ?? '')

  const routePath = usePathname()?.split('/');
  const event_id = routePath?.[3];

  const [state, setState] = useState<State>({
    entries: [],
    items: [],
  });

  useEffect(() => {
    if (!event_id) redirect('/');

    console.log(event_id);
    fetchEntries(event_id)
      .then(entries => setState(state => ({ ...state, entries, items: entries })))
      .catch(() => {
        setState(state => ({ ...state, entries: [], items: [] }));
        redirect('/');
      });
  }, [event_id]);


  const filterEntries = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const filtered = state.entries.filter(entry => entry.last_name.toLowerCase().includes(e.target.value.toLowerCase()));
    setState({ ...state, items: filtered });
  }
  */

  return (
    <Suspense fallback={<Spinner />}>

      <section className="page">
        <div className=" text-xs">
          <Link href={`/events/${slug}`}>
            <span className="link">{event.name}</span>
          </Link>
          <span className="ml-1">/ iscrizioni</span>
        </div>
        <div className="mt-8">
          <h3 className="font-unbounded text-2xl font-semibold uppercase">Iscritti <span className="text-gray-600 font-normal">({entries.length})</span></h3>
          {(event?.edition && event?.name) && <h1 className="title mt-3">{event.edition}° {event.name}</h1>}
        </div>

        {!!entries.length &&
          <div className="mt-8">

            <table className="text-sm">
              <thead>
                <tr>
                  <td className="pr-10 border-b py-2">COGNOME</td>
                  <td className="pr-10 border-b py-2">NOME</td>
                  <td className="pr-10 border-b py-2">ANNO</td>
                  <td className="pr-10 border-b py-2">SESSO</td>
                  <td className="pr-10 border-b py-2">TEAM</td>
                </tr>
              </thead>
              <tbody>
                {entries.map((entry, index) =>
                  <tr key={index} className="border-b">
                    <td className="pr-10 py-2 whitespace-nowrap">{entry.last_name}</td>
                    <td className="pr-10 py-2 whitespace-nowrap">{entry.first_name}</td>
                    <td className="pr-10 py-2">{entry.birth_year}</td>
                    <td className="pr-10 py-2">{entry.gender}</td>
                    <td className="pr-10 py-2">{entry.club}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        }


      </section>

    </Suspense>
  )
}

const getEntries = async (id: string) => {
  const supabase = await createClient();

  const { data } = await supabase
    .from('v_entries_public')
    .select()
    .eq('event_id', id);

  return data ?? [];
};
