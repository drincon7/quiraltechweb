"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Logo from "./logo";
import StarBorder from './StarBorder/StarBorder';
import ShinyText from './ShinyText/ShinyText';
import "./custom-header.css";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";

export default function Header() {
  const [hidden, setHidden] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { scrollY } = useScroll();
  const headerRef = useRef(null);
  
  // Evitar cualquier animación o cambio de estado hasta que el componente esté completamente montado
  useEffect(() => {
    // Aplazamos marcar como montado hasta después de la hidratación/renderizado inicial
    const timer = setTimeout(() => {
      setMounted(true);
    }, 0);
    
    return () => clearTimeout(timer);
  }, []);
  
  useMotionValueEvent(scrollY, "change", (latest) => {
    if (!mounted) return;
    
    const previous = scrollY.getPrevious() || 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  return (
    <motion.header 
      ref={headerRef}
      className="sticky top-2 z-50 w-full"
      initial={false}
      variants={{
        visible: { opacity: 1, y: 0 },
        hidden: { opacity: 0, y: -100 },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      style={{ height: '60px', zIndex: 9999 }}  // Forzar altura fija y z-index máximo directamente
    >
      <div className="mx-auto w-[95%] px-4">
        <StarBorder 
          as="div" 
          className="header-star-border w-full" 
          color="white"
          speed="6s"
        >
          <div className="flex items-center justify-between w-full h-full">
            {/* Site branding */}
            <div className="flex items-center h-full" style={{ width: '120px', height: '40px' }}>
              <Logo />
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center h-full space-x-8">
              <Link href="#servicios" className="text-white hover:text-gray-300 transition-colors duration-300">
                Servicios
              </Link>
              <Link href="#diferenciadores" className="text-white hover:text-gray-300 transition-colors duration-300">
                Diferenciadores
              </Link>
              <Link href="#testimonios" className="text-white hover:text-gray-300 transition-colors duration-300">
                Testimonios
              </Link>
            </nav>

            {/* Contact button */}
            <div className="flex items-center h-full">
              <Link
                href="/contacto"
                className="btn-sm px-4 py-1 rounded-full text-white bg-gray-800/80 border border-blue-500/50 transition-colors"
              >
                <ShinyText text="Contacto" disabled={false} speed={5} className="text-white" />
              </Link>
            </div>
          </div>
        </StarBorder>
      </div>
    </motion.header>
  );
}