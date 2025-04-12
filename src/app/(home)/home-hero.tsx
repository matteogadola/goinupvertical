'use client'

import { CSSProperties, useEffect, useState } from 'react'

const images: string[] = [
  'hero-1.webp',
  'hero-2.webp'
]

export default function HomeHero() {
  const [image, setImage] = useState<string>('hero-1.webp')

  useEffect(() => {
    setRandomImage()
  }, [])

  const setRandomImage = () => {
    const randomIndex = Math.floor(Math.random() * images.length)
    setImage(images[randomIndex])
  }

  return (
    <div className="hero" >
    </div>
  );
}
//style={getBackgroudStyle(image)}
function getBackgroudStyle(image: string): CSSProperties {
  const url = `/images/homepage/${image}`

  return { background: `url("${url}") no-repeat center center` } as CSSProperties
}
