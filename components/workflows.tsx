'use client'

import React, { useState } from 'react';
import Image from "next/image";
import WorflowImg01 from "@/public/images/workflow-01.png";
import WorflowImg02 from "@/public/images/workflow-02.png";
import WorflowImg03 from "@/public/images/workflow-03.png";
import WorflowImg04 from "@/public/images/workflow-04.png";
import Card from "./card"; // Importa el componente Card optimizado

interface PixelCanvasConfig {
  enabled: boolean;
  colors: string[];
  gap: number;
  speed: number;
}

interface CardData {
  image: {
    src: any;
    alt: string;
    width?: number;
    height?: number;
  };
  title: string;
  description: string;
  pixelCanvas: PixelCanvasConfig;
}

// Datos de las cards
const cards: CardData[] = [
  {
    image: {
      src: WorflowImg01,
      alt: "Workflow 01",
    },
    title: "Desarrollo de Plataformas",
    description: "Creamos soluciones escalables y personalizadas para optimizar procesos.",
    pixelCanvas: {
      enabled: true,
      colors: ['#5eead4', '#2dd4bf', '#14b8a6'],
      gap: 5,
      speed: 20,
    }
  },
  {
    image: {
      src: WorflowImg02,
      alt: "Workflow 02", 
    },
    title: "Páginas Web",
    description: "Diseñamos y desarrollamos sitios web rápidos e intuitivos.",
    pixelCanvas: {
      enabled: true,
      colors: ['#5eead4', '#2dd4bf', '#14b8a6'],
      gap: 5,
      speed: 20,
    }
  },
  {
    image: {
      src: WorflowImg03,
      alt: "Workflow 03",
    },
    title: "Apps Móviles",
    description: "Convertimos ideas en aplicaciones móviles funcionales y dinámicas.",
    pixelCanvas: {
      enabled: true,
      colors: ['#5eead4', '#2dd4bf', '#14b8a6'],
      gap: 5,
      speed: 20,
    }
  },
  {
    image: {
      src: WorflowImg04,
      alt: "Workflow 04",
    },
    title: "Realidad Virtual",
    description: "Experiencias inmersivas que transforman la interacción digital.",
    pixelCanvas: {
      enabled: true,
      colors: ['#5eead4', '#2dd4bf', '#14b8a6'],
      gap: 5,
      speed: 20,
    }
  }
];

const Workflows: React.FC = () => {
  // Estado para seguir qué card está activa (para efectos visuales)
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section className="relative py-40 overflow-hidden bg-black"> {/* Cambiado a fondo negro */}
      {/* Fondo con overlay */}
      <div className="absolute inset-0 z-0 opacity-30"> {/* Reducido opacity para fondo más oscuro */}
        <Image
          src="/background.jpg"
          alt="Background Pattern"
          fill
          className="object-cover" 
        />
        <div className="absolute inset-0 bg-black opacity-70" /> {/* Overlay oscuro */}
      </div>

      {/* Estilos para animación de glow */}
      <style jsx global>{`
        @keyframes glowAnimation {
          0% { box-shadow: 0 0 5px #14b8a6, 0 0 10px #14b8a6; }
          50% { box-shadow: 0 0 10px #ffeb3b, 0 0 20px #ffeb3b; }
          100% { box-shadow: 0 0 5px #14b8a6, 0 0 10px #14b8a6; }
        }
        
        .card-container {
          height: 500px;
          width: 280px; /* Ancho reducido para que quepan todas */
          position: relative;
          transition: transform 0.3s ease;
        }
        
        .card-container:hover {
          transform: translateY(-10px);
        }
        
        .card-glow-border {
          position: absolute;
          inset: -2px;
          border-radius: 16px;
          z-index: 5;
          pointer-events: none;
          transition: opacity 0.3s ease;
        }
        
        .card-container:hover .card-glow-border {
          animation: glowAnimation 3s infinite;
          opacity: 1;
        }
      `}</style>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
        <div className="pb-8 md:pb-12"> 
          <div className="mx-auto max-w-3xl pb-8 text-center md:pb-12">
            <div className="inline-flex items-center gap-3 pb-3 before:h-px before:w-8 before:bg-linear-to-r before:from-transparent before:to-blue-200/50 after:h-px after:w-8 after:bg-linear-to-l after:from-transparent after:to-blue-200/50">
              <span className="inline-flex bg-gradient-to-r from-blue-500 to-teal-500 bg-clip-text text-transparent md:text-xl">
                Innovación sin límites
              </span>
            </div>
            <h2 className="animate-[gradient_6s_linear_infinite] bg-gradient-to-r from-blue-500 via-teal-500 to-blue-500 bg-[length:200%_auto] bg-clip-text pb-4 font-nacelle text-3xl font-semibold text-transparent md:text-5xl">
              Soluciones Digitales a Medida
            </h2> 
            <p className="text-xl text-blue-400">
              Impulsamos tu transformación digital con plataformas, sitios web, apps móviles y experiencias en realidad virtual. Conectamos tecnología y creatividad para potenciar tu negocio.
            </p>
          </div>
        </div>

        {/* Grid layout para mostrar todas las cards */}
        <div className="mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
            {cards.map((card, index) => (
              <div 
                key={index} 
                className="card-container"
                onMouseEnter={() => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
              >
                {/* Borde con efecto glow */}
                <div 
                  className="card-glow-border"
                  style={{
                    border: `2px solid ${card.pixelCanvas.colors[0]}`,
                    boxShadow: `0 0 10px ${card.pixelCanvas.colors[0]}`,
                    opacity: activeIndex === index ? 1 : 0
                  }}
                />
                
                {/* Usa el componente Card optimizado con el fondo negro */}
                <Card
                  image={card.image}
                  title={card.title}
                  description={card.description}
                  pixelCanvas={{
                    ...card.pixelCanvas,
                    enabled: true
                  }}
                  badge={{
                    text: "Servicio",
                    className: "bg-teal-800/40"
                  }}
                  data-spotlight-active={activeIndex === index}
                  className="w-full h-full bg-black" // Fondo negro para la card
                />
              </div>
            ))}
          </div>        
        </div>
      </div>
    </section>
  );
};

export default Workflows;