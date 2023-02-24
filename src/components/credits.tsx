import Image from 'next/image'
import classNames from 'classnames'

import lncLife from 'public/images/credits/lnc-life.svg'
import alaMedical from 'public/images/credits/ala-medical.png'
import officinaFiorelli from 'public/images/credits/officina-fiorelli.png'
import patagonia from 'public/images/credits/patagonia.png'
import matFood from 'public/images/credits/mat-food.png'
import birrificioValtellinese from 'public/images/credits/birrificio-valtellinese.png'

const sponsors = [
  {
    name: 'Mat Food',
    logo: matFood,
    height: 70,
    url: 'http//www.mat-food.it',
  }, {
    name: 'Birrificio Valtellinese',
    logo: birrificioValtellinese,
    height: 60,
    url: 'https://www.birrificiovaltellinese.com'
  }, {
    name: 'Lnc Life',
    logo: lncLife,
    height: 40,
    url: 'https://www.lnclife.it'
  }, {
    name: 'Ala Medical',
    logo: alaMedical,
    height: 60,
    url: 'https://www.alamedicalspa.com'
  }, {
    name: 'Patagonia',
    logo: patagonia,
    height: 60,
    url: 'https://www.facebook.com/3passipatagonia'
  }, {
    name: 'Officina Fiorelli',
    logo: officinaFiorelli,
    height: 50,
    url: 'https://www.facebook.com/people/Officina-Autorizzata-Ford-di-Fiorelli-Matteo/100066566109924'
  },
]

import alpiniAlbaredo from 'public/images/credits/alpini-albaredo.webp'
import teamValtellina from 'public/images/credits/team-valtellina.webp'
import sportRaceValtellina from 'public/images/credits/sport-race-valtellina.webp'
import prolocoGerola from 'public/images/credits/proloco-gerola.png'
import prolocoBema from 'public/images/credits/proloco-bema.jpg'
import insiemePerSacco from 'public/images/credits/insieme-per-sacco.webp'
import gpTalamona from 'public/images/credits/gruppo-podistico-talamona.webp'
import tiroAllaFuneValtellina from 'public/images/credits/tiro-alla-fune-valtellina.webp'

const supporters = [
  {
    name: 'Alpini Albaredo',
    logo: alpiniAlbaredo,
    height: 60,
    url: 'https://www.facebook.com/profile.php?id=100069494139787',
  }, {
    name: 'Team Valtellina',
    logo: teamValtellina,
    height: 60,
    url: 'https://teamvaltellina.com'
  }, {
    name: 'Sport Race Valtellina',
    logo: sportRaceValtellina,
    height: 60,
    url: 'https://www.facebook.com/SportRaceValtellina/',
  }, {
    name: 'Pro Loco Gerola',
    logo: prolocoGerola,
    height: 60,
    url: 'https://www.facebook.com/ProLocoGerola'
  }, {
    name: 'Pro Loco Bema',
    logo: prolocoBema,
    height: 60,
    url: 'https://www.prolocobema.it'
  }, {
    name: 'Insieme per Sacco',
    logo: insiemePerSacco,
    height: 60,
    url: 'https://www.insiemepersacco.it'
  }, {
    name: 'Gruppo Podistico Talamona',
    logo: gpTalamona,
    height: 60,
    url: 'https://www.facebook.com/g.p.talamona'
  }, {
    name: 'Tiro alla Fune Valtellina',
    logo: tiroAllaFuneValtellina,
    height:60,
    url: 'https://www.facebook.com/tiroallafuneValtellina'
  },
]

import sportDiMontagna from 'public/images/credits/sportdimontagna.webp'
import fotorunValtellina from 'public/images/credits/fotorun-valtellina.png'
import speedtime from 'public/images/credits/speedtime.png'
import centroValle from 'public/images/credits/centro-valle-netweek.webp'
import laProvinciadiSondrio from 'public/images/credits/la-provincia-sondrio.svg'

const partners = [
  {
    name: 'Sport di Montagna',
    logo: sportDiMontagna,
    height: 60,
    url: 'https://www.sportdimontagna.com',
  }, {
    name: 'Fotorun Valtellina',
    logo: fotorunValtellina,
    height: 70,
    url: 'https://www.facebook.com/FOTORUN.valtellina'
  }, {
    name: 'Speed Time Production',
    logo: speedtime,
    height: 50,
    url: 'https://www.facebook.com/speedtimeproduction'
  },
]

const media = [
  {
    name: 'Centrovalle',
    logo: centroValle,
    height: 50,
    url: 'https://netweek.it/testate/giornale-di-sondrio-centro-valle/',
  }, {
    name: 'La Provincia di Sondrio',
    logo: laProvinciadiSondrio,
    height: 20,
    url: 'https://www.laprovinciadisondrio.it'
  },
]

export default function Credits({ className }: { className: string }) {
  return (
    <section className={classNames(className, "text-center mx-4 space-y-8")}>
      <div className="py-4">
        <h3 className="subtitle">Sponsor</h3>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center items-center mt-4 lg:mt-8">
          { sponsors.map((item, index) =>
            <a href={item.url} key={index}>
              <Image src={item.logo} height={item.height} alt={item.name} />
            </a>
          )}
        </div>
      </div>

      <div className="py-4">
        <h3 className="subtitle">Supporter</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center items-center mt-4 lg:mt-8">
          { supporters.map((item, index) =>
            <a href={item.url} key={index}>
              <Image src={item.logo} height={item.height} alt={item.name} />
            </a>
          )}
        </div>
      </div>

      <div className="py-4">
        <h3 className="subtitle">Media partner</h3>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 justify-items-center items-center mt-4 lg:mt-8">
          { partners.map((item, index) =>
            <a href={item.url} key={index}>
              <Image src={item.logo} height={item.height} alt={item.name} />
            </a>
          )}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 justify-items-center items-center mt-4 lg:mt-8">
          { media.map((item, index) =>
            <a href={item.url} key={index}>
              <Image src={item.logo} height={item.height} alt={item.name} />
            </a>
          )}
        </div>
      </div>
    </section>
  )
}
