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
      {/* Orb container - Making it larger */}
      <div className="absolute inset-0 flex items-center justify-center" style={{ transform: 'translateY(-5%)' }}>
        <motion.div 
          style={{ width: '120%', height: '900px', position: 'relative' }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ 
            duration: 0.8, 
            ease: "easeOut" 
          }}
        >
          <Orb 
            hue={50} // Color blanco/neutro
            hoverIntensity={0}
            rotateOnHover={false}
            forceHoverState={true}
          />
        </motion.div>
      </div>
      
      {/* Text overlay centered within the Orb */}
      <div className="absolute inset-0 flex items-center justify-center" style={{ transform: 'translateY(-5%)' }}>
        <div className="text-center z-10" style={{ position: 'absolute' }}>
          <h1 className="flex flex-col justify-center items-center font-nacelle text-4xl font-semibold text-[4rem]">
            <div className="flex flex-col">
              <SplitText 
                text="Hacemos"
                className="text-white"
                delay={50} // Animación más rápida
                animationFrom={{ opacity: 0, transform: "translate3d(0,20px,0)" }}
                animationTo={{ opacity: 1, transform: "translate3d(0,0,0)" }}
              />
              <SplitText 
                text="Tecnología con"
                className="text-white mb-4"
                delay={50} // Animación más rápida
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
                delay: 0.5 // Delay para que aparezca después del SplitText
              }}
            >
              <RotatingText 
                texts={rotatingTexts}
                mainClassName="bg-blue-500 text-white overflow-hidden py-2 justify-center rounded-lg"
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
                sizeMode="preCalculate"
                paddingFactor={1.2}
              />
            </motion.div>
          </h1>
        </div>
      </div>
    </section>
  );
}