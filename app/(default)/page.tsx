// app/(default)/page.tsx
"use client";

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import PageIllustration from "@/components/page-illustration";
import Hero from "@/components/hero-home";
import Features from "@/components/features";
import Testimonials from "@/components/testimonials";
import Cta from "@/components/cta";

// Carga dinámica para componentes pesados
const DynamicWorkflows = dynamic(() => import("@/components/workflows"), {
  ssr: false,
  loading: () => <div className="h-screen flex items-center justify-center">Cargando...</div>
});

const DynamicBlurWrapper = dynamic(() => import("@/components/BlurWrapper"), {
  ssr: false
});

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Si no estamos en el cliente todavía, mostramos un contenedor vacío del mismo tamaño
  if (!mounted) {
    return (
      <>
        <PageIllustration />
        <div className="min-h-screen"></div>
      </>
    );
  }

  // Versión simplificada para móviles
  if (isMobile) {
    return (
      <>
        <PageIllustration />
        <section>
          <Hero />
        </section>
        <section id="servicios">
          <DynamicWorkflows />
        </section>
        <section id="diferenciadores">
          <Features />
        </section>
        <section id="testimonios">
          <Testimonials />
        </section>
        <Cta />
      </>
    );
  }

  // Versión completa para escritorio
  return (
    <>
      <PageIllustration />
      <DynamicBlurWrapper 
        blurHeight={350} 
        blurStrength={50}
        sectionPairs={[[0, 1], [3, 2],[7, 6]]}
      >
        <section>
          <Hero />
        </section>
        <section id="servicios">
          <DynamicWorkflows />
        </section>
        <section id="diferenciadores">
          <Features />
        </section>
        <section id="testimonios">
          <Testimonials />
        </section>
      </DynamicBlurWrapper>
      <Cta />
    </>
  );
}