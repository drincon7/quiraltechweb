"use client";

import React, { useRef } from 'react';
import { Fade } from "react-awesome-reveal";
import RotatingText from './ui/RotatingText/RotatingText';
import Orb from './ui/Orb/Orb';
import { motion } from 'framer-motion';
import SplitText from './ui/SplitText/SplitText';

export default function HeroHome() {
  const sectionRef = useRef<HTMLElement>(null);
  
  // Array de palabras para la rotación
  const rotatingTexts = [
    "propósito",
    "creatividad", 
    "futuro",
    "evolución",
    "excelencia",
    "progreso"
  ];

  return (
    <section 
      ref={sectionRef} 
      className="relative h-screen w-full overflow-hidden"
    >
      {/* Orb container - Sin restricciones que causen bordes rectos */}
      <div className="absolute inset-0 flex items-center justify-center z-30" style={{ transform: 'translateY(-5%)' }}>
        <motion.div 
          style={{ 
            position: 'absolute',
            width: '120%', 
            height: '900px'
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ 
            duration: 0.8, 
            ease: "easeOut" 
          }}
        >
          <Orb 
            hue={50}
            hoverIntensity={0}
            rotateOnHover={false}
            forceHoverState={true}
          />
        </motion.div>
      </div>
      
      {/* Text overlay centrado dentro del Orb */}
      <div className="absolute inset-0 flex items-center justify-center z-40" style={{ transform: 'translateY(-5%)' }}>
        <div className="text-center" style={{ position: 'absolute' }}>
        <h1 className="flex flex-col justify-center items-center font-nacelle">
          <div className="flex flex-col">
            <SplitText 
              text="Hacemos"
              className="text-white font-bold text-4xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-[4rem]"
              delay={25}
              animationFrom={{ opacity: 0, transform: "translate3d(0,20px,0)" }}
              animationTo={{ opacity: 1, transform: "translate3d(0,0,0)" }}
            />
            <SplitText 
              text="Tecnología con"
              className="text-white font-bold text-4xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-[4rem] mb-2 sm:mb-3 md:mb-4"
              delay={40}
              animationFrom={{ opacity: 0, transform: "translate3d(0,20px,0)" }}
              animationTo={{ opacity: 1, transform: "translate3d(0,0,0)" }}
            />
          </div>
          <motion.div 
            className="inline-flex justify-center overflow-visible"
            layout="size"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ 
              type: "spring", 
              damping: 15, 
              stiffness: 80,
              bounce: 0.1,
              delay: 0.5
            }}
          >
            <RotatingText 
              texts={rotatingTexts}
              mainClassName="bg-blue-500 text-white overflow-hidden text-4xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-[3.5rem] py-1 px-3 xs:py-1.5 sm:py-2 sm:px-4 rounded-lg inline-block"
              staggerFrom="center"
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "-120%", opacity: 0 }}
              staggerDuration={0}
              splitBy="words"
              splitLevelClassName="overflow-hidden"
              transition={{ 
                type: "spring", 
                damping: 15, 
                stiffness: 80
              }}
              rotationInterval={3000}
              animatePresenceMode="wait"
              sizeMode="adaptive" // Cambiado a adaptativo para mejor ajuste
              paddingFactor={1.1} // Reducido para un ajuste más preciso
            />
          </motion.div>
        </h1>
        </div>
      </div>
    </section>
  );
}