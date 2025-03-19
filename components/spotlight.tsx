"use client";

import React, { useRef, useState, useEffect, ReactNode } from "react";
import useMousePosition from "@/utils/useMousePosition";

interface SpotlightProps {
  children: ReactNode;
  className?: string;
  mode?: 'individual' | 'group';
  colorScheme?: 'default' | 'purple' | 'blue' | 'blue-sky';
  borderWidth?: number;
}

export default function Spotlight({
  children,
  className = "",
  mode = 'individual',
  colorScheme = 'default',
  borderWidth = 2 // Default to 2px for more visible borders
}: SpotlightProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mousePosition = useMousePosition();
  const mouse = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const containerSize = useRef<{ w: number; h: number }>({ w: 0, h: 0 });
  const [boxes, setBoxes] = useState<Array<HTMLElement>>([]);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  // Definir los colores basados en el colorScheme
  const spotlightColors = {
    default: {
      primary: 'rgba(135, 104, 255, 0.7)',
      secondary: 'rgba(255, 107, 184, 0.6)',
      tertiary: 'rgba(38, 38, 44, 0)'
    },
    purple: {
      primary: 'rgba(147, 51, 234, 0.7)',
      secondary: 'rgba(192, 132, 252, 0.6)',
      tertiary: 'rgba(38, 38, 44, 0)'
    },
    blue: {
      primary: 'rgba(59, 130, 246, 0.7)',
      secondary: 'rgba(96, 165, 250, 0.6)',
      tertiary: 'rgba(38, 38, 44, 0)'
    },
    'blue-sky': {
      primary: 'rgba(56, 189, 248, 0.8)',   // Sky blue - más brillante
      secondary: 'rgba(14, 165, 233, 0.7)',  // Azul medio
      tertiary: 'rgba(3, 105, 161, 0.3)'     // Azul oscuro para mejor transición
    }
  };

  const colors = spotlightColors[colorScheme || 'default'];

  useEffect(() => {
    setMounted(true);
    
    if (containerRef.current) {
      setBoxes(
        Array.from(containerRef.current.children).map(
          (el) => el as HTMLElement,
        ),
      );
    }

    // Si estamos en modo grupo, agregar estilos CSS específicos para ese modo
    if (mode === 'group') {
      const style = document.createElement('style');
      style.innerHTML = `
        .spotlight-container {
          --x: 50%;
          --y: 50%;
          position: relative;
        }
        
        .spotlight-container [data-spotlight] {
          position: relative;
          border-radius: 16px;
          background: linear-gradient(135deg, rgba(24, 24, 29, 0.8), rgba(13, 13, 15, 0.95));
          backdrop-filter: blur(8px);
          overflow: hidden;
          transition: all 0.3s ease;
        }
        
        .spotlight-container [data-spotlight]::before,
        .spotlight-container [data-spotlight]::after {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: inherit;
          transition: opacity 0.4s ease;
          z-index: 1;
          pointer-events: none;
        }
        
        /* Base border gradient visible all the time */
        .spotlight-container [data-spotlight]::before {
          padding: ${borderWidth}px;
          border-radius: inherit;
          background: linear-gradient(
            135deg,
            rgba(63, 63, 70, 0.6),
            rgba(22, 22, 26, 0.7) 50%,
            rgba(63, 63, 70, 0.6)
          );
          mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
        }
        
        /* Spotlight gradient that follows mouse */
        .spotlight-container [data-spotlight]::after {
          opacity: 0;
          padding: ${borderWidth}px;
          background: radial-gradient(
            800px circle at var(--x) var(--y),
            ${colors.primary},
            ${colors.secondary} 30%,
            ${colors.tertiary || 'rgba(38, 38, 44, 0)'} 70%
          );
          mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          transition: opacity 0.3s ease;
        }
        
        .spotlight-container:hover [data-spotlight]::after {
          opacity: 0.4;
        }
        
        .spotlight-container [data-spotlight][data-hovered="true"]::after {
          opacity: 1 !important;
        }
        
        /* Additional Card Depth */
        .spotlight-container [data-spotlight] {
          box-shadow: 
            0 10px 30px -15px rgba(0, 0, 0, 0.5),
            0 2px 3px rgba(0, 0, 0, 0.2);
        }
        
        /* Optional 3D hover effect */
        .spotlight-container:hover [data-spotlight] {
          transform: translateZ(0);
        }
        
        .spotlight-container [data-spotlight][data-hovered="true"] {
          transform: translateY(-5px);
        }
        
        /* Ensure content stays above effects */
        .spotlight-container [data-spotlight] > * {
          position: relative;
          z-index: 2;
        }
      `;
      document.head.appendChild(style);
      
      return () => {
        if (style && style.parentNode === document.head) {
        document.head.removeChild(style);
        }
      };
    }
  }, [mode, colorScheme, borderWidth]);

  useEffect(() => {
    initContainer();
    window.addEventListener("resize", initContainer);

    return () => {
      window.removeEventListener("resize", initContainer);
    };
  }, [boxes]);

  useEffect(() => {
    onMouseMove();
  }, [mousePosition]);

  const initContainer = () => {
    if (containerRef.current) {
      containerSize.current.w = containerRef.current.offsetWidth;
      containerSize.current.h = containerRef.current.offsetHeight;
    }
  };

  const onMouseMove = () => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const { w, h } = containerSize.current;
      const x = mousePosition.x - rect.left;
      const y = mousePosition.y - rect.top;
      const inside = x < w && x > 0 && y < h && y > 0;
      
      if (inside) {
        mouse.current.x = x;
        mouse.current.y = y;
        
        if (mode === 'group') {
          // En modo grupo, establecemos variables CSS en el contenedor
          const containerEl = containerRef.current as HTMLElement;
          containerEl.style.setProperty('--x', `${x}px`);
          containerEl.style.setProperty('--y', `${y}px`);
        }
        
        boxes.forEach((box, index) => {
          if (mode === 'individual') {
            // Modo individual: spotlight independiente para cada elemento
            const boxRect = box.getBoundingClientRect();
            const boxX = -(boxRect.left - rect.left) + mouse.current.x;
            const boxY = -(boxRect.top - rect.top) + mouse.current.y;
            
            box.style.setProperty("--mouse-x", `${boxX}px`);
            box.style.setProperty("--mouse-y", `${boxY}px`);
          }
          
          const boxRect = box.getBoundingClientRect();
          const isOverBox = 
            mousePosition.x >= boxRect.left &&
            mousePosition.x <= boxRect.right &&
            mousePosition.y >= boxRect.top &&
            mousePosition.y <= boxRect.bottom;
          
          if (isOverBox && hoveredIndex !== index) {
            setHoveredIndex(index);
          } else if (!isOverBox && hoveredIndex === index) {
            setHoveredIndex(null);
          }
          
          box.dataset.hovered = isOverBox ? 'true' : 'false';
        });
      } else {
        setHoveredIndex(null);
      }
    }
  };

  return (
    <div 
      className={`${className} ${mode === 'group' ? 'spotlight-container' : ''}`} 
      ref={containerRef}
    >
      {React.Children.map(children, (child, index) => {
        if (React.isValidElement(child)) {
          const elementWithProps = child as React.ReactElement<any>;
          return React.cloneElement(elementWithProps, {
            ...elementWithProps.props,
            'data-spotlight': '',
            'data-spotlight-index': index,
            'data-spotlight-active': hoveredIndex === index,
            'data-hovered': hoveredIndex === index ? 'true' : 'false'
          });
        }
        return child;
      })}
    </div>
  );
}