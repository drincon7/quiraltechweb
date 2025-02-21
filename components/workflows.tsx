'use client'

import React, { ReactElement, useState } from 'react';
import Image from "next/image";
import WorflowImg01 from "@/public/images/workflow-01.png";
import WorflowImg02 from "@/public/images/workflow-02.png";
import WorflowImg03 from "@/public/images/workflow-03.png";
import WorflowImg04 from "@/public/images/workflow-04.png";
import Spotlight from "@/components/spotlight";
import Card from "./card";
import PixelCanvas from '@/components/pixel-canvas';

interface PixelCanvasConfig {
  enabled: boolean;
  colors: string[];
  gap: number;
  speed: number;
  size: number;
}

interface CardImage {
  src: any;
  alt: string;
  width: number;
  height: number;
}

interface CardBadge {
  text: string;
  className: string;
}

interface CardProps {
  image: CardImage;
  title: string;
  description: string;
  pixelCanvas: PixelCanvasConfig;
  badge: CardBadge;
}

interface CardWrapperProps {
  children: ReactElement<CardProps>;
  className?: string;
}

const cards: Array<{
  image: CardImage;
  title: string;
  description: string;
  pixelCanvas: PixelCanvasConfig;
}> = [
  {
    image: {
      src: WorflowImg01,
      alt: "Workflow 01",
      width: 350,
      height: 288
    },
    title: "Desarrollo de Plataformas",
    description: "Creamos soluciones escalables y personalizadas para optimizar procesos.",
    pixelCanvas: {
      enabled: true,
      colors: ['#5eead4', '#2dd4bf', '#14b8a6'],
      gap: 5,
      speed: 20,
      size: 200
    }
  },
  {
    image: {
      src: WorflowImg02,
      alt: "Workflow 02", 
      width: 350,
      height: 288
    },
    title: "Páginas Web",
    description: "Diseñamos y desarrollamos sitios web rápidos e intuitivos.",
    pixelCanvas: {
      enabled: true,
      colors: ['#5eead4', '#2dd4bf', '#14b8a6'],
      gap: 5,
      speed: 20,
      size: 200
    }
  },
  {
    image: {
      src: WorflowImg03,
      alt: "Workflow 03",
      width: 350,
      height: 288
    },
    title: "Apps Móviles",
    description: "Convertimos ideas en aplicaciones móviles funcionales y dinámicas.",
    pixelCanvas: {
      enabled: true,
      colors: ['#5eead4', '#2dd4bf', '#14b8a6'],
      gap: 5,
      speed: 20,
      size: 200
    }
  },
  {
    image: {
      src: WorflowImg04,
      alt: "Workflow 04",
      width: 350,
      height: 288
    },
    title: "Realidad Virtual",
    description: "Experiencias inmersivas que transforman la interacción digital.",
    pixelCanvas: {
      enabled: true,
      colors: ['#5eead4', '#2dd4bf', '#14b8a6'],
      gap: 5,
      speed: 20,
      size: 200
    }
  }
];

const CardWrapper: React.FC<CardWrapperProps> = ({ children, className = '' }) => {
  const cardProps = children.props;
  const [isHovered, setIsHovered] = useState(false);
  
  return (
      <div 
        className={`relative group overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:shadow-2xl h-[400px] w-[300px] ${className}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
      {/* Efecto Pixel Canvas */}
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full">
          <PixelCanvas 
            colors={cardProps.pixelCanvas.colors}
            gap={cardProps.pixelCanvas.gap}
            speed={cardProps.pixelCanvas.speed}
            isActive={isHovered}
          />
        </div>
      </div>
      
      <div className="relative z-10">
        {/* Imagen con proporción fija */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={cardProps.image.src}
            alt={cardProps.image.alt}
            className="object-cover w-full h-full"
            width={cardProps.image.width}
            height={cardProps.image.height}
          />
        </div>
        
        {/* Área de contenido con fondo semitransparente */}
        <div className="p-3 bg-clay h-[150px] mt-auto"> {/* Altura fija para el área de texto */}
        <h3 className="text-xl font-bold text-white mb-2 line-clamp-1"> {/* Limita a 1 línea */}
          {cardProps.title}
        </h3>
        <p className="text-white text-sm font-bold line-clamp-3"> {/* Limita a 3 líneas */}
          {cardProps.description}
        </p>
      </div>
      </div>  
    </div>
  );
};


const Workflows: React.FC = () => {
  return (
    <section className="relative py-30 overflow-hidden bg-gray-50"> {/* Reducido py-16 a py-12 */}
      {/* Agregar imagen de fondo con overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/background.jpg" // Asegúrate de tener esta imagen en tu proyecto
          alt="Background Pattern"
          fill
          className="object-cover" 
        />
        {/* Overlay con color */}
        <div className="absolute inset-0" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
        <div className="pb-8 md:pb-12"> 
          <div className="mx-auto max-w-3xl pb-8 text-center md:pb-12"> {/* Reducido pb-12 a pb-8 y md:pb-20 a md:pb-12 */}
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

        <div className="max-w-[100vw] mx-auto px-4">
          <div className="flex flex-nowrap gap-8">
            {cards.map((card, index) => (
              <div key={index} className="w-[280px]">
                <CardWrapper>
                  <Card
                    image={card.image}
                    title={card.title}
                    description={card.description}
                    pixelCanvas={card.pixelCanvas}
                    badge={{
                      text: card.title,
                      className: "bg-teal-800/40"
                    }}
                  />
                </CardWrapper>
              </div>
            ))}
          </div>        
        </div>
      </div>
    </section>
  );
};

export default Workflows;
