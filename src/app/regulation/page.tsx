import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

export default function RegulationPage() {
  return (
    <div className="mt-4 mx-6">
      <h1 className="title">Regolamento generale</h1>

      <section className="grid grid-flow-row gap-4 mt-4 ">
        <article>
          <h3 className="font-semibold">Art. 1</h3>
          <p>Insieme per Sacco, Pro Loco Bema, Pro Loco Gerola, Gruppo Alpini Albaredo, Sport Race Valtellina, Team Valtellina e Gp Talamona organizzano il 4° GOinUP, circuito di Vertical a finalità benefica.</p>
        </article>

        <article>
          <h3 className="font-semibold">Art. 2</h3>
          <p>GOinUP ha finalità benefica, con una quota degli introiti dalle iscrizioni e dalle donazioni volontarie, si pone come obbiettivo quello di donare delle attrezzature e/o servizi all&apos;associazione: VALTELLINA ACCESSIBILE DAPPERTUTTO.</p>
        </article>

        <article>
          <h3 className="font-semibold">Art. 3</h3>
          Le Manifestazione del Circuito per l&apos;edizione 2022 saranno:
          <ul>
            <li>- 25 Maggio 2022 - 4^ Larg-Up  (Cosio Valtellino/Regoledo - Sacco)</li>
            <li>- 8 Giugno 2022 - 3^ LAVE&apos;nsù  (Gerola Alta - Laveggiolo)</li>
            <li>- 29 Giugno 2022 - 3^ Vertical Egùl  (Albaredo-Egolo)</li>
            <li>- 13 Luglio 2022 - 3° Kurt-Up  (Mellarolo  -Rif. La Corte)</li>
            <li>- 27 Luglio 2022 - 3° Vertical Lino (Ponte Bitto - Bema)</li>
            <li>- 7 Settembre 2022 - 8^ Colmen Vertical (Morbegno/Desco - Cima Colmen)</li>
            <li>- 21 Settembre 2022 - 4^ Roncaiola Vertical (Talamona - Alpini)</li>
            <li>- 12 Ottobre 2022 - 6^ Arz-Up (Morbegno - Arzo)</li>
          </ul>
          In caso di maltempo rinvio alla sera successiva e svolgimento della prova anche con il cattivo tempo.
        </article>

        <article>
          <h3 className="font-semibold">Art. 4</h3>
          <p>La premiazione del circuito avrà luogo Venerdì 14 Ottobre 2022, presso il polifunzionale di Bema.</p>
        </article>

        <article>
          <h3 className="font-semibold">Art. 5</h3>
          <p>Le iscrizioni ad ogni prova andranno effettuate con tempi e modalità indicate da ogni organizzazione. La quota di iscrizione per ogni singola prova sarà di € 10,00 (di cui € 3,00 versati in beneficienza) e andrà obbligatoriamente versata all&apos;atto dell&apos;iscrizione, come specificato dai regolamenti di ogni prova. Sarà comunque possibile iscriversi anche al ritiro pettorale alla quota di € 15,00 (di cui € 8,00 versati in beneficienza).
In caso di impossibilità a partecipare alla gara l&apos;intera quota versata in pre-iscrizione andrà in beneficienza.
In caso di rinvio, atleta iscritto e pagante che non può partecipare, la sua quota va in beneficienza.</p>
        </article>

        <article>
          <h3 className="font-semibold">Art. 6</h3>
          <p>Per la partecipazione al circuito è consigliata la visita medica sportiva sotto sforzo, ma non è obbligatoria. Anno di partecipazione minimo è il 2007.
Per entrare a far parte della classifica finale gli atleti dovranno aver partecipato ad almeno 5 prove su 8, verranno considerati un massimo di 6 migliori risultati, mentre verranno scartati gli altri eventuali peggiori risultati. Saranno stilate classifiche uniche individuali per le categorie Femminile e Maschile, il punteggio assegnato sarà di 200 punti al 1° classificato di ogni prova, 199 punti al 2°, 198 al 3° e così via fino all&apos;ultimo classificato. Vincerà il circuito chi avrà totalizzato il punteggio più alto. In caso di “ex aequo” verrà considerato il miglior risultato e successivamente verrà considerata la sommatoria dei tempi della gare considerate nella classifica finale.</p>
        </article>

        <article>
          <h3 className="font-semibold">Art. 7</h3>
          Sulla base della classifica finale verranno premiati nella prova conclusiva:
          <ul>
            <li>- Primi 5 Femminili Assoluti con Premi in natura;</li>
            <li>- Primi 5 Maschile Assoluti con Premi in natura;</li>
            <li>- Primi 3 Master 40 (1982/1973) Maschile e Femminile con Premi in natura;</li>
            <li>- Primi 3 Master 50 (1972 e precedenti) Maschile e Femminile con Premi in natura;</li>
            <li>- Primi 3 Categoria Under18 (2007/2006/2005) Maschile e Femminile con Premi in natura;</li>
            <li>- Premi ad estrazione</li>
            <li>- Gadget fedeltà a chi avrà concluso tutte le 8 prove</li>
          </ul>
          NB: I premi di categoria con la classifica assoluta non sono cumulativi.
        </article>

        <article>
          <h3 className="font-semibold">Art. 8</h3>
          <p>Oltre al presente regolamento, ogni prova ne avrà uno proprio.</p>
        </article>
      </section>
    </div>
  )
}
