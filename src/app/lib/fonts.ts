import { Unbounded, Inter, Roboto_Mono, Poppins } from 'next/font/google';

export const unbounded = Unbounded({
  display: 'swap',
  subsets: ['latin'],
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400'],
});

const inter = Inter({
  subsets: ['latin'],
});

const roboto_mono = Roboto_Mono({
  subsets: ['latin'],
});

export const fonts = [unbounded, poppins];
