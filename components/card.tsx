"use client"
import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import PixelCanvas from './pixel-canvas';

interface CardProps {
  href?: string;
  image?: {
    src?: string | any;
    width?: number;
    height?: number;
    alt?: string;
  };
  title?: string;
  description?: string;
  className?: string;
  pixelCanvas?: {
    enabled?: boolean;
    colors?: string[];
    gap?: number;
    speed?: number;
  };
  badge?: {
    text: string;
    className?: string;
  };
  'data-spotlight-index'?: number;
  'data-spotlight-active'?: boolean;
}

const Card = ({ 
  href = "#0",
  image = undefined,
  title = "",
  description = "",
  className = "",
  pixelCanvas = {
    enabled: true,
    colors: ['#f0fdfa', '#ccfbf1', '#99f6e4'],
    gap: 8,
    speed: 35
  },
  badge = undefined,
  'data-spotlight-index': spotlightIndex,
  'data-spotlight-active': isActive = false,
  ...props
}: CardProps) => {
  const cardRef = useRef<HTMLAnchorElement>(null);

  // Función para manejar el efecto glow con el movimiento del mouse
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      
      // Calcular posición relativa normalizada (0-1)
      const normalizedX = (e.clientX - rect.left) / rect.width;
      const normalizedY = (e.clientY - rect.top) / rect.height;
      
      // Convertir a porcentajes para CSS
      const percentX = normalizedX * 100;
      const percentY = normalizedY * 100;
      
      card.style.setProperty('--mouse-x-percent', `${percentX}%`);
      card.style.setProperty('--mouse-y-percent', `${percentY}%`);
    };

    card.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <a 
      ref={cardRef}
      href={href}
      className={`
        group/card 
        relative 
        block
        h-[500px] 
        w-full
        overflow-hidden 
        rounded-2xl 
        bg-transparent
        border border-teal-500/30
        p-px 
        isolation-auto
        ${className}
      `}
      style={{
        // Estilos personalizados para el glow usando CSS nativo
        '--card-glow-blur': '25px',
        '--card-glow-spread': '10px',
        '--card-glow-color': 'rgba(20, 184, 166, 0.8)' // Color teal para combinar con el diseño
      } as React.CSSProperties}
      data-spotlight-index={spotlightIndex}
      {...props}
    >
      {/* Pseudo-elementos controlados con clases para consistencia */}
      <div 
        className="
          absolute 
          top-0 
          left-0 
          w-full 
          h-full 
          opacity-0 
          group-hover/card:opacity-100 
          transition-opacity 
          duration-500 
          pointer-events-none
          z-10
        "
        style={{
          background: 'radial-gradient(circle 150px at var(--mouse-x-percent, 50%) var(--mouse-y-percent, 50%), rgba(20, 184, 166, 0.6), transparent)',
          filter: 'blur(25px)'
        }}
      />
              
      <div className="relative z-20 h-full overflow-hidden rounded-[inherit] bg-transparent flex flex-col">
        {/* PixelCanvas Container */}
        {pixelCanvas.enabled && (
          <div className="absolute inset-0 z-10 w-full h-full">
            <PixelCanvas
              colors={pixelCanvas.colors}
              gap={pixelCanvas.gap}
              speed={pixelCanvas.speed}
              className="h-full w-full"
              isActive={isActive}
            />
          </div>
        )}

        {/* Content Layer */}
        <div className="relative z-20 flex flex-col h-full">
          {/* Arrow */}
          <div
            className="absolute right-6 top-6 flex h-8 w-8 items-center justify-center rounded-full 
              border border-teal-500/50 bg-black/65 text-teal-200 opacity-0 
              transition-opacity group-hover/card:opacity-100"
            aria-hidden="true"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width={9} height={8} fill="none">
              <path fill="#14B8A6" d="m4.92 8-.787-.763 2.733-2.68H0V3.443h6.866L4.133.767 4.92 0 9 4 4.92 8Z" />
            </svg>
          </div>

          {/* Image Container con altura proporcional */}
          {image && image.src ? (
            <div className="relative w-full h-[60%] overflow-hidden">
              <Image
                className="object-cover"
                src={image.src}
                fill
                alt={image.alt || "Card image"}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          ) : (
            <div className="relative w-full h-[60%] bg-gray-900/30 flex items-center justify-center">
              <div className="text-teal-400">Sin imagen</div>
            </div>
          )}

          {/* Content - flexibilidad para ocupar espacio restante */}
          <div className="relative p-6 flex flex-col flex-grow bg-black/40 backdrop-blur-sm">
            {title && <h3 className="text-xl font-bold mb-2 text-blue-400">{title}</h3>}
            
            {badge && (
              <div className="mb-3">
                <span className={`btn-sm relative rounded-full bg-black/40 px-2.5 py-0.5 text-s 
                  font-bold before:pointer-events-none before:absolute before:inset-0 
                  before:rounded-[inherit] before:border before:border-teal-500/50
                  before:[background:linear-gradient(to_bottom,theme(colors.teal.700/0.15),theme(colors.teal.700/0.5))_border-box] 
                  before:[mask-composite:exclude_!important] 
                  before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)] 
                  hover:bg-teal-900/50 ${badge.className || ''}`}
                >
                  <span className="bg-gradient-to-r from-teal-400 to-blue-400 bg-clip-text text-transparent">
                    {badge.text}
                  </span>
                </span>
              </div>
            )}
            {description && (
              <p className="text-white text-sm">
                {description}
              </p>
            )}
          </div>
        </div>
      </div>
    </a>
  );
};

export default Card;