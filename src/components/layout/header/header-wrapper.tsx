'use client';

import { useUiStore } from "@/store/ui";
import { motion, useScroll, useTransform } from "framer-motion";

interface HeaderWrapperProps {
  children: React.ReactNode;
  threshold?: number; // A quanti pixel deve diventare completamente bianco
}

export function HeaderWrapper({ children, threshold = 800 }: Readonly<HeaderWrapperProps>) {
  const { sidenavOpened } = useUiStore()
  const { scrollY } = useScroll();

  const backgroundColor = useTransform(
    scrollY,
    [0, threshold],
    [sidenavOpened ? "var(--background)" : "rgba(255, 255, 255, 0)", "rgba(240, 238, 233, 1)"]
  );

  // RIVEDI
  //const color = useTransform(
  //  scrollY,
  //  [0, threshold],
  //  ["rgba(255, 255, 255, 1)", 'var(--primary)']
  //);

  const boxShadow = useTransform(
    scrollY,
    [0, threshold],
    [
      // START (0px): alpha = 0
      "0 10px 15px -3px rgba(0, 0, 0, 0), 0 4px 6px -4px rgba(0, 0, 0, 0)",
      // END (threshold): alpha = 0.1
      "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)"
    ]
  );

  return (
    <motion.div style={{ backgroundColor, boxShadow, height: '100%', width: '100%' }}>
      {children}
    </motion.div>
  );
}