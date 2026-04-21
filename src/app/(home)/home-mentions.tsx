'use client'

import { ScrollAnimation } from '@/components/animations/scroll-animation'
import { MentionItem } from '@/types/sanity'
import clsx from 'clsx'
import { useEffect, useState } from 'react'

type Props = {
  mentions?: MentionItem[]
  className?: string
}

export default function HomeMentions({ mentions, className }: { mentions: MentionItem[], className?: string }) {
  const [mention, setMention] = useState<MentionItem | undefined>()

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
    <ScrollAnimation animation="zoom">
      <div className={clsx("min-h-48 m-auto", className)}>
        {!!mention &&
          <div className="flex flex-col items-center pt-32 pb-8 lg:pb-16">
            <p className="text-lg text-center italic">{mention.text}</p>
            {mention?.url
              ? <a href={mention.url} target="_blank" className="mt-2 font-semibold">{mention.name}</a>
              : <span className="mt-2 font-semibold">{mention.name}</span>
            }
          </div>
        }
      </div>
    </ScrollAnimation>
  )
}
