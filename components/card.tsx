"use client"
import React from 'react';
import Image from 'next/image';
import PixelCanvas from './pixel-canvas';

interface CardProps {
  href?: string;
  image: {
    src: string | any;
    width?: number;
    height?: number;
    alt: string;
  };
  title: string;
  description: string;
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
  image,
  title,
  description,
  className = "",
  pixelCanvas = {
    enabled: true,
    colors: ['#f0fdfa', '#ccfbf1', '#99f6e4'],
    gap: 8,
    speed: 35
  },
  badge,
  'data-spotlight-index': spotlightIndex,
  'data-spotlight-active': isActive,
  ...props
}: CardProps) => {
  return (
    <a 
      href={href}
      className={`group/card relative h-full overflow-hidden rounded-2xl bg-zinc-200 p-px isolation-auto 
        before:pointer-events-none before:absolute before:-left-40 before:-top-40 before:z-10 
        before:h-80 before:w-80 before:translate-x-[var(--mouse-x)] before:translate-y-[var(--mouse-y)] 
        before:rounded-full before:bg-indigo-500/80 before:opacity-0 before:blur-3xl 
        before:transition-opacity before:duration-500 
        after:pointer-events-none after:absolute after:-left-48 after:-top-48 after:z-30 
        after:h-64 after:w-64 after:translate-x-[var(--mouse-x)] after:translate-y-[var(--mouse-y)] 
        after:rounded-full after:bg-indigo-500 after:opacity-0 after:blur-3xl 
        after:transition-opacity after:duration-500 hover:after:opacity-20 
        group-hover:before:opacity-100 ${className}`}
      data-spotlight-index={spotlightIndex}
      {...props}
    >              
      <div className="relative z-20 h-full overflow-hidden rounded-[inherit] bg-zinc-50">
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
        <div className="relative z-20">
          {/* Arrow */}
          <div
            className="absolute right-6 top-6 flex h-8 w-8 items-center justify-center rounded-full 
              border border-gray-700/50 bg-gray-800/65 text-gray-200 opacity-0 
              transition-opacity group-hover/card:opacity-100"
            aria-hidden="true"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width={9} height={8} fill="none">
              <path fill="#F4F4F5" d="m4.92 8-.787-.763 2.733-2.68H0V3.443h6.866L4.133.767 4.92 0 9 4 4.92 8Z" />
            </svg>
          </div>

          {/* Image */}
          <div className="pointer-events-none">
            <Image
              className="inline-flex mix-blend-overlay opacity-40 transition-opacity duration-300"
              src={image.src}
              width={image.width || 350}
              height={image.height || 288}
              alt={image.alt}
            />
          </div>

          {/* Content */}
          <div className="relative p-6">
            {badge && (
              <div className="mb-3">
                <span className={`btn-sm relative rounded-full bg-zinc-200/40 px-2.5 py-0.5 text-xs 
                  font-normal before:pointer-events-none before:absolute before:inset-0 
                  before:rounded-[inherit] before:border before:border-transparent 
                  before:[background:linear-gradient(to_bottom,theme(colors.gray.700/0.15),theme(colors.gray.700/0.5))_border-box] 
                  before:[mask-composite:exclude_!important] 
                  before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)] 
                  hover:bg-gray-800/60 ${badge.className || ''}`}
                >
                  <span className="bg-blue-500 bg-clip-text text-transparent">
                    {badge.text}
                  </span>
                </span>
              </div>
            )}
            <p className="text-blue-600/65">
              {description}
            </p>
          </div>
        </div>
      </div>
    </a>
  );
};

export default Card;