'use client'

import { useEffect, useState } from 'react'

type Mention = {
  text: string
  source: string
  url?: string
}

const mentions: Mention[] = [
  {
    text: 'Gara stupenda con panorami mozzafiato. Organizzazione perfetta. Da rifare assolutamente!',
    source: 'Antonio',
  },
  {
    text: 'Una realtà di volontari che riesce a creare qualcosa di meraviglioso',
    source: 'Elisa',
  },
  {
    text: 'Edizione numero 4 da record per la CechUp con nuovo record di presenze e nuovi primati cronometrici sul percorso',
    source: 'Sportdimontagna',
    url: 'https://www.sportdimontagna.com/mountain-running/goinup-2025-2'
  },
]

export default function HomeMentions() {
  const [mention, setMention] = useState<Mention | undefined>()

  useEffect(() => {
    setRandomMention()

    const interval = setInterval(() => setRandomMention(), 15000)
    return () => clearInterval(interval)
  }, [])

  const setRandomMention = () => {
    const randomIndex = Math.floor(Math.random() * mentions.length)
    setMention(mentions[randomIndex])
  }

  return (
    <div className="min-h-55 flex items-center">
      {!!mention &&
        <div className="content flex flex-col items-center py-16">
          <p className=" text-lg italic ">{mention.text}</p>
          {mention?.url
            ? <a href={mention.url} target="_blank" className="mt-2 font-semibold">{mention.source}</a>
            : <span className="mt-2 font-semibold">{mention.source}</span>
          }
        </div>
      }
    </div>
  )
}
