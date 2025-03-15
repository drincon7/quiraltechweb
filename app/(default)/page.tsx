// En tu archivo app/(default)/page.tsx

import PageIllustration from "@/components/page-illustration";
import Hero from "@/components/hero-home";
import Workflows from "@/components/workflows";
import Features from "@/components/features";
import Testimonials from "@/components/testimonials";
import Cta from "@/components/cta";
import BlurWrapper from "@/components/BlurWrapper";

export const metadata = {
  title: "Inicio - QuiralTech",
  description: "Pagina web de QuiralTech",
};

export default function Home() {
  return (
    <>
      <PageIllustration />
      
      <BlurWrapper 
        blurHeight={350} 
        blurStrength={50}
        sectionPairs={[[0, 1], [3, 2]]}  // Asegúrate de incluir la transición entre Workflows y Features
      >
        <section>
          <Hero />
        </section>
        
        <section id="servicios">
          <Workflows />
        </section>
        
        <section id="diferenciadores">
          <Features />
        </section>
        
        <section id="testimonios">
          <Testimonials />
        </section>
      </BlurWrapper>
      <Cta />
    </>
  );
}