'use client'

import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import MetallicPaint, { parseLogoImage } from "../components/ui/MetallicPaint/MetallicPaint";

export default function Cta() {
  // Reference for section
  const sectionRef = useRef(null);
  
  // State for MetallicPaint component
  const [imageData, setImageData] = useState<ImageData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load and process logo image for MetallicPaint effect
  useEffect(() => {
    let isMounted = true;
    
    async function loadLogoImage() {
      try {
        if (!isMounted) return;
        setIsLoading(true);
        
        const response = await fetch('/images/isologonegro.svg');
        const blob = await response.blob();
        const file = new File([blob], "isologo.svg", { type: blob.type });
        
        if (!isMounted) return;
        
        const result = await parseLogoImage(file);
        if (result && result.imageData && isMounted) {
          setImageData(result.imageData);
          setIsLoading(false);
        }
      } catch (err) {
        console.error("Error loading logo image:", err);
        setIsLoading(false);
      }
    }
    
    loadLogoImage();
    
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative bg-black text-white py-12 md:py-16 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-50">
        <div className="grid grid-cols-1 md:grid-cols-4 items-center border border-gray-800 rounded-lg overflow-hidden bg-gradient-to-br from-gray-900/80 to-black/90 backdrop-blur-sm shadow-2xl">
          {/* Logo section - becomes full width on mobile */}
          <div className="col-span-1 flex items-center justify-center p-6 md:p-8 md:border-r md:border-gray-800 border-b border-gray-800 md:border-b-0 relative">
            <div className="w-24 h-24 md:w-36 md:h-36 flex items-center justify-center">
              {isLoading ? (
                <div className="w-16 h-16 md:w-24 md:h-24 bg-gray-800/40 rounded-full animate-pulse"></div>
              ) : imageData ? (
                <div className="relative w-full h-full overflow-visible">
                  {/* Eliminamos el estilo aspectRatio y modificamos la escala y el posicionamiento */}
                  <div className="absolute inset-0 flex items-center justify-center" style={{ transform: 'scale(1.1)' }}>
                    <div className="w-full h-full">
                      <MetallicPaint 
                        imageData={imageData} 
                        params={{ 
                          edge: 0,  // Reducimos el borde a 0
                          patternBlur: 0.005, 
                          patternScale: 2, 
                          refraction: 0.015, 
                          speed: 0.2, 
                          liquid: 0.07
                        }} 
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <Image
                  src="/images/isologonegro.svg"
                  width={80}
                  height={80}
                  alt="IsoLogo"
                  className="max-w-full md:w-[100px] md:h-[100px]"
                />
              )}
            </div>
          </div>
          
          {/* Text and button section - becomes full width on mobile */}
          <div className="col-span-1 md:col-span-3 flex flex-col items-center justify-center p-6 md:p-8 text-center">
            <h2 className="font-nacelle text-3xl md:text-4xl font-semibold mb-4 md:mb-6 bg-gradient-to-t from-gray-400 to-white bg-clip-text text-transparent">
              Listo para empezar?
            </h2>
            
            <a
              className="inline-flex items-center px-6 md:px-8 py-2 md:py-3 bg-white text-black rounded-full hover:bg-gray-100 transition-colors"
              href="/contacto"
            >
              <span>Conversemos!</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}