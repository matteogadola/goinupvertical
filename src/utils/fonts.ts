import localFont from 'next/font/local'
import { Unbounded, Inter, Roboto_Mono, Poppins, Archivo_Black } from 'next/font/google'

const matroska = localFont({
  src: '../../public/fonts/matroska/matroska.ttf',
  variable: '--font-matroska',
})

const unbounded = Unbounded({
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-unbounded',
})

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400'],
  variable: '--font-poppins',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const roboto_mono = Roboto_Mono({
  subsets: ['latin'],
  variable: '--font-roboto-mono',
})

const archivo = Archivo_Black({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-archivo',
})

export const fonts = [unbounded, poppins, matroska, archivo]
