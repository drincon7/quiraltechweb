'use client'

import { useState, useEffect } from 'react';

/**
 * Hook personalizado para animar la escritura de texto como si se estuviera tecleando
 * 
 * @param text - El texto completo que se mostrará
 * @param speed - La velocidad de escritura en milisegundos por carácter
 * @param startDelay - Retraso antes de comenzar la animación en milisegundos
 * @param initialText - Texto inicial que ya estará visible (opcional)
 * @returns El texto parcial que se está animando
 */
const useTypewriterEffect = (
  text: string,
  speed: number = 30,
  startDelay: number = 500,
  initialText: string = ''
): string => {
  // Definir todos los estados al principio del hook y siempre en el mismo orden
  const [displayedText, setDisplayedText] = useState<string>(initialText);
  const [currentIndex, setCurrentIndex] = useState<number>(initialText.length);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  
  // Primer useEffect: Reiniciar la animación cuando cambia el texto de entrada
  useEffect(() => {
    setDisplayedText(initialText);
    setCurrentIndex(initialText.length);
    setIsPaused(false);
  }, [text, initialText]);
  
  // Segundo useEffect: Manejar la animación de escritura
  useEffect(() => {
    // Si hemos terminado, salir
    if (currentIndex >= text.length) return;
    
    // Función para determinar si debemos hacer una pausa para simular el pensamiento del programador
    const shouldPause = () => {
      // Pausa después de caracteres específicos como punto, coma, etc.
      const pauseAfterChars = [';', '.', '{', '}', '(', ')', '\n'];
      return currentIndex > 0 && pauseAfterChars.includes(text[currentIndex - 1]);
    };
    
    // Función para calcular la velocidad de escritura variable (añade realismo)
    const getTypingSpeed = () => {
      // Velocidad base
      let typingSpeed = speed;
      
      // Variación aleatoria para que parezca más natural
      const randomFactor = Math.random();
      if (randomFactor > 0.9) {
        typingSpeed = speed * 3; // Ocasionalmente más lento (simulando pensar)
      } else if (randomFactor < 0.1) {
        typingSpeed = speed * 0.5; // Ocasionalmente más rápido
      }
      
      // Mayor retraso después de saltos de línea o caracteres especiales
      if (shouldPause()) {
        const pauseDuration = Math.floor(Math.random() * 300) + 100;
        return typingSpeed + pauseDuration;
      }
      
      return typingSpeed;
    };
    
    // Timer inicial para el retraso de inicio
    const initialTimerDelay = currentIndex === initialText.length ? startDelay : 0;
    
    const initialTimer = setTimeout(() => {
      // Timer para la escritura carácter por carácter
      const typingTimer = setTimeout(() => {
        if (isPaused) {
          // Si estamos en pausa, continuar después de un tiempo
          setIsPaused(false);
        } else {
          setDisplayedText(prev => prev + text.charAt(currentIndex));
          setCurrentIndex(prev => prev + 1);
          
          // Decidir si hacer pausa después de este carácter
          if (shouldPause() && Math.random() > 0.7) {
            setIsPaused(true);
          }
        }
      }, isPaused ? 400 : getTypingSpeed());
      
      return () => clearTimeout(typingTimer);
    }, initialTimerDelay);
    
    return () => clearTimeout(initialTimer);
  }, [currentIndex, text, speed, startDelay, initialText, isPaused]);
  
  return displayedText;
};

export default useTypewriterEffect;