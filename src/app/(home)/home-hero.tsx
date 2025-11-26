'use client'

import { Box, Button, Container, Stack, Title, Text } from '@mantine/core'
import { CSSProperties, useEffect, useState } from 'react'

type Props = {
  images?: string[]
  className?: string
}

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
    <Box
      h="100vh"
      style={getBackgroudStyle(image)}
          // Stile d'esempio per lo sfondo della Hero
          //style={{
          //  backgroundImage:
          //    "linear-gradient(to top, rgba(0,0,0,0.6), rgba(0,0,0,0.2)), url(https://www.fidal.it/upload/files/GGG/Immagini/AdobeStock_11266696-1.jpg)",
          //  backgroundSize: "cover",
          //  backgroundPosition: "center",
          //}}
    >
      
      <Container size="xl" h="100%">
        <Stack justify="center" h="100%" align="left">
          <Title order={1} c="white" fz={60} >
            GOinUP
          </Title>
          <Text c="gray.2" size="xl" ta="center" maw={600}>
            Circuito di 10 gare vertical di montagna a finalità benefica
          </Text>
        </Stack>
      </Container>
    </Box>
  );
}

function getBackgroudStyle(image: string): CSSProperties {
  const url = `/images/homepage/${image}`

  return {
    backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.0), rgba(0,0,0,0.0)), url("${url}")`,
    //backgroundImage: `url("${url}") no-repeat center center`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  }
}
