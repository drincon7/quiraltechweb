'use client';

import React, { useEffect, useLayoutEffect, useRef } from 'react';

interface BlurWrapperProps {
  children: React.ReactNode;
  blurHeight?: number;
  blurStrength?: number;
  sectionPairs?: number[][];
}

/**
 * Componente que crea efectos de desenfoque entre secciones con aparición inmediata
 */
const BlurWrapper: React.FC<BlurWrapperProps> = ({
  children,
  blurHeight = 300,
  blurStrength = 50,
  sectionPairs,
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const effectsCreatedRef = useRef<boolean>(false);
  
  // Función para crear los elementos de desenfoque
  const createBlurEffects = () => {
    if (!wrapperRef.current) return;
    
    // Limpiar efectos existentes
    document.querySelectorAll('.section-blur-effect').forEach(el => el.remove());
    
    // Obtener todas las secciones dentro del wrapper
    const sections = Array.from(wrapperRef.current?.querySelectorAll('section') || []);
    if (sections.length < 2) return;
    
    // Determinar qué pares de secciones conectar
    let pairsToConnect: number[][] = [];
    
    if (sectionPairs && sectionPairs.length > 0) {
      // Usar los pares especificados
      pairsToConnect = sectionPairs.filter(pair => 
        pair.length === 2 && 
        pair[0] >= 0 && pair[0] < sections.length &&
        pair[1] >= 0 && pair[1] < sections.length &&
        pair[0] !== pair[1]
      );
    } else {
      // Conectar todas las secciones consecutivas
      for (let i = 0; i < sections.length - 1; i++) {
        pairsToConnect.push([i, i + 1]);
      }
    }
    
    // Crear efectos de desenfoque para cada par
    pairsToConnect.forEach(pair => {
      const firstIndex = pair[0];
      const secondIndex = pair[1];
      
      const lowerIndex = Math.min(firstIndex, secondIndex);
      const higherIndex = Math.max(firstIndex, secondIndex);
      
      const currentSection = sections[lowerIndex] as HTMLElement;
      const nextSection = sections[higherIndex] as HTMLElement;
      
      // Obtener la posición de la unión entre secciones
      const currentRect = currentSection.getBoundingClientRect();
      
      // Crear el elemento de desenfoque
      const blurEffect = document.createElement('div');
      blurEffect.className = 'section-blur-effect';
      blurEffect.setAttribute('data-connect', `${lowerIndex}-${higherIndex}`);
      
      // Configurar el estilo
      Object.assign(blurEffect.style, {
        position: 'absolute',
        left: '0',
        right: '0',
        height: `${blurHeight}px`,
        top: `${currentRect.bottom - blurHeight / 2 + window.scrollY}px`,
        zIndex: '0',
        pointerEvents: 'none',
        backdropFilter: `blur(${blurStrength}px)`,
        WebkitBackdropFilter: `blur(${blurStrength}px)`,
        maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 20%, rgba(0,0,0,1) 80%, rgba(0,0,0,0) 100%)',
        WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 20%, rgba(0,0,0,1) 80%, rgba(0,0,0,0) 100%)',
        opacity: 0,
        transition: 'opacity 0.3s ease-in',
      });
      
      // Añadir al DOM
      document.body.appendChild(blurEffect);
      
      // Hacer visible con un pequeño retraso para permitir que se aplique el estilo
      requestAnimationFrame(() => {
        blurEffect.style.opacity = '1';
      });
    });
    
    effectsCreatedRef.current = true;
  };
  
  // Actualizar posiciones en scroll
  const updatePositions = () => {
    const sections = Array.from(wrapperRef.current?.querySelectorAll('section') || []);
    
    document.querySelectorAll('.section-blur-effect').forEach(el => {
      const connectAttr = el.getAttribute('data-connect');
      if (!connectAttr) return;
      
      const [lowerIndex, higherIndex] = connectAttr.split('-').map(Number);
      if (isNaN(lowerIndex) || isNaN(higherIndex)) return;
      
      if (lowerIndex >= 0 && lowerIndex < sections.length) {
        const currentSection = sections[lowerIndex] as HTMLElement;
        const currentRect = currentSection.getBoundingClientRect();
        
        (el as HTMLElement).style.top = 
          `${currentRect.bottom - blurHeight / 2 + window.scrollY}px`;
      }
    });
  };
  
  // useLayoutEffect se ejecuta sincrónicamente después de las mutaciones del DOM
  // pero antes de que el navegador pinte, lo que ayuda a prevenir parpadeos visuales
  useLayoutEffect(() => {
    // Crear efectos inmediatamente
    createBlurEffects();
    
    // Limpiar al desmontar
    return () => {
      document.querySelectorAll('.section-blur-effect').forEach(el => el.remove());
    };
  }, []);
  
  // useEffect para manejar eventos y actualizaciones posteriores
  useEffect(() => {
    // Si no se crearon los efectos en useLayoutEffect, intentarlo de nuevo
    if (!effectsCreatedRef.current) {
      createBlurEffects();
    }
    
    // Intentar de nuevo después de un breve retraso para asegurar que el DOM está completamente cargado
    const timeoutId = setTimeout(createBlurEffects, 100);
    
    // También actualizar cuando se cargue la página completamente
    window.addEventListener('load', createBlurEffects);
    
    // Actualizar en scroll y resize
    window.addEventListener('resize', createBlurEffects);
    window.addEventListener('scroll', updatePositions);
    
    // Limpiar
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('load', createBlurEffects);
      window.removeEventListener('resize', createBlurEffects);
      window.removeEventListener('scroll', updatePositions);
      document.querySelectorAll('.section-blur-effect').forEach(el => el.remove());
    };
  }, [blurHeight, blurStrength, sectionPairs]);
  
  return (
    <div ref={wrapperRef} className="blur-wrapper">
      {children}
    </div>
  );
};

export default BlurWrapper;