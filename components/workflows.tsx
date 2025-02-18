import Image from "next/image";
import WorflowImg01 from "@/public/images/workflow-01.png";
import WorflowImg02 from "@/public/images/workflow-02.png";
import WorflowImg03 from "@/public/images/workflow-03.png";
import WorflowImg04 from "@/public/images/workflow-04.jpg"; // Necesitarás agregar esta imagen
import Spotlight from "@/components/spotlight";
import Card from "./card";

const cards = [
  {
    image: {
      src: WorflowImg01,
      alt: "Workflow 01",
      width: 350,
      height: 288
    },
    title: "Desarrollo de Plataformas",
    description: "Creamos soluciones escalables y personalizadas para optimizar procesos, conectar datos y potenciar tu negocio con tecnología a la medida.",
    pixelCanvas: {
      enabled: true,
      colors: ['#5eead4', '#2dd4bf', '#14b8a6'],
      gap: 5,
      speed: 20
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
    description: "Diseñamos y desarrollamos sitios web rápidos, intuitivos y optimizados, garantizando una experiencia impecable para tus usuarios.",
    pixelCanvas: {
      enabled: true,
      colors: ['#5eead4', '#2dd4bf', '#14b8a6'], // Igualado a los colores de la primera tarjeta
      gap: 5,
      speed: 20
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
    description: "Convertimos ideas en aplicaciones móviles funcionales y dinámicas, diseñadas para brindar rendimiento, usabilidad y escalabilidad.",
    pixelCanvas: {
      enabled: true,
      colors: ['#5eead4', '#2dd4bf', '#14b8a6'], // Igualado a los colores de la primera tarjeta
      gap: 5,
      speed: 20
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
    description: "Llevamos la innovación al siguiente nivel con experiencias inmersivas que transforman la forma en que interactúas con el mundo digital.",
    pixelCanvas: {
      enabled: true,
      colors: ['#5eead4', '#2dd4bf', '#14b8a6'], // Igualado a los colores de la primera tarjeta
      gap: 5,
      speed: 20
    }
  }
]


export default function Workflows() {
  return (
    <section>
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="pb-12 md:pb-20">
          {/* Section header */}
          <div className="mx-auto max-w-3xl pb-12 text-center md:pb-20">
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

          {/* Spotlight items */}
          <Spotlight className="group mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
            {cards.map((card, index) => (
              <Card
                key={index}
                image={card.image}
                title={card.title}
                description={card.description}
                pixelCanvas={card.pixelCanvas}
                badge={{ 
                  text: card.title,
                  className: "bg-teal-800/40 before:[background:linear-gradient(to_bottom,theme(colors.gray.700/0.15),theme(colors.gray.700/0.5))_border-box]"
                }}
              />
            ))}
          </Spotlight>
        </div>
      </div>
    </section>
  );
}



//<a href="https://storyset.com/online">Online illustrations by Storyset</a> licencia de imagenes
