"use client";

import { useState, useEffect, ReactNode } from "react";
import useMasonry from "@/utils/useMasonry";
// import Image, { StaticImageData } from "next/image";
import useMousePosition from "@/utils/useMousePosition";
/*
import TestimonialImg01 from "@/public/images/testimonial-01.jpg";
import TestimonialImg02 from "@/public/images/testimonial-02.jpg";
import TestimonialImg03 from "@/public/images/testimonial-03.jpg";
import TestimonialImg04 from "@/public/images/testimonial-04.jpg";
import TestimonialImg05 from "@/public/images/testimonial-05.jpg";
import ClientImg01 from "@/public/images/client-logo-01.svg";
import ClientImg02 from "@/public/images/client-logo-02.svg";
import ClientImg03 from "@/public/images/client-logo-03.svg";
import ClientImg04 from "@/public/images/client-logo-04.svg";
import ClientImg05 from "@/public/images/client-logo-05.svg";
*/

// Definición de tipos
interface Testimonial {
  // Imágenes temporalmente comentadas
  img?: any; // StaticImageData;
  clientImg?: any; // StaticImageData;
  name: string;
  company: string;
  content: string;
  categories: number[];
}

interface TestimonialCardProps {
  testimonial: Testimonial;
  category: number;
  isActive: boolean;
  children: ReactNode;
}

// Datos de testimonios
const testimonials: Testimonial[] = [
  {
    // img: TestimonialImg01,
    // clientImg: ClientImg01,
    name: "Elkin Zuleta",
    company: "CEO Paz Pacifico",
    content:
      "Como CEO de Paz Pacifico, siempre buscaba un equipo que pudiera hacer realidad mis ideas sin complicaciones. Esta empresa de desarrollo de software ha sido clave en el éxito de nuestra plataforma. Su enfoque ágil y personalizado hizo que nuestro producto estuviera listo en tiempo récord. ¡Altamente recomendados!",
    categories: [1, 2],
  },
  {
    // img: TestimonialImg02,
    // clientImg: ClientImg02,
    name: "Esteban Marin",
    company: "CEO Maring",
    content:
      "He trabajado con varias empresas de desarrollo, pero esta realmente entiende mis necesidades. Su equipo no solo creó una aplicación móvil increíble para Maring, sino que también optimizó su rendimiento más allá de lo que imaginaba. ¡Es como tener un equipo de expertos siempre a mi disposición!",
    categories: [1, 4],
  },
  {
    // img: TestimonialImg03,
    // clientImg: ClientImg03,
    name: "Felipe Aristizabal",
    company: "Director Zuruk",
    content:
      "Antes, el desarrollo de software era un cuello de botella en nuestro negocio. Desde que trabajamos con esta empresa, todo ha cambiado. Su enfoque estratégico y su capacidad para entregar soluciones escalables nos han permitido crecer sin límites. Desarrollaron tanto nuestra plataforma como nuestra página web con excelentes resultados. ¡Un verdadero socio tecnológico!",
    categories: [1, 2, 3],
  },
  {
    // img: TestimonialImg04,
    // clientImg: ClientImg04,
    name: "Daniel Garcia",
    company: "CEO TPool",
    content:
      "La calidad del software que desarrollaron para TPool superó todas nuestras expectativas. Su equipo no solo es altamente profesional, sino que también ofrece un soporte excepcional. Gracias a ellos, nuestra aplicación móvil y página web tomaron vida y están funcionando sin problemas.",
    categories: [1, 3, 4],
  },
  {
    // img: TestimonialImg05,
    // clientImg: ClientImg05,
    name: "Jose Arias",
    company: "CEO Novaterra",
    content:
      "Siempre pensé que desarrollar una página web a medida sería un proceso largo y complicado, pero esta empresa lo hizo simple y eficiente. En pocas semanas, Novaterra tenía su web funcionando perfectamente y lista para escalar. No puedo estar más satisfecho con su trabajo.",
    categories: [1, 3],
  },
];

// Componente Spotlight mejorado con efecto linterna
function SpotlightGrid({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const mousePosition = useMousePosition();

  useEffect(() => {
    setMounted(true);
    
    // Aplicar estilos base inmediatamente
    document.querySelectorAll('.testimonial-card').forEach(card => {
      (card as HTMLElement).style.borderRadius = '16px';
    });
    
    // Agregar CSS para el efecto spotlight de linterna
    const style = document.createElement('style');
    style.textContent = `
      .testimonial-grid {
        --x: 0px;
        --y: 0px;
        position: relative;
      }
      
      .testimonial-card {
        position: relative;
        border-radius: 16px !important;
        background: linear-gradient(135deg, rgba(24, 24, 29, 0.8), rgba(13, 13, 15, 0.95));
        backdrop-filter: blur(8px);
        overflow: hidden;
        transition: all 0.3s ease;
        box-shadow: 0 10px 30px -15px rgba(0, 0, 0, 0.5), 0 2px 3px rgba(0, 0, 0, 0.2);
        will-change: transform, opacity;
        height: 320px; /* Altura fija para todas las tarjetas */
        display: flex;
        flex-direction: column;
      }
      
      .testimonial-content {
        display: flex;
        flex-direction: column;
        height: 100%;
        overflow-y: auto;
        scrollbar-width: thin;
        scrollbar-color: rgba(90, 90, 120, 0.4) transparent;
      }
      
      .testimonial-content::-webkit-scrollbar {
        width: 4px;
      }
      
      .testimonial-content::-webkit-scrollbar-track {
        background: transparent;
      }
      
      .testimonial-content::-webkit-scrollbar-thumb {
        background-color: rgba(90, 90, 120, 0.4);
        border-radius: 4px;
      }
      
      /* Borde base (visible siempre) */
      .testimonial-card::before {
        content: "";
        position: absolute;
        inset: 0;
        border-radius: inherit;
        padding: 1.2px; /* Borde ajustado a 1.2px */
        background: linear-gradient(
          135deg,
          rgba(90, 90, 120, 0.8),
          rgba(40, 40, 60, 0.9) 50%,
          rgba(90, 90, 120, 0.8)
        );
        mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
        -webkit-mask-composite: xor;
        mask-composite: exclude;
        z-index: 1;
        pointer-events: none;
      }
      
      /* Efecto spotlight (visible con el mouse) - para tarjetas con mouse dentro */
      .testimonial-card.mouse-inside::after {
        content: "";
        position: absolute;
        inset: 0;
        border-radius: inherit;
        padding: 1.2px;
        background: linear-gradient(
          135deg,
          rgba(56, 189, 248, 1),     /* Azul cielo intenso */
          rgba(20, 184, 166, 0.9),    /* Turquesa */
          rgba(3, 105, 161, 0.8),     /* Azul medio */
          rgba(3, 105, 161, 0.7)      /* Azul medio más suave */
        );
        mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
        -webkit-mask-composite: xor;
        mask-composite: exclude;
        z-index: 1;
        pointer-events: none;
        opacity: 0;
        transition: opacity 1.2s cubic-bezier(0.19, 1, 0.22, 1); /* Transición más lenta y suave */
      }
      
      /* Efecto spotlight para tarjetas cercanas - efecto radial */
      .testimonial-card.mouse-nearby::after {
        content: "";
        position: absolute;
        inset: 0;
        border-radius: inherit;
        padding: 1.2px;
        background: radial-gradient(
          500px circle at var(--x) var(--y),
          rgba(56, 189, 248, 1),     /* Azul cielo intenso en el centro */
          rgba(20, 184, 166, 0.9) 15%, /* Turquesa cerca del centro */
          rgba(3, 105, 161, 0.7) 30%,  /* Azul medio a media distancia */
          rgba(3, 105, 161, 0.1) 60%,  /* Casi invisible en los bordes */
          rgba(38, 38, 44, 0) 80%      /* Totalmente invisible afuera */
        );
        mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
        -webkit-mask-composite: xor;
        mask-composite: exclude;
        z-index: 1;
        pointer-events: none;
        opacity: 0;
        transition: opacity 1.2s cubic-bezier(0.19, 1, 0.22, 1); /* Transición más lenta y suave */
      }
      
      /* Activación del efecto según estado - con transición mejorada */
      .testimonial-card.active::after {
        transition: opacity 1.2s cubic-bezier(0.19, 1, 0.22, 1); /* Transición suavizada */
      }
      
      .testimonial-card.active.mouse-inside::after {
        opacity: 0.9;
      }
      
      .testimonial-card.active.mouse-nearby::after {
        opacity: 0.6;
      }
      
      /* Desactivar explícitamente spotlight en tarjetas inactivas */
      .testimonial-card.inactive::after {
        opacity: 0 !important;
      }
      
      /* Transición suave para todos los estados */
      .testimonial-card::after {
        transition-property: opacity, transform;
        transition-duration: 1.2s, 0.3s;
        transition-timing-function: cubic-bezier(0.19, 1, 0.22, 1), ease;
        will-change: opacity;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      const cards = document.querySelectorAll('.testimonial-card');
      
      // Quitar todas las clases mouse-inside y mouse-nearby primero
      cards.forEach(card => {
        const cardEl = card as HTMLElement;
        cardEl.classList.remove('mouse-inside', 'mouse-nearby');
      });
      
      // Actualizar posición relativa para cada tarjeta
      cards.forEach(card => {
        const cardEl = card as HTMLElement;
        const cardRect = cardEl.getBoundingClientRect();
        
        // Comprobar si el mouse está dentro de esta tarjeta específica
        const isMouseInside = (
          e.clientX >= cardRect.left &&
          e.clientX <= cardRect.right &&
          e.clientY >= cardRect.top &&
          e.clientY <= cardRect.bottom
        );
        
        // Margen de detección para tarjetas cercanas
        const cardMargin = 100; // Mayor área de detección
        
        // Verificar si el mouse está cerca de esta tarjeta específica (pero no dentro)
        const isNearCard = (
          !isMouseInside &&
          e.clientX >= cardRect.left - cardMargin &&
          e.clientX <= cardRect.right + cardMargin &&
          e.clientY >= cardRect.top - cardMargin &&
          e.clientY <= cardRect.bottom + cardMargin
        );
        
        // Calcular posición del mouse relativa a esta tarjeta específica
        const cardX = e.clientX - cardRect.left;
        const cardY = e.clientY - cardRect.top;
        
        // Aplicar posición a la tarjeta para el efecto radial
        cardEl.style.setProperty('--x', `${cardX}px`);
        cardEl.style.setProperty('--y', `${cardY}px`);
        
        // Añadir clases según corresponda
        if (isMouseInside) {
          cardEl.classList.add('mouse-inside');
        } else if (isNearCard) {
          cardEl.classList.add('mouse-nearby');
        }
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mounted, mousePosition]);

  return (
    <div className="testimonial-grid">
      {children}
    </div>
  );
}

// Componente principal de testimonios
export default function Testimonials() {
  const masonryContainer = useMasonry();
  const [category, setCategory] = useState<number>(1);

  // Eliminadas las referencias y animaciones que no se desean

  return (
    <section className="relative py-20 overflow-hidden bg-black text-white">
      {/* Fondo con gradient azul oscuro */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-blue-950 to-black opacity-90" />
      
      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
        {/* Encabezado de sección */}
        <div className="mx-auto max-w-3xl pb-12 text-center">
          <div className="mb-4">
            <h2 className="font-nacelle text-4xl font-semibold md:text-5xl bg-gradient-to-t from-gray-400 to-white bg-clip-text text-transparent">
              Testimonios de Éxito
            </h2>
          </div>
          
          <div>
            <p className="text-lg text-gray-300">
              Descubre cómo nuestras soluciones tecnológicas han impulsado el crecimiento 
              y la innovación en empresas líderes de diversos sectores.
            </p>
          </div>
        </div>

        {/* Botones de categoría */}
        <div className="flex justify-center pb-12 max-md:hidden md:pb-16">
          <div className="relative inline-flex flex-wrap justify-center rounded-xl bg-gray-800/40 p-1">
            {/* Botón #1 */}
            <button
              className={`flex h-8 flex-1 items-center gap-2.5 whitespace-nowrap rounded-full px-3 text-sm font-medium transition-colors focus-visible:outline-hidden focus-visible:ring-3 focus-visible:ring-indigo-200 ${
                category === 1 
                  ? "relative bg-gradient-to-b from-gray-900 via-gray-800/60 to-gray-900" 
                  : "opacity-65 transition-opacity hover:opacity-90"
              }`}
              aria-pressed={category === 1}
              onClick={() => setCategory(1)}
            >
              <svg
                className={`fill-current ${category === 1 ? "text-indigo-500" : "text-gray-600"}`}
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
              >
                <path d="M.062 10.003a1 1 0 0 1 1.947.455c-.019.08.01.152.078.19l5.83 3.333c.052.03.115.03.168 0l5.83-3.333a.163.163 0 0 0 .078-.188 1 1 0 0 1 1.947-.459 2.161 2.161 0 0 1-1.032 2.384l-5.83 3.331a2.168 2.168 0 0 1-2.154 0l-5.83-3.331a2.162 2.162 0 0 1-1.032-2.382Zm7.854-7.981-5.83 3.332a.17.17 0 0 0 0 .295l5.828 3.33c.054.031.118.031.17.002l5.83-3.333a.17.17 0 0 0 0-.294L8.085 2.023a.172.172 0 0 0-.17-.001ZM9.076.285l5.83 3.332c1.458.833 1.458 2.935 0 3.768l-5.83 3.333c-.667.38-1.485.38-2.153-.001l-5.83-3.332c-1.457-.833-1.457-2.935 0-3.767L6.925.285a2.173 2.173 0 0 1 2.15 0Z" />
              </svg>
              <span className="text-white">Ver Todos</span>
            </button>
            {/* Botón #2 */}
            <button
              className={`flex h-8 flex-1 items-center gap-2.5 whitespace-nowrap rounded-full px-3 text-sm font-medium transition-colors focus-visible:outline-hidden focus-visible:ring-3 focus-visible:ring-indigo-200 ${
                category === 2 
                  ? "relative bg-gradient-to-b from-gray-900 via-gray-800/60 to-gray-900" 
                  : "opacity-65 transition-opacity hover:opacity-90"
              }`}
              aria-pressed={category === 2}
              onClick={() => setCategory(2)}
            >
              <svg
                className={`fill-current ${category === 2 ? "text-indigo-500" : "text-gray-600"}`}
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
              >
                <path d="M6.5 3.5a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM9 6.855A3.502 3.502 0 0 0 8 0a3.5 3.5 0 0 0-1 6.855v1.656L5.534 9.65a3.5 3.5 0 1 0 1.229 1.578L8 10.267l1.238.962a3.5 3.5 0 1 0 1.229-1.578L9 8.511V6.855Zm2.303 4.74c.005-.005.01-.01.013-.016l.012-.016a1.5 1.5 0 1 1-.025.032ZM3.5 11A1.497 1.497 0 0 1 5 12.5 1.5 1.5 0 1 1 3.5 11Z" />
              </svg>
              <span className="text-white">Plataformas</span>
            </button>
            {/* Botón #3 */}
            <button
              className={`flex h-8 flex-1 items-center gap-2.5 whitespace-nowrap rounded-full px-3 text-sm font-medium transition-colors focus-visible:outline-hidden focus-visible:ring-3 focus-visible:ring-indigo-200 ${
                category === 3 
                  ? "relative bg-gradient-to-b from-gray-900 via-gray-800/60 to-gray-900" 
                  : "opacity-65 transition-opacity hover:opacity-90"
              }`}
              aria-pressed={category === 3}
              onClick={() => setCategory(3)}
            >
              <svg
                className={`fill-current ${category === 3 ? "text-indigo-500" : "text-gray-600"}`}
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
              >
                <path d="M2.428 10c.665-1.815 1.98-3.604 3.44-4.802-.6-1.807-1.443-3.079-2.29-3.18-1.91-.227-2.246 2.04-.174 2.962a1 1 0 1 1-.813 1.827C-1.407 5.028-.589-.491 3.815.032c1.605.191 2.925 1.811 3.79 4.07.979-.427 1.937-.51 2.735-.092.818.429 1.143 1.123 1.294 2.148.015.1.022.149.043.32.542-.537 1.003-.797 1.693-.622.64.162.894.493 1.195 1.147l.018.04a1 1 0 0 1 1.133 1.61c-.46.47-1.12.574-1.744.398a1.661 1.661 0 0 1-.87-.592 2.127 2.127 0 0 1-.224-.349 3.225 3.225 0 0 1-.55.477c-.377.253-.8.368-1.259.267-.993-.218-1.21-.779-1.367-2.05-.027-.22-.033-.262-.046-.353-.067-.452-.144-.617-.244-.67-.225-.118-.665-.013-1.206.278.297 1.243.475 2.587.516 3.941H15a1 1 0 0 1 0 2H8.68l-.025.285c-.173 1.918-.906 3.381-2.654 3.668-1.5.246-3.013-.47-3.677-1.858-.29-.637-.39-1.35-.342-2.095H1a1 1 0 0 1 0-2h1.428Zm2.11 0h2.175a18.602 18.602 0 0 0-.284-2.577c-.205.202-.408.42-.606.654A9.596 9.596 0 0 0 4.537 10Zm2.135 2H3.942c-.032.465.03.888.194 1.25.258.538.89.836 1.54.73.546-.09.888-.772.988-1.875L6.673 12Z" />
              </svg>
              <span className="text-white">Páginas web</span>
            </button>
            {/* Botón #4 */}
            <button
              className={`flex h-8 flex-1 items-center gap-2.5 whitespace-nowrap rounded-full px-3 text-sm font-medium transition-colors focus-visible:outline-hidden focus-visible:ring-3 focus-visible:ring-indigo-200 ${
                category === 4 
                  ? "relative bg-gradient-to-b from-gray-900 via-gray-800/60 to-gray-900" 
                  : "opacity-65 transition-opacity hover:opacity-90"
              }`}
              aria-pressed={category === 4}
              onClick={() => setCategory(4)}
            >
              <svg
                className={`fill-current ${category === 4 ? "text-indigo-500" : "text-gray-600"}`}
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
              >
                <path d="M3.757 3.758a6 6 0 0 1 8.485 8.485 5.992 5.992 0 0 1-5.301 1.664 1 1 0 1 0-.351 1.969 8 8 0 1 0-4.247-2.218 1 1 0 0 0 1.415-.001L9.12 8.294v1.827a1 1 0 1 0 2 0v-4.2a.997.997 0 0 0-1-1.042H5.879a1 1 0 1 0 0 2h1.829l-4.599 4.598a6 6 0 0 1 .648-7.719Z" />
              </svg>
              <span className="text-white">Apps móviles</span>
            </button>
          </div>
        </div>

        {/* Tarjetas de testimonios con tamaño uniforme */}
        <SpotlightGrid>
          <div
            className="mx-auto grid max-w-sm items-start gap-6 sm:max-w-none sm:grid-cols-2 lg:grid-cols-3"
            ref={masonryContainer}
          >
            {testimonials.map((testimonial, index) => {
              // Determinar si el testimonio está activo para la categoría actual
              const isActive = testimonial.categories.includes(category);
              
              return (
                <div 
                  key={index} 
                  className={`group ${!isActive ? "opacity-30" : ""}`}
                >
                  <TestimonialCard 
                    testimonial={testimonial} 
                    category={category}
                    isActive={isActive}
                  >
                    {testimonial.content}
                  </TestimonialCard>
                </div>
              );
            })}
          </div>
        </SpotlightGrid>
      </div>
    </section>
  );
}

// Componente de tarjeta de testimonio
function TestimonialCard({ testimonial, category, isActive, children }: TestimonialCardProps) {
  return (
    <article className={`testimonial-card p-5 ${isActive ? 'active' : 'inactive'}`}>
      <div className="testimonial-content flex flex-col gap-4">
        {/* Logo del cliente - Comentado temporalmente
        <div>
          <Image src={testimonial.clientImg} height={36} alt="Client logo" />
        </div>
        */}
        <p className="text-indigo-200/65 before:content-['“'] after:content-['”']">
          {children}
        </p>
        <div className="mt-auto flex items-center gap-3">
          {/* Foto del testimonio - Comentada temporalmente
          <Image
            className="inline-flex shrink-0 rounded-full"
            src={testimonial.img}
            width={36}
            height={36}
            alt={testimonial.name}
          />
          */}
          <div className="text-sm font-medium text-gray-200">
            <span>{testimonial.name}</span>
            <span className="text-gray-700"> - </span>
            <a
              className="text-indigo-200/65 transition-colors hover:text-indigo-500"
              href="#0"
            >
              {testimonial.company}
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}