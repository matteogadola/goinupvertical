// src/components/animations/FadeIn.tsx
"use client";

import { useSpring, animated } from "@react-spring/web";
import { useEffect, useRef, useState } from "react";

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;    // Ritardo opzionale (es. per effetto cascata)
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'; // Direzione ingresso
}

export function FadeIn({ children, delay = 0, direction = 'up' }: FadeInProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // 1. Logica di Intersezione (Capire se l'elemento è visibile)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Smetti di osservare una volta animato
        }
      },
      { threshold: 0.1 } // Scatta quando il 10% dell'elemento è visibile
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  // 2. Calcolo della posizione iniziale in base alla direzione
  const getInitialTransform = () => {
    switch (direction) {
      case 'up': return 'translate3d(0, 40px, 0)';
      case 'down': return 'translate3d(0, -40px, 0)';
      case 'left': return 'translate3d(40px, 0, 0)';
      case 'right': return 'translate3d(-40px, 0, 0)';
      default: return 'translate3d(0, 0, 0)';
    }
  };

  // 3. Configurazione React Spring
  const styles = useSpring({
    from: { opacity: 0, transform: getInitialTransform() },
    to: { 
      opacity: isVisible ? 1 : 0, 
      transform: isVisible ? 'translate3d(0, 0, 0)' : getInitialTransform() 
    },
    delay: delay,
    config: { mass: 1, tension: 120, friction: 14 }, // Fisica della molla
  });

  return (
    <div ref={ref}>
      <animated.div style={styles}>
        {children}
      </animated.div>
    </div>
  );
}