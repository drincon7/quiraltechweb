'use client'

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function Cta() {
  // References for scroll animation detection
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  };
  
  const logoVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.7, ease: "easeOut" }
    }
  };
  
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" }
    }
  };
  
  const buttonVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: { 
        duration: 0.5, 
        delay: 0.3,
        ease: "easeOut" 
      }
    }
  };

  return (
    <section 
      ref={sectionRef}
      className="relative bg-black text-white py-16"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="grid grid-cols-4 items-center border border-gray-800 rounded-lg overflow-hidden"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Logo section - smaller, square */}
          <motion.div 
            className="col-span-1 flex items-center justify-center p-8 border-r border-gray-800 h-full"
            variants={logoVariants}
          >
            <div className="w-36 h-36 flex items-center justify-center">
              <Image
                src="/images/isologo.svg"
                width={100}
                height={100}
                alt="IsoLogo"
                className="max-w-full"
              />
            </div>
          </motion.div>
          
          {/* Text and button section - larger, rectangular */}
          <div className="col-span-3 flex flex-col items-center justify-center p-8">
            <motion.h2 
              className="font-nacelle text-4xl font-semibold mb-6 bg-gradient-to-t from-gray-400 to-white bg-clip-text text-transparent"
              variants={textVariants}
            >
              Listo para empezar?
            </motion.h2>
            
            <motion.a
              className="inline-flex items-center px-8 py-3 bg-white text-black rounded-full hover:bg-gray-100 transition-colors"
              href="#0"
              variants={buttonVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>Conversemos!</span>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}