import localFont from 'next/font/local'
import { Unbounded, Inter, Roboto_Mono, Poppins } from 'next/font/google'

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

export const fonts = [unbounded, poppins, matroska]
