import Image from "next/image";
import WorflowImg01 from "@/public/images/workflow-01.png";
import WorflowImg02 from "@/public/images/workflow-02.png";
import WorflowImg03 from "@/public/images/workflow-03.png";
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
    title: "Built-in Tools",
    description: "Streamline the product development flow with a content platform that's aligned across specs and insights.",
    pixelCanvas: {
      enabled: true,
      colors: ['#4f46e5', '#818cf8', '#6366f1'],
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
    title: "Scale Instantly",
    description: "Streamline the product development flow with a content platform that's aligned across specs and insights.",
    pixelCanvas: {
      enabled: true,
      colors: ['#818cf8', '#6366f1', '#4f46e5'],
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
    title: "Tailored Flows",
    description: "Streamline the product development flow with a content platform that's aligned across specs and insights.",
    pixelCanvas: {
      enabled: true,
      colors: ['#6366f1', '#4f46e5', '#818cf8'],
      gap: 5,
      speed: 20
    }
  }
];

export default function Workflows() {
  return (
    <section>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="pb-12 md:pb-20">
          {/* Section header */}
          <div className="mx-auto max-w-3xl pb-12 text-center md:pb-20">
            <div className="inline-flex items-center gap-3 pb-3 before:h-px before:w-8 before:bg-linear-to-r before:from-transparent before:to-indigo-200/50 after:h-px after:w-8 after:bg-linear-to-l after:from-transparent after:to-indigo-200/50">
              <span className="inline-flex bg-linear-to-r from-indigo-500 to-indigo-200 bg-clip-text text-transparent">
                Innovación sin límites
              </span>
            </div>
            <h2 className="animate-[gradient_6s_linear_infinite] bg-[linear-gradient(to_right,var(--color-gray-200),var(--color-indigo-200),var(--color-gray-50),var(--color-indigo-300),var(--color-gray-200))] bg-[length:200%_auto] bg-clip-text pb-4 font-nacelle text-3xl font-semibold text-transparent md:text-4xl">
              Soluciones Digitales a Medida
            </h2>
            <p className="text-lg text-indigo-200/65">
              Impulsamos tu transformación digital con plataformas, sitios web, apps móviles y experiencias en realidad virtual. Conectamos tecnología y creatividad para potenciar tu negocio.
            </p>
          </div>

          {/* Spotlight items */}
          <Spotlight className="group mx-auto grid max-w-sm items-start gap-6 lg:max-w-none lg:grid-cols-3">
            {cards.map((card, index) => (
              <Card
                key={index}
                image={card.image}
                title={card.title}
                description={card.description}
                pixelCanvas={card.pixelCanvas}
                badge={{ 
                  text: card.title,
                  className: "bg-gray-800/40 before:[background:linear-gradient(to_bottom,theme(colors.gray.700/0.15),theme(colors.gray.700/0.5))_border-box]"
                }}
              />
            ))}
          </Spotlight>
        </div>
      </div>
    </section>
  );
}