import { GetServerSideProps, Metadata, NextPage } from 'next'
import DaEliminare from './da-eliminare';
import { decodeBase64 } from '@/utils/encoding';
import { notFound } from 'next/navigation';
import { createStripe } from '@/utils/stripe';

interface SearchParams {
  session_id: string;
  q: string;
}

interface Props {
  searchParams: Promise<Partial<SearchParams>>
}

const stripe = createStripe()

export default async function CheckoutConfirmPage({ searchParams }: Props) {
  const { session_id, q } = await searchParams

  if (session_id && typeof session_id === 'string') {
    try {
      const session = await stripe.checkout.sessions.retrieve(session_id, {
        expand: ['line_items.data.price.product'],
      })
      const items = session.line_items?.data ?? []

      return (
        <>
          <section>
            <span className="overtitle">Conferma</span>
            <h1 className="title mt-3">Ordine n. {session.metadata?.order_id}</h1>
            <div className="text mt-2">
              <table className="border border-slate-400 mt-8">
                <thead>
                  <tr className="bg-slate-200">
                    <td className="w-80 border-b py-2">Riferimento</td>
                    <td className="w-60 border-b py-2">Descrizione</td>
                    <td className="w-32 border-b py-2">Quantità</td>
                    <td className="w-32 border-b py-2">Prezzo</td>
                  </tr>
                </thead>
                <tbody>
                  {
                    items.map((item: any, index: any) =>
                      <tr key={index}>
                        <td className="py-2">{item.description}</td>
                        <td className="py-2">{item.price.product.description}</td>
                        <td className="py-2">{item.quantity}</td>
                        <td className="py-2">{item.amount_total / 100}€</td>
                      </tr>
                    )
                  }
                </tbody>
              </table>
    
              <p className="mt-8">A breve riceverai una mail con la conferma di pagamento.</p>
            </div>
          </section>
          <DaEliminare />
        </>
      )
    } catch (error) {
      console.error(error);

      return (
        <section>
          <span className="overtitle">Conferma</span>
          <div className="text mt-2">
            L&apos;iscrizione è stata completata con successo ma ci sono stati problemi nella generazione di questa pagina.<br />
            Riceverai a breve una mail di conferma.<br />
          </div>
        </section>
      )
    }
    
  } else if (q && typeof q === 'string') {
    const order = decodeBase64<any>(q);
    const totalAmount = order.items.reduce((a: number, v: any) => a + (v.quantity * v.price), 0);
    
    return (
      <>
        <section>
          <span className="overtitle">Conferma</span>
          <h1 className="title mt-3">Ordine n. {order.id}</h1>
          <div className="text mt-2">
            <table className="border border-slate-400 mt-8">
              <thead>
                <tr className="bg-slate-200">
                  <td className="w-80 border-b py-2">Riferimento</td>
                  <td className="w-60 border-b py-2">Descrizione</td>
                  <td className="w-32 border-b py-2">Quantità</td>
                  <td className="w-32 border-b py-2">Prezzo</td>
                </tr>
              </thead>
              <tbody>
                {
                  order.items.map((item: any, index: any) =>
                    <tr key={index}>
                      <td className="py-2">{item.name}</td>
                      <td className="py-2">{item.description}</td>
                      <td className="py-2">{item.quantity}</td>
                      <td className="py-2">{(item.quantity * item.price) / 100}€</td>
                    </tr>
                  )
                }
                <tr key={-1}>
                  <td colSpan={3} className="py-2">TOTALE</td>
                  <td className="py-2">{totalAmount / 100}€</td>
                </tr>
              </tbody>
            </table>
            
            {
              order.items[0]?.name === 'Iscrizione 1^ Vertical Frasnedo' &&
                <div className="mt-8">
                  <span>Si prega di inviare copia del certificato medico, prima della gara, via mail a iscrizioni@teamvaltellina.com oppure consegnarlo presso il negozio 3Passi Patagonia</span>
                </div>
            }
  
            <p className="mt-8">A breve riceverai una mail con {
              order.payment_method === 'sepa'
                ? 'le istruzioni per poter effettuare il bonifico'
                : order.payment_method === 'cash'
                  ? 'le istruzioni per poter effettuare il pagamento in contanti'
                  : order.payment_method === 'on-site'
                    ? 'la conferma dell\'ordine'
                    : 'la conferma di pagamento'
            }
              .</p>
          </div>
        </section>
        <DaEliminare />
      </>
    )
  }

  notFound();
}

export const metadata: Metadata = {
  title: 'Goinup | Conferma ordine',
}
