'use client';

import { Suspense, useEffect, useState } from 'react'
import { dt } from '@/lib/date'

import classNames from 'classnames'
import Spinner from '@/components/spinner'
import DownloadCsv from './download-csv'
import { createClient } from '@/lib/supabase-auth-client'
import { Event } from '@/types/events';
import { sendConfirmationMail } from '@/lib/mail';
import { PlusIcon } from '@/app/components/icons';
import EntryDialog from './entry-dialog';

const supabase = createClient();

type Props = {
  className?: string;
  entries: any[];
  items: any[];
  event: Event;
}

interface State {
  entries: any[];
  items: any[];
  isDialogOpen: boolean;
  selectedEntry: any | undefined;
}

export default function EntriesList({ entries, items, event, className }: Props) {

  const [state, setState] = useState<State>({
    entries,
    items: entries,
    isDialogOpen: false,
    selectedEntry: undefined
  });

  useEffect(() => setState({ ...state, entries, items: entries }), [entries]);

  const setPaymentStatus = async (orderId: number, status: string) => {
    const { data, error } = await supabase.from('orders').update({ payment_status: status }).eq('id', orderId);

    if (!error) {
      const index = state.items.findIndex(item => item.order_id === orderId);

      if (index >= 0) {
        const newItems = [...state.items];
        newItems.splice(index, 1, { ...newItems[index], payment_status: status });
        setState({ ...state, entries: newItems, items: newItems })
      }
    }
    return data;
  }

  const filterEntries = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const filtered = state.entries.filter(entry => entry.last_name.toLowerCase().includes(e.target.value.toLowerCase()));
    setState({ ...state, items: filtered });
  }

  const onCreate = () => {
    setState({ ...state, isDialogOpen: true, selectedEntry: undefined })
  }

  const closeDialog = () => {
    setState({ ...state, isDialogOpen: false, selectedEntry: undefined })
  }

  // rinomina...
  const addEntry = (entry: any) => {
    // andrebbe aggiunto in ordine?
    const newEntries = [...state.entries];
    newEntries.unshift(entry);

    setState({ ...state, isDialogOpen: false, entries: newEntries, items: newEntries });
  }

  return (
    <Suspense fallback={<Spinner />}>
      {state.isDialogOpen && <EntryDialog event={event} items={items} onEntryCreated={addEntry} onClose={closeDialog} />}

      <section className={classNames(className, "")}>
        <div className="flex items-center space-x-4">
          <h3 className="overtitle">Iscritti <span className="text-gray-600 font-normal">({state.entries?.length})</span></h3>
          {dt().isBefore(event.date) && <button onClick={onCreate} className="button-icon"><PlusIcon /></button>}
        </div>

        {!!state.items?.length &&
          <div>
            <DownloadCsv data={state.entries} name={event.id} className="mt-2" />

            <div className="mt-4">
              <input type="text" className="appearance-none bg-transparent border-b focus:outline-none" placeholder="Cognome" onChange={(e) => filterEntries(e)} />
            </div>

            <div className="mt-4">

              <table className="text-sm">
                <thead>
                  <tr>
                    <td className="pr-5 border-b py-2">ORDINE</td>
                    <td className="pr-10 border-b py-2">ISCRIZIONE</td>
                    <td className="pr-10 border-b py-2">DATA</td>
                    <td className="pr-10 border-b py-2">METODO</td>
                    <td className="pr-10 border-b py-2">STATO</td>
                    <td className="pr-10 border-b py-2">COGNOME</td>
                    <td className="pr-10 border-b py-2">NOME</td>
                    <td className="pr-10 border-b py-2">ANNO</td>
                    <td className="pr-10 border-b py-2">SESSO</td>
                    <td className="pr-10 border-b py-2">TEAM</td>
                    <td className="pr-10 border-b py-2"></td>
                  </tr>
                </thead>
                <tbody>
                  {state.items.map((entry, index) =>
                    <tr key={index} className="border-b">
                      <td className="pr-5 py-2">{entry.order_id}</td>
                      <td className="pr-10 py-2">{entry.category}</td>
                      <td className="pr-10 py-2 whitespace-nowrap">{dt(entry.date).format('DD-MM-YY')}</td>
                      <td className="pr-10 py-2">{entry.payment_method}</td>
                      <td className="pr-10 py-2">{entry.payment_status}</td>
                      <td className="pr-10 py-2 whitespace-nowrap">{entry.last_name}</td>
                      <td className="pr-10 py-2 whitespace-nowrap">{entry.first_name}</td>
                      <td className="pr-10 py-2">{entry.birth_year}</td>
                      <td className="pr-10 py-2">{entry.gender}</td>
                      <td className="pr-10 py-2">{entry.team}</td>
                      {(entry.payment_method === 'cash' && entry.payment_status === 'pending') &&
                        <td className="pr-10 py-2 whitespace-nowrap"><button className="text-button hover:opacity-70" onClick={() => setPaymentStatus(entry.order_id, 'paid')}>CONFERMA PAGAMENTO</button></td>
                      }
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        }
      </section>
    </Suspense>
  )
}
