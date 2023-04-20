import { Unbounded, Inter, Roboto_Mono, Poppins } from 'next/font/google';

export const unbounded = Unbounded({
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-unbounded',
});

const poppins = Poppins({
  variable: '--font-poppins',
  subsets: ['latin'],
  weight: ['400'],
});

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

const roboto_mono = Roboto_Mono({
  variable: '--font-roboto-mono',
  subsets: ['latin'],
});

export const fonts = [unbounded, poppins];
