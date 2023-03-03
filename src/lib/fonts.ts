import { Unbounded, Inter, Roboto_Mono, Poppins } from 'next/font/google';

export const unbounded = Unbounded({
  variable: '--font-unbounded',
  subsets: ['latin'],
});

const poppins = Poppins({
  variable: '--font-poppins',
  weight: ['400'],
});

const inter = Inter({
  variable: '--font-inter',
});

const roboto_mono = Roboto_Mono({
  variable: '--font-roboto-mono',
});

export const fonts = [unbounded, poppins];
