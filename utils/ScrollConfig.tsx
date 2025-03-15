'use client';

import { useEffect } from 'react';
import { animate } from 'framer-motion';

export default function SmoothScrollConfig() {
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      
      if (!anchor) return;
      
      const href = anchor.getAttribute('href');
      if (!href || !href.startsWith('#')) return;
      
      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (!targetElement) return;
      
      e.preventDefault();
      
      // Usar Framer Motion para una animación más controlada
      const headerOffset = 80; // Ajusta esto según el tamaño de tu header
      const targetPosition = window.scrollY + targetElement.getBoundingClientRect().top - headerOffset;
      
      // Animación con Framer Motion para mayor control
      animate(window.scrollY, targetPosition, {
        duration: 0.6, // Duración en segundos
        ease: [0.16, 1, 0.3, 1], // Curva personalizada, más suave
        onUpdate: (value) => window.scrollTo(0, value),
        onComplete: () => {
          // Asegurarse de que el scroll termina en el punto exacto
          window.scrollTo({
            top: targetPosition,
            behavior: 'auto'
          });
          
          // Enfocar el elemento pero preservar el scroll
          const scrollPos = window.scrollY;
          targetElement.setAttribute('tabindex', '-1');
          targetElement.focus({ preventScroll: true });
          window.scrollTo(0, scrollPos);
        }
      });
    };
    
    document.addEventListener('click', handleAnchorClick);
    
    return () => {
      document.removeEventListener('click', handleAnchorClick);
    };
  }, []);
  
  return null;
}