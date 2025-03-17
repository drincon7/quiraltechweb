'use client'

import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import MetallicPaint, { parseLogoImage } from "../components/ui/MetallicPaint/MetallicPaint";
// Make sure to import the ImageData type if it's not available in your current scope
// If you get additional errors, you might need to adjust this import based on where ImageData is defined

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
      className="relative bg-black text-white py-16 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto relative z-50">
        <div className="grid grid-cols-4 items-center border border-gray-800 rounded-lg overflow-hidden bg-gradient-to-br from-gray-900/80 to-black/90 backdrop-blur-sm shadow-2xl">
          {/* Logo section - smaller, square */}
          <div className="col-span-1 flex items-center justify-center p-8 border-r border-gray-800 h-full relative">
            <div className="w-36 h-36 flex items-center justify-center">
              {isLoading ? (
                <div className="w-24 h-24 bg-gray-800/40 rounded-full animate-pulse"></div>
              ) : imageData ? (
                <div className="relative w-full h-full overflow-hidden" style={{ aspectRatio: '1/1' }}>
                  <div className="absolute inset-0 flex items-center justify-center transform scale-110">
                    <MetallicPaint 
                      imageData={imageData} 
                      params={{ 
                        edge: 0, 
                        patternBlur: 0.005, 
                        patternScale: 2, 
                        refraction: 0.015, 
                        speed: 0.2, 
                        liquid: 0.07
                      }} 
                    />
                  </div>
                </div>
              ) : (
                <Image
                  src="/images/isologo.svg"
                  width={100}
                  height={100}
                  alt="IsoLogo"
                  className="max-w-full"
                />
              )}
            </div>
          </div>
          
          {/* Text and button section - larger, rectangular */}
          <div className="col-span-3 flex flex-col items-center justify-center p-8">
            <h2 className="font-nacelle text-4xl font-semibold mb-6 bg-gradient-to-t from-gray-400 to-white bg-clip-text text-transparent">
              Listo para empezar?
            </h2>
            
            <a
              className="inline-flex items-center px-8 py-3 bg-white text-black rounded-full hover:bg-gray-100 transition-colors"
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