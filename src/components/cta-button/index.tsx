'use client';

import React from 'react';
import { motion } from 'framer-motion';

export const CtaButton = () => {

  const handleScroll = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault(); // Preveniamo il comportamento default del link se fosse un <a>

    const href = "upcoming-events"; // L'ID della sezione target
    const elem = document.getElementById(href);

    // Fallback sicuro se l'elemento esiste
    if (elem) {
      elem.scrollIntoView({
        behavior: 'smooth',
        block: 'start' // Allinea l'inizio dell'elemento con la vista
      });
    }
  };

  return (
    <motion.button
      onClick={handleScroll}
      // --- Framer Motion Animations ---
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      // -------------------------------
      className="rounded-full cursor-pointer bg-accent px-8 py-4 text-lg font-bold shadow-lg hover:bg-yellow-300 transition-colors"
    >
      Iscriviti alle prossime gare
      <span className="ml-2">↓</span>
    </motion.button>
  );
};