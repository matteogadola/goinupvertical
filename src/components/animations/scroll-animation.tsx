"use client";

import { motion, Variants } from "framer-motion";

// Definiamo i tipi di animazione disponibili
export type AnimationType = "fade-up" | "slide-left" | "slide-right" | "zoom" | "flip" | "rotate";

interface ScrollAnimationProps {
  children: React.ReactNode;
  width?: "fit-content" | "100%";
  delay?: number;
  duration?: number;
  animation?: AnimationType; // Nuova prop
}

export function ScrollAnimation({ 
  children, 
  //width = "fit-content",
  width = "100%",
  delay = 0, 
  duration = 0.5,
  animation = "fade-up" // Default
}: ScrollAnimationProps) {

  // Definiamo le varianti (Best Practice per organizzare le animazioni)
  const variants: Record<AnimationType, Variants> = {
    "fade-up": {
      hidden: { opacity: 0, y: 75 },
      visible: { opacity: 1, y: 0 },
    },
    "slide-left": {
      hidden: { opacity: 0, x: -100 },
      visible: { opacity: 1, x: 0 },
    },
    "slide-right": {
      hidden: { opacity: 0, x: 100 },
      visible: { opacity: 1, x: 0 },
    },
    "zoom": {
      hidden: { opacity: 0, scale: 0.8 },
      visible: { opacity: 1, scale: 1 },
    },
    "flip": {
      hidden: { opacity: 0, rotateX: 90 },
      visible: { opacity: 1, rotateX: 0 },
    },
    "rotate": {
      hidden: { opacity: 0, rotate: -15, scale: 0.8 },
      visible: { opacity: 1, rotate: 0, scale: 1 },
    }
  };

  return (
    <motion.div
      // Colleghiamo lo stato iniziale e finale alle varianti
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={variants[animation]} // Selezioniamo l'animazione specifica
      
      transition={{ duration, delay, ease: "easeOut" }}
      style={{ width }}
    >
      {children}
    </motion.div>
  );
}