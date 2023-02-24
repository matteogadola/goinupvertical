import Image from 'next/image'

import lncLife from 'public/images/credits/lnc-life.svg'
import alaMedical from 'public/images/credits/ala-medical.png'
import officinaFiorelli from 'public/images/credits/officina-fiorelli.png'
import patagonia from 'public/images/credits/patagonia.png'

import alpiniAlbaredo from 'public/images/credits/alpini-albaredo.webp'
import teamValtellina from 'public/images/credits/team-valtellina.webp'
import sportRaceValtellina from 'public/images/credits/sport-race-valtellina.webp'
import prolocoGerola from 'public/images/credits/proloco-gerola.png'
import prolocoBema from 'public/images/credits/proloco-bema.jpg'
import insiemePerSacco from 'public/images/credits/insieme-per-sacco.webp'
import gpTalamona from 'public/images/credits/gruppo-podistico-talamona.webp'
import tiroAllaFuneValtellina from 'public/images/credits/tiro-alla-fune-valtellina.webp'

import sportDiMontagna from 'public/images/credits/sportdimontagna.webp'
import fotorunValtellina from 'public/images/credits/fotorun-valtellina.png'
import speedtime from 'public/images/credits/speedtime.png'
import centroValle from 'public/images/credits/centro-valle-netweek.webp'
import laProvinciadiSondrio from 'public/images/credits/la-provincia-sondrio.svg'
import classNames from 'classnames'

export default function Credits({ className }: { className: string }) {
  return (
    <section className={classNames(className, "text-center")}>
      <div className="mx-6 py-4">
        <h3 className="text-lg font-semibold uppercase">Sponsor</h3>
        <div className="grid grid-cols-4 md:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center items-center">
          <a href="https://www.lnclife.it">
            <Image src={lncLife} height={35} alt="Life" />
          </a>
          <a href="https://www.alamedicalspa.com">
            <Image src={alaMedical} height={60} alt="Ala Medical" />
          </a>
          <a href="https://www.facebook.com/people/Officina-Autorizzata-Ford-di-Fiorelli-Matteo/100066566109924">
            <Image src={officinaFiorelli} height={50} alt="Officina Fiorelli" />
          </a>
          <a href="https://www.facebook.com/3passipatagonia">
            <Image src={patagonia} height={50} alt="Patagonia" />
          </a>
        </div>
      </div>

      <div className="mx-6 py-4">
        <h3 className="text-lg font-semibold uppercase">Supporter</h3>
        <div className="grid grid-cols-4 md:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center items-center">
          <a href="https://www.facebook.com/profile.php?id=100069494139787">
            <Image src={alpiniAlbaredo} height={60} alt="Alpini Albaredo" />
          </a>
          <a href="https://teamvaltellina.com">
            <Image src={teamValtellina} height={60} alt="Team Valtellina" />
          </a>
          <a href="https://www.facebook.com/SportRaceValtellina/">
            <Image src={sportRaceValtellina} height={60} alt="Sport Race Valtellina" />
          </a>
          <a href="https://www.facebook.com/ProLocoGerola">
            <Image src={prolocoGerola} height={60} alt="Pro Loco Gerola" />
          </a>
          <a href="https://www.prolocobema.it">
            <Image src={prolocoBema} height={60} alt="Pro Loco Bema" />
          </a>
          <a href="https://www.insiemepersacco.it">
            <Image src={insiemePerSacco} height={60} alt="Insieme per Sacco" />
          </a>
          <a href="https://www.facebook.com/g.p.talamona">
            <Image src={gpTalamona} height={60} alt="Gruppo Podistico Talamona" />
          </a>
          <a href="https://www.facebook.com/tiroallafuneValtellina">
            <Image src={tiroAllaFuneValtellina} height={60} alt="Tiro alla Fune Valtellina" />
          </a>
        </div>
      </div>

      <div className="mx-6 py-4">
        <h3 className="text-lg font-semibold uppercase">Media partner</h3>
        <div className="grid grid-cols-3 md:grid-cols-1 lg:grid-cols-3 gap-8 justify-items-center items-center">
          <a href="https://www.sportdimontagna.com">
            <Image src={sportDiMontagna} height={50} alt="Sport di Montagna" />
          </a>
          <a href="https://www.facebook.com/FOTORUN.valtellina">
            <Image src={fotorunValtellina} height={60} alt="Fotorun Valtellina" />
          </a>
          <a href="https://www.facebook.com/speedtimeproduction">
            <Image src={speedtime} height={50} alt="Speed Time Production" />
          </a>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-8 pt-8 justify-items-center items-center">
          <a href="https://netweek.it/testate/giornale-di-sondrio-centro-valle/">
            <Image src={centroValle} height={40} alt="Centrovalle" />
          </a>
          <a href="https://www.laprovinciadisondrio.it">
            <Image src={laProvinciadiSondrio} height={20} alt="La Provincia di Sondrio" />
          </a>
        </div>
      </div>
    </section>
  )
}
