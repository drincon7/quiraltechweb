"use client";

import React, { useEffect, useState, useRef } from 'react';
import { Fade } from "react-awesome-reveal";
import VideoThumb from "@/public/images/hero-image-01.jpg";

export default function HeroHome() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const [isInView, setIsInView] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const scrollProgress = -rect.top / (rect.height - window.innerHeight);
        setScrollPosition(scrollProgress);
        
        setIsInView(rect.top <= window.innerHeight && rect.bottom >= 0);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Cálculo del ratio para la transición de color
  const ratio = Math.min(Math.max(scrollPosition, 0), 1);
  const r = Math.round(255 * (1 - ratio));
  const g = Math.round(255 * (1 - ratio) + 170 * ratio);
  const b = Math.round(255 * (1 - ratio) + 255 * ratio);
  const textColor = `rgb(${r}, ${g}, ${b})`;

  // Calculamos la opacidad para el fade final
  const fadeEndThreshold = 0.8;
  const opacity = scrollPosition >= fadeEndThreshold 
    ? Math.max(0, 1 - (scrollPosition - fadeEndThreshold) / (1 - fadeEndThreshold))
    : 1;

  // Efecto parallax
  const translateY = -(scrollPosition * 50);
  const scale = 1.1 + scrollPosition * 0.2;

  return (
    <section 
      ref={sectionRef} 
      className="relative h-[300vh] overflow-hidden"
    >
      {/* Fondo con efecto parallax */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${VideoThumb.src})`,
            transform: `scale(${scale}) translateY(${translateY}%)`,
            transition: 'transform 0.1s ease-out'
          }}
        />
        <div 
          className="absolute inset-0 bg-black"
          style={{ opacity: 0.4 + ratio * 0.2 }}
        />

        {/* Contenido regular (no fixed) */}
        <div 
          className="relative pt-32 text-center"
          style={{ opacity }}
        >
          <Fade triggerOnce>
            <h1 className="animate-[gradient_6s_linear_infinite] bg-[linear-gradient(to_right,var(--color-gray-200),var(--color-indigo-200),var(--color-gray-50),var(--color-indigo-300),var(--color-gray-200))] bg-[length:200%_auto] bg-clip-text pb-5 font-nacelle text-4xl font-semibold text-transparent md:text-5xl">
              Tecnología con propósito
            </h1>
            <div className="mx-auto max-w-3xl">
              <p className="mb-8 text-xl text-white opacity-85">
                Transforma tus desafios en soluciones digitales innovadoras
              </p>
            </div>
          </Fade>
        </div>
      </div>

      {/* Contenido fixed */}
      {isInView && (
        <div 
          className="fixed left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2 text-center"
          style={{ 
            opacity,
            transition: 'all 0.3s ease',
            zIndex: 10
          }}
        >
          <Fade direction="up" delay={400} triggerOnce>
            <h1 className="animate-[gradient_6s_linear_infinite] bg-[linear-gradient(to_right,var(--color-gray-200),var(--color-indigo-200),var(--color-gray-50),var(--color-indigo-300),var(--color-gray-200))] bg-[length:200%_auto] bg-clip-text pb-5 font-nacelle text-4xl font-semibold text-transparent md:text-4xl">
              Sumate al cambio
            </h1>
          </Fade>

          <div className="mx-auto mt-8 max-w-xs sm:flex sm:max-w-none sm:justify-center">
            <Fade direction="up" delay={600} triggerOnce>
              <div>
                <a className="btn group mb-4 w-full bg-linear-to-t from-indigo-600 to-indigo-500 bg-[length:100%_100%] bg-[bottom] text-white shadow-[inset_0px_1px_0px_0px_--theme(--color-white/.16)] hover:bg-[length:100%_150%] sm:mb-0 sm:w-auto"
                   href="#0">
                  <span className="relative inline-flex items-center">
                    Start Building
                    <span className="ml-1 tracking-normal text-white/50 transition-transform group-hover:translate-x-0.5">
                      -&gt;
                    </span>
                  </span>
                </a>
              </div>
            </Fade>

            <Fade direction="up" delay={800} triggerOnce>
              <div>
                <a className="btn relative w-full bg-linear-to-b from-gray-800 to-gray-800/60 bg-[length:100%_100%] bg-[bottom] text-gray-300 before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(to_right,var(--color-gray-800),var(--color-gray-700),var(--color-gray-800))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)] hover:bg-[length:100%_150%] sm:ml-4 sm:w-auto"
                   href="#0">
                  Schedule Demo
                </a>
              </div>
            </Fade>
          </div>
        </div>
      )}
    </section>
  );
}