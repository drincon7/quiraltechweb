'use client';

import React, { useEffect, useRef, useState } from 'react';
import Pixel from '@/types/pixel';

interface PixelCanvasProps {
  colors?: string[];
  gap?: number;
  speed?: number;
  noFocus?: boolean;
  className?: string;
}

const PixelCanvas: React.FC<PixelCanvasProps> = ({
  colors = ['#f8fafc', '#f1f5f9', '#cbd5e1'],
  gap = 5,
  speed = 35,
  noFocus = false,
  className = ''
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pixelsRef = useRef<Pixel[]>([]);  // Aquí estaba el error, necesita valor inicial
  const animationRef = useRef<number | undefined>(undefined);  // También especificamos undefined como valor inicial
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const getDistanceToCanvasCenter = (x: number, y: number): number => {
    if (!canvasRef.current) return 0;
    const dx = x - canvasRef.current.width / 2;
    const dy = y - canvasRef.current.height / 2;
    return Math.sqrt(dx * dx + dy * dy);
  };

  const createPixels = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
    pixelsRef.current = [];
    for (let x = 0; x < canvas.width; x += gap) {
      for (let y = 0; y < canvas.height; y += gap) {
        const color = colors[Math.floor(Math.random() * colors.length)];
        const delay = getDistanceToCanvasCenter(x, y);
        
        pixelsRef.current.push(new Pixel({
          canvas,
          context: ctx,
          x,
          y,
          color,
          speed: speed * 0.001,
          delay
        }));
      }
    }
  };

  const animate = (fnName: 'appear' | 'disappear') => {
    if (!canvasRef.current || !canvasRef.current.getContext) return;
    
    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    const timeInterval = 1000 / 60;
    let timePrevious = performance.now();

    const animateFrame = () => {
      animationRef.current = requestAnimationFrame(animateFrame);

      const timeNow = performance.now();
      const timePassed = timeNow - timePrevious;

      if (timePassed < timeInterval) return;

      timePrevious = timeNow - (timePassed % timeInterval);

      ctx.clearRect(0, 0, canvasRef.current!.width, canvasRef.current!.height);

      for (const pixel of pixelsRef.current) {
        pixel[fnName]();
      }

      if (pixelsRef.current.every((pixel) => pixel.isIdle)) {
        cancelAnimationFrame(animationRef.current!);
      }
    };

    animateFrame();
  };

  const handleAnimation = (name: 'appear' | 'disappear') => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    animate(name);
  };

  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        setDimensions({ width: Math.floor(width), height: Math.floor(height) });
      }
    });

    resizeObserver.observe(containerRef.current);

    return () => {
      resizeObserver.disconnect();
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!canvasRef.current || !dimensions.width || !dimensions.height) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = dimensions.width;
    canvas.height = dimensions.height;
    canvas.style.width = `${dimensions.width}px`;
    canvas.style.height = `${dimensions.height}px`;

    createPixels(canvas, ctx);
  }, [dimensions, colors, gap, speed]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full ${className}`}
      onMouseEnter={() => handleAnimation('appear')}
      onMouseLeave={() => handleAnimation('disappear')}
      onFocus={() => !noFocus && handleAnimation('appear')}
      onBlur={() => !noFocus && handleAnimation('disappear')}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0"
      />
    </div>
  );
};

export default PixelCanvas;