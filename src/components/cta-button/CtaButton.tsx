'use client';

import React from 'react';
import { motion } from 'framer-motion';
import styles from './CtaButton.module.css';
import clsx from 'clsx';

export interface Props {
  text: string;
  anchor: string;
  href?: string;
  onClick?: () => void;
  className?: string;
}

export const CtaButton = ({ text, anchor, href, onClick, className }: Readonly<Props>) => {

  const handleScroll = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    const elem = document.getElementById(anchor);
    if (elem) {
      elem.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <motion.button
      onClick={handleScroll}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className={clsx(styles['cta-button'], className)}
    >
      {text}
      <span>↓</span>
    </motion.button>
  );
};