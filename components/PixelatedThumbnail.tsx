'use client'

import React, { useRef, useEffect, useState } from 'react';

// Definimos las propiedades con tipado TypeScript
interface PixelatedThumbnailProps {
  image: string;
  isVisible: boolean;
  title: string;
  subtitle?: string;
  showCompileLines?: boolean;
  mainColor?: string;
}

// Definimos el tipo para las líneas simuladas
interface CodeLine {
  y: number;
  width: number;
  xOffset: number;
  alpha: number;
  height: number;
}

/**
 * Componente para mostrar imágenes con efecto de pixelado y compilación
 */
const PixelatedThumbnail: React.FC<PixelatedThumbnailProps> = ({ 
  image, 
  isVisible, 
  title, 
  subtitle = "Compilando...", 
  showCompileLines = true,
  mainColor = '#2dd4bf'
}) => {
  // Referencias y estados
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [pixelRatio, setPixelRatio] = useState<number>(30); // Comienza muy pixelado
  const [lines, setLines] = useState<CodeLine[]>([]); // Estado para las líneas de código simuladas
  const animationRef = useRef<number | null>(null);

  // Efecto para generar "líneas de código" aleatorias
  useEffect(() => {
    if (!isVisible || !showCompileLines) return;
    
    // Genera líneas simuladas de código (segmentos horizontales)
    const generateLines = (canvasHeight: number) => {
      const lineHeight = 3;
      const gapHeight = 6;
      const numLines = Math.floor(canvasHeight / (lineHeight + gapHeight));
      const newLines: CodeLine[] = [];
      
      for (let i = 0; i < numLines; i++) {
        if (Math.random() > 0.6) { // Solo mostrar algunas líneas para efecto visual
          const y = i * (lineHeight + gapHeight);
          // Variar los anchos para un efecto más realista
          const width = Math.random() * 0.7 + 0.3; // Entre 30% y 100% del ancho
          // Variar las posiciones de inicio
          const xOffset = Math.random() * 0.2; // Hasta 20% de offset
          
          newLines.push({
            y, 
            width, 
            xOffset,
            alpha: Math.random() * 0.4 + 0.4, // Transparencia variable
            height: lineHeight,
          });
        }
      }
      
      setLines(newLines);
    };

    // Esperar hasta que el canvas esté disponible
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      generateLines(canvas.clientHeight);
    }
  }, [isVisible, showCompileLines]);

  // Efecto para animar el pixelado cuando esté visible
  useEffect(() => {
    if (!isVisible || !canvasRef.current) return;
    
    let startTime: number | null = null;
    const duration = 1200; // Duración de la animación (ms)
    
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Reducimos la pixelación gradualmente (de más pixelado a más nítido)
      // Comenzamos con pixelRatio de 30 (muy pixelado) y terminamos con 1 (nítido)
      const currentPixelRatio = 30 - (progress * 29);
      setPixelRatio(currentPixelRatio);
      
      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };
    
    animationRef.current = requestAnimationFrame(animate);
    
    // Limpieza de la animación cuando el componente se desmonta o isVisible cambia
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isVisible]);
  
  // Efecto para dibujar la imagen pixelada en el canvas
  useEffect(() => {
    if (!canvasRef.current || !isVisible) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return; // Salir si no podemos obtener el contexto
    
    const img = new Image();
    
    // Función para manejar errores de carga de imágenes
    img.onerror = () => {
      console.warn('Error al cargar la imagen:', image);
      // Dibujar un fallback en caso de error
      if (canvas) {
        drawFallbackImage(canvas, title, mainColor);
      }
    };
    
    img.onload = () => {
      // Ajustar tamaño del canvas al de su contenedor
      const parentWidth = canvas.parentElement ? canvas.parentElement.clientWidth : 300;
      const parentHeight = canvas.parentElement ? canvas.parentElement.clientHeight : 200;
      
      // Escalar para dispositivos de alta densidad (retina)
      const dpr = window.devicePixelRatio || 1;
      canvas.width = parentWidth * dpr;
      canvas.height = parentHeight * dpr;
      
      // Escalar el contexto para compensar el DPR
      ctx.scale(dpr, dpr);
      
      // Ajustar el estilo del canvas
      canvas.style.width = `${parentWidth}px`;
      canvas.style.height = `${parentHeight}px`;
      
      // Limpia el canvas
      ctx.clearRect(0, 0, parentWidth, parentHeight);
      
      // Dibuja la imagen pixelada
      const size = Math.max(pixelRatio, 1);
      
      // Si aún estamos pixelando (pixelRatio > 1)
      if (pixelRatio > 1) {
        // Efecto pixelado
        ctx.imageSmoothingEnabled = false;
        
        // Dibuja a un tamaño reducido
        const smallWidth = parentWidth / size;
        const smallHeight = parentHeight / size;
        
        // Crea un canvas temporal para el efecto pixelado
        const tempCanvas = document.createElement('canvas');
        const tempCtx = tempCanvas.getContext('2d');
        if (!tempCtx) return; // Salir si no podemos obtener el contexto
        
        tempCanvas.width = smallWidth;
        tempCanvas.height = smallHeight;
        
        // Dibuja la imagen reducida en el canvas temporal
        tempCtx.drawImage(img, 0, 0, smallWidth, smallHeight);
        
        // Limpia el canvas principal
        ctx.clearRect(0, 0, parentWidth, parentHeight);
        
        // Redibuja la imagen pequeña ampliada para crear el efecto pixelado
        ctx.drawImage(tempCanvas, 0, 0, smallWidth, smallHeight, 0, 0, parentWidth, parentHeight);
      } else {
        // Si ya no hay pixelado, dibuja la imagen normal
        ctx.drawImage(img, 0, 0, parentWidth, parentHeight);
      }
      
      // Overlay con degradado para dar profundidad
      const gradient = ctx.createLinearGradient(0, 0, 0, parentHeight);
      gradient.addColorStop(0, 'rgba(0, 0, 0, 0.8)');
      gradient.addColorStop(0.4, 'rgba(0, 0, 0, 0.5)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0.7)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, parentWidth, parentHeight);
      
      // Dibuja líneas de "código" para simular proceso de compilación
      if (showCompileLines && pixelRatio > 5) {
        ctx.fillStyle = mainColor || 'rgba(46, 213, 191, 0.7)'; // Color teal semitransparente
        
        // Dibuja las líneas almacenadas
        lines.forEach(line => {
          ctx.globalAlpha = line.alpha; // Varía la opacidad
          ctx.fillRect(
            parentWidth * line.xOffset, 
            line.y, 
            parentWidth * line.width, 
            line.height
          );
        });
        
        ctx.globalAlpha = 1.0; // Restaura la opacidad
      }
      
      // Añadir efecto de scan line de CRT para más estética retro
      if (pixelRatio > 3) {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.03)';
        for (let i = 0; i < parentHeight; i += 2) {
          ctx.fillRect(0, i, parentWidth, 1);
        }
      }
      
      // Añadir texto de título con sombra
      ctx.textAlign = 'center';
      
      // Sombra para el título
      ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
      ctx.shadowBlur = 4;
      ctx.shadowOffsetX = 2;
      ctx.shadowOffsetY = 2;
      
      // Dibujar título
      ctx.font = 'bold 24px Arial, sans-serif';
      ctx.fillStyle = '#ffffff';
      ctx.fillText(title, parentWidth / 2, parentHeight / 2);
      
      // Dibujar subtítulo de compilación si aún estamos en proceso
      if (pixelRatio > 2 && subtitle) {
        // Cambiar shadow para el subtítulo
        ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
        ctx.shadowBlur = 2;
        ctx.shadowOffsetX = 1;
        ctx.shadowOffsetY = 1;
        
        ctx.font = '16px monospace';
        ctx.fillStyle = mainColor || '#2dd4bf';
        
        // Añadir terminal cursor blink effect al final del texto
        const cursorBlink = Math.floor(Date.now() / 500) % 2 === 0 ? '|' : '';
        ctx.fillText(subtitle + cursorBlink, parentWidth / 2, parentHeight / 2 + 40);
      }
      
      // Reiniciar las propiedades de sombra
      ctx.shadowColor = 'transparent';
      ctx.shadowBlur = 0;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
    };
    
    // Establecer la fuente de la imagen
    img.src = image;
  });
  
  // Función para dibujar una imagen de fallback cuando hay error de carga
  const drawFallbackImage = (canvas: HTMLCanvasElement, title: string, color?: string) => {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const parentWidth = canvas.parentElement ? canvas.parentElement.clientWidth : 300;
    const parentHeight = canvas.parentElement ? canvas.parentElement.clientHeight : 200;
    
    // Escalar para dispositivos de alta densidad
    const dpr = window.devicePixelRatio || 1;
    canvas.width = parentWidth * dpr;
    canvas.height = parentHeight * dpr;
    ctx.scale(dpr, dpr);
    
    // Ajustar el estilo del canvas
    canvas.style.width = `${parentWidth}px`;
    canvas.style.height = `${parentHeight}px`;
    
    // Fondo degradado
    const gradient = ctx.createLinearGradient(0, 0, 0, parentHeight);
    gradient.addColorStop(0, '#000000');
    gradient.addColorStop(1, '#1f2937');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, parentWidth, parentHeight);
    
    // Patrón de grid futurista
    ctx.strokeStyle = 'rgba(46, 213, 191, 0.2)';
    ctx.lineWidth = 1;
    
    // Grid horizontal
    for (let y = 20; y < parentHeight; y += 40) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(parentWidth, y);
      ctx.stroke();
    }
    
    // Grid vertical
    for (let x = 20; x < parentWidth; x += 40) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, parentHeight);
      ctx.stroke();
    }
    
    // Dibujar título
    ctx.textAlign = 'center';
    ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
    ctx.shadowBlur = 4;
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;
    ctx.font = 'bold 24px Arial, sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.fillText(title, parentWidth / 2, parentHeight / 2);
    
    // Indicar que es una vista previa
    ctx.font = '16px monospace';
    ctx.fillStyle = color || '#2dd4bf';
    ctx.fillText('Vista previa', parentWidth / 2, parentHeight / 2 + 40);
    
    // Reiniciar sombras
    ctx.shadowColor = 'transparent';
    ctx.shadowBlur = 0;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
  };
  
  // Si no es visible, no renderizar nada
  if (!isVisible) return null;
  
  return (
    <div className="absolute inset-0 z-30 overflow-hidden rounded-xl">
      <canvas 
        ref={canvasRef}
        className="w-full h-full"
        style={{ filter: 'contrast(1.1) brightness(1.05)' }} // Pequeña mejora visual
      />
    </div>
  );
};

export default React.memo(PixelatedThumbnail);