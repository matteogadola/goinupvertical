'use client';

import { createContext, useContext, ReactNode, useRef } from 'react';
import { useScroll, SpringValue } from '@react-spring/web';

const ScrollContext = createContext<SpringValue<number> | null>(null);

export function ScrollProvider({ children }: Readonly<{ children: ReactNode }>) {
  const { scrollY } = useScroll();

  return (
    <ScrollContext.Provider value={scrollY}>
      {children}
    </ScrollContext.Provider>
  );
}

export function useGlobalScroll() {
  const context = useContext(ScrollContext);
  if (!context) {
    throw new Error("useGlobalScroll deve essere usato dentro un ScrollProvider");
  }
  return context;
}