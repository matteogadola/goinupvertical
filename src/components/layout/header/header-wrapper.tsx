'use client';

import { animated } from '@react-spring/web';
import { useGlobalScroll } from '@/contexts/scroll-context';

interface HeaderWrapperProps {
  children: React.ReactNode;
  threshold?: number; // A quanti pixel deve diventare completamente bianco
}

export function HeaderWrapper({ children, threshold = 200 }: Readonly<HeaderWrapperProps>) {
  const scrollY = useGlobalScroll();

  // Creo la logica di interpolazione
  // Da 0px a 'threshold'px -> Da Trasparente a Bianco Opaco
  // 
  const backgroundColor = scrollY.to(
    [0, threshold],
    ["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 1)"]
  );

  // --tw-shadow: 0 10px 15px -3px var(--tw-shadow-color, rgb(0 0 0 / 0.1)), 0 4px 6px -4px var(--tw-shadow-color, rgb(0 0 0 / 0.1));
  // box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);
  const boxShadow = scrollY.to(
    [0, threshold],
    [
      // START (Scroll 0): Stessa struttura, ma alpha = 0
      "0 10px 15px -3px rgba(0, 0, 0, 0), 0 4px 6px -4px rgba(0, 0, 0, 0)",
      
      // END (Scroll Threshold): Valori richiesti con alpha = 0.1
      "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)"
    ]
  );

  return (
    <animated.div style={{ backgroundColor, boxShadow, height: '100%', width: '100%' }}>
      {children}
    </animated.div>
  );
}