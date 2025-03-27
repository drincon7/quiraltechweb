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
  
  // Define smooth orb animation variants
  const orbVariants = {
    initial: { 
      opacity: 0, 
      scale: 0.5 
    },
    animate: {
      opacity: 1,
      scale: 0.9,
      transition: {
        opacity: { duration: 1.2, ease: [0.25, 0.1, 0.25, 1] },
        scale: { 
          duration: 1.8, 
          ease: [0.34, 1.25, 0.64, 1] // Smoother ease curve
        }
      }
    }
  };

  return (
    <section 
      ref={sectionRef} 
      className="relative h-screen w-full overflow-hidden"
    >
      {/* Orb container with improved animation */}
      <div className="absolute inset-0 flex items-center justify-center z-30" style={{ transform: 'translateY(-5%)' }}>
        <motion.div 
          style={{ 
            width: '100%', 
            height: '100%', 
            position: 'relative', 
            overflow: 'visible',
            willChange: 'transform, opacity' // Hint for browser optimization
          }}
          variants={orbVariants}
          initial="initial"
          animate="animate"
          className="transform-gpu" // Force GPU acceleration
        >
          <Orb 
            hue={50} 
            hoverIntensity={0}
            rotateOnHover={false}
            forceHoverState={true}
          />
        </motion.div>
      </div>
      
      {/* Text overlay with coordinated timing */}
      <div className="absolute inset-0 flex items-center justify-center z-40" style={{ transform: 'translateY(-5%)' }}>
        <div className="text-center" style={{ position: 'absolute' }}>
          <h1 className="flex flex-col justify-center items-center font-nacelle text-4xl font-semibold text-[4rem]">
            <div className="flex flex-col">
              <SplitText 
                text="Hacemos"
                className="text-white"
                delay={25} // Faster animation
                animationFrom={{ opacity: 0, transform: "translate3d(0,20px,0)" }}
                animationTo={{ opacity: 1, transform: "translate3d(0,0,0)" }}
              />
              <SplitText 
                text="Tecnología con"
                className="text-white mb-4"
                delay={40} // Slightly staggered delay
                animationFrom={{ opacity: 0, transform: "translate3d(0,20px,0)" }}
                animationTo={{ opacity: 1, transform: "translate3d(0,0,0)" }}
              />
            </div>
            <motion.div 
              className="inline-flex justify-center overflow-visible transform-gpu" // Force GPU acceleration
              layout="size"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ 
                type: "spring", 
                damping: 24, // Increased damping for smoother motion
                stiffness: 110, // Increased stiffness for more responsive animation
                bounce: 0.08, // Reduced bounce for cleaner animation
                delay: 0.4 // Coordinated with previous animations
              }}
            >
              <RotatingText 
                texts={rotatingTexts}
                mainClassName="bg-blue-500 text-white overflow-hidden py-2 justify-center rounded-lg"
                staggerFrom="center"
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: "-120%", opacity: 0 }}
                staggerDuration={0.02} // Small stagger for smoother text animation
                splitBy="words"
                splitLevelClassName="overflow-hidden"
                transition={{ 
                  type: "spring", 
                  damping: 28, // Increased damping
                  stiffness: 140 // Increased stiffness
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