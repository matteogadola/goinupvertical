import clsx from 'clsx'

const sponsors = [
  {
    name: 'Bper',
    logo: 'bper.svg',
    className: 'h-26',
    url: 'https://www.bper.it'
  }, {
    name: 'Latteria Sociale Valtellina',
    logo: 'latteria-valtellina.webp',
    className: 'h-20',
    url: 'https://www.latteriavaltellina.it'
  }, {
    name: 'Siderval',
    logo: 'siderval.webp',
    className: 'h-12',
    url: 'https://www.siderval.com'
  }, {
    name: 'Avis',
    logo: 'avis.webp',
    className: 'h-18',
    url: 'https://www.avis.it/it'
  }, {
    name: 'Vam Sport',
    logo: 'vam-sport.webp',
    className: 'h-14',
    url: 'https://vamsport.it'
  },  {
    name: 'Officina Fiorelli',
    logo: 'officina-fiorelli.png',
    className: 'h-11',
    url: 'https://www.facebook.com/people/Officina-Autorizzata-Ford-di-Fiorelli-Matteo/100066566109924'
  }, {
    name: 'Croma',
    logo: 'croma.webp',
    className: 'h-18',
    url: 'https://www.cromasrl.eu/'
  }, {
    name: 'Patagonia',
    logo: 'patagonia-1.png',
    className: 'h-18',
    url: 'https://www.facebook.com/3passipatagonia'
  }, {
    name: 'Leon',
    logo: 'leon.webp',
    className: 'h-14',
    url: 'https://www.leonbellessere.com'
  }, {
    name: 'eRemind',
    logo: 'eremind.webp',
    className: 'h-16',
    url: 'https://www.linkedin.com/company/eremind'
  }, {
    name: 'Mobili Rumi',
    logo: 'mobili-rumi.webp',
    className: 'h-18',
    url: 'https://www.mobilirumi.it'
  }, {
    name: 'Ambrosini e Rossatti',
    logo: 'ambronisierossatti.webp',
    className: 'h-16',
    url: 'https://www.facebook.com/p/Ambrosini-Rossatti-100068618457333'
  }, {
    name: 'Mat Food',
    logo: 'mat-food.png',
    className: 'h-20',
    url: 'http//www.mat-food.it',
  }, {
    name: 'Peretti',
    logo: 'peretti.webp',
    className: 'h-18',
    url: 'https://www.onoranzefunebriperetti.it',
  }, 
]

const supporters = [
  {
    name: 'Team Valtellina',
    logo: 'team-valtellina.webp',
    className: 'h-14',
    url: 'https://teamvaltellina.com'
  }, {
    name: 'Sport Race Valtellina',
    logo: 'sport-race-valtellina.webp',
    className: 'h-16',
    url: 'https://www.facebook.com/SportRaceValtellina/',
  }, {
    name: 'La voce di Daniele',
    logo: 'voce-di-daniele.png',
    className: 'h-14',
  }, {
    name: 'Pro Loco Bema',
    logo: 'proloco-bema.jpg',
    className: 'h-14',
    url: 'https://www.prolocobema.it'
  }, {
    name: 'K2 Valtellina',
    logo: 'k2v.png',
    className: 'h-14',
    url: 'https://www.k2valtellina.it/'
  }, {
    name: 'Alpini Cercino',
    logo: 'alpini-cercino.webp',
    className: 'h-18',
    url: 'https://www.anavaltellinese.it/i-nostri-gruppi/cercino'
  }, {
    name: 'Visit Albaredo',
    logo: 'albaredo-promotion.webp',
    className: 'h-16',
    url: 'https://www.visitalbaredo.it'
  }, {
    name: 'Pro Loco Gerola',
    logo: 'proloco-gerola.png',
    className: 'h-16',
    url: 'https://www.facebook.com/ProLocoGerola'
  }, {
    name: 'Consorzio Traona',
    logo: 'consorzio-prati-bioggio.webp',
    className: 'h-14',
  },
]

const partners = [
  {
    name: 'Sport di Montagna',
    logo: 'sportdimontagna.webp',
    className: 'h-18',
    url: 'https://www.sportdimontagna.com',
  }, {
    name: 'Centrovalle',
    logo: 'centro-valle-netweek.webp',
    className: 'h-16',
    url: 'https://netweek.it/testate/giornale-di-sondrio-centro-valle/',
  }, {
    name: 'Radio Tsn',
    logo: 'radio-tsn.webp',
    className: 'h-12',
    url: 'https://radiotsn.tv/'
  }, {
    name: 'La Provincia di Sondrio',
    logo: 'la-provincia-unica.webp',
    className: 'h-12',
    url: 'https://www.laprovinciadisondrio.it'
  }, {
    name: 'Speed Time Production',
    logo: 'speedtime.png',
    className: 'h-12',
    url: 'https://www.facebook.com/speedtimeproduction'
  }, {
    name: 'Fotorun Valtellina',
    logo: 'fotorun-valtellina.png',
    className: 'h-20',
    url: 'https://www.facebook.com/FOTORUN.valtellina'
  }, {
    name: 'Andrea Mazzoni',
    logo: 'andrea-mazzoni.webp',
    className: 'h-18',
    url: 'https://mazzoniandrea.it/'
  },
]

export default function Credits({ className }: { className?: string }) {
  return (
    <section className={clsx(className, "text-center mx-4 space-y-8")}>
      <div className="py-4">
        <h3 className="title">Sponsor</h3>
        <div className="flex flex-wrap space-y-8 mt-8">
          {sponsors.map((item, index) =>
            <div key={index} className="flex grow w-1/2 lg:w-1/4 justify-center items-center h-18">
              <a href={item.url} target="_blank" rel="noopener noreferrer" className={clsx({ "col-span-2 lg:col-span-3": index === sponsors.length - 1 })}>
                <img src={`/images/credits/${item.logo}`} className={clsx(item.className, "object-contain hover:scale-105")} alt={item.name} />
              </a>
            </div>
          )}
        </div>
      </div>

      <div className="py-4">
        <h3 className="title">Supporter</h3>
        <div className="flex flex-wrap space-y-8 mt-8">
          {supporters.map((item, index) =>
            <div key={index} className="flex grow w-1/2 lg:w-1/4 justify-center items-center h-18">
              <a href={item.url} target="_blank" rel="noopener noreferrer" className={clsx({ "col-span-2 lg:col-span-3": index === sponsors.length - 1 })}>
                <img src={`/images/credits/${item.logo}`} className={clsx(item.className, "object-contain hover:scale-105")} alt={item.name} />
              </a>
            </div>
          )}
        </div>
      </div>

      <div className="py-4">
        <h3 className="title">Media partner</h3>
        <div className="flex flex-wrap space-y-8 mt-8">
          {partners.map((item, index) =>
            <div key={index} className="flex grow w-1/2 lg:w-1/4 justify-center items-center h-18">
              <a href={item.url} target="_blank" rel="noopener noreferrer" className={clsx({ "col-span-2 lg:col-span-3": index === sponsors.length - 1 })}>
                <img src={`/images/credits/${item.logo}`} className={clsx(item.className, "object-contain hover:scale-105")} alt={item.name} />
              </a>
            </div>
          )}
        </div>
      </div>

      {/*<div className="py-4">
      <h3 className="overtitle">Sponsor</h3>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center items-center mt-4 lg:mt-8">
          { sponsors.map((item, index) =>
            <a href={item.url} key={index} target="_blank" rel="noopener noreferrer" className={classNames({"col-span-2 lg:col-span-3": index === sponsors.length -1 })}>
              <Image src={item.logo} height={item.height} alt={item.name} />
            </a>
          )}
        </div>
      </div>

      <div className="py-4">
        <h3 className="overtitle">Supporter</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center items-center mt-4 lg:mt-8">
          { supporters.map((item, index) =>
            <a href={item.url} key={index}>
              <Image src={item.logo} height={item.height} alt={item.name} />
            </a>
          )}
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center items-center mt-4 lg:mt-8">
          { supporters2.map((item, index) =>
            <a href={item.url} key={index}>
              <Image src={item.logo} height={item.height} alt={item.name} />
            </a>
          )}
        </div>
      </div>

      <div className="py-4">
        <h3 className="overtitle">Media partner</h3>
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
      </div>*/}
    </section>
  )
}
