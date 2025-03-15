'use client'

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import CodeConsole from './CodeConsole';
import ShinyText from './ui/ShinyText/ShinyText';
import DecryptedText from './ui/DecryptedText/DecryptedText';

// Datos de las "consolas de código" que reemplazarán a las cards
const codeExamples = [
  {
    title: "Desarrollo de Plataformas",
    description: "Creamos soluciones escalables y personalizadas para optimizar procesos.",
    code: `// Ejemplo de arquitectura de microservicios
import { createMicroservice } from '@platform/core';

const userService = createMicroservice({
  name: 'user-service',
  routes: [
    { path: '/users', method: 'GET', handler: listUsers },
    { path: '/users/:id', method: 'GET', handler: getUserById }
  ],
  database: {
    connection: process.env.DB_CONNECTION,
    models: [ User, Profile, Permissions ]
  }
});`,
    language: 'javascript'
  },
  {
    title: "Páginas Web",
    description: "Diseñamos y desarrollamos sitios web rápidos e intuitivos.",
    code: `// Componente React con Next.js
'use client'

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);
  
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen bg-gradient-to-r from-blue-900 to-black"
    >
      <h1>Tu visión, nuestro código</h1>
    </motion.section>
  );
}`,
    language: 'jsx'
  },
  {
    title: "Apps Móviles",
    description: "Convertimos ideas en aplicaciones móviles funcionales y dinámicas.",
    code: `// Componente React Native con Expo
import React, { useCallback } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

export default function MainScreen() {
  const [fontsLoaded] = useFonts({
    'Poppins-Bold': require('./assets/fonts/Poppins-Bold.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <View onLayout={onLayoutRootView}>
      <Text>¡Tu App Móvil!</Text>
    </View>
  );
}`,
    language: 'jsx'
  },
  {
    title: "Realidad Virtual",
    description: "Experiencias inmersivas que transforman la interacción digital.",
    code: `// Escena con Three.js
import * as THREE from 'three';
import { VRButton } from 'three/examples/jsm/webxr/VRButton.js';

// Configuración de la escena
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);

// Cámara
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 1.6, 3);

// Renderer con soporte para VR
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.xr.enabled = true;
document.body.appendChild(renderer.domElement);
document.body.appendChild(VRButton.createButton(renderer));

// Objeto 3D interactivo
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshStandardMaterial({ 
  color: 0x5eead4 
});
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Iluminación
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(0, 5, 5);
scene.add(light);

// Loop de animación
renderer.setAnimationLoop(() => {
  cube.rotation.y += 0.01;
  renderer.render(scene, camera);
});`,
    language: 'javascript'
  }
];

const Workflows = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [textRevealed, setTextRevealed] = useState(false);
  const [titleAnimationComplete, setTitleAnimationComplete] = useState(false);

  // Referencias para la animación basada en scroll
  const headerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const consoleRef = useRef<HTMLDivElement>(null);

  // Estados para controlar la dirección de la animación
  const [direction, setDirection] = useState('next');
  const [slideAnimation, setSlideAnimation] = useState(false);

  // Detectar cuando los elementos entran en el viewport
  const headerInView = useInView(headerRef, { once: true, amount: 0.5 });
  const titleInView = useInView(titleRef, { once: true, amount: 0.5 });
  const descriptionInView = useInView(descriptionRef, { once: true, amount: 0.5 });
  const buttonInView = useInView(buttonRef, { once: true, amount: 0.5 });
  const consoleInView = useInView(consoleRef, { once: true, amount: 0.3 });

  // Efecto para marcar cuando estamos en el cliente
  useEffect(() => {
    setIsClient(true);
    
    // Activar la animación de texto después de un breve retraso
    const timer = setTimeout(() => {
      setTextRevealed(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  // Función para navegar a la siguiente consola
  const nextConsole = () => {
    if (isAnimating || !isClient) return;
    setIsAnimating(true);
    setDirection('next');
    setSlideAnimation(true);
    
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % codeExamples.length);
      
      setTimeout(() => {
        setSlideAnimation(false);
        
        setTimeout(() => {
          setIsAnimating(false);
        }, 300);
      }, 300);
    }, 300);
  };

  // Función para navegar a la consola anterior
  const prevConsole = () => {
    if (isAnimating || !isClient) return;
    setIsAnimating(true);
    setDirection('prev');
    setSlideAnimation(true);
    
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + codeExamples.length) % codeExamples.length);
      
      setTimeout(() => {
        setSlideAnimation(false);
        
        setTimeout(() => {
          setIsAnimating(false);
        }, 300);
      }, 300);
    }, 300);
  };
  
  // Función para navegar a un índice específico
  const goToIndex = (index: number) => {
    if (isAnimating || index === currentIndex || !isClient) return;
    setIsAnimating(true);
    setDirection(index > currentIndex ? 'next' : 'prev');
    setSlideAnimation(true);
    
    setTimeout(() => {
      setCurrentIndex(index);
      
      setTimeout(() => {
        setSlideAnimation(false);
        
        setTimeout(() => {
          setIsAnimating(false);
        }, 300);
      }, 300);
    }, 300);
  };

  // Función para manejar la finalización de la animación del título
  const handleTitleAnimationComplete = () => {
    setTitleAnimationComplete(true);
  };

  // Textos con dimensiones prefijadas para evitar saltos durante la animación
  const titleText = "Soluciones Digitales a Medida";
  const descriptionText = "Impulsamos tu transformación digital con plataformas, sitios web, apps móviles y experiencias en realidad virtual. Conectamos tecnología y creatividad para potenciar tu negocio.";

  // Estilos para asegurar dimensiones constantes durante animaciones
  const staticContainerStyles = {
    titleContainer: {
      position: 'relative' as const,
      height: '140px', // Altura fija para el título
      display: 'flex',
      flexDirection: 'column' as const,
      justifyContent: 'center' as const,
      overflow: 'hidden',
      width: '100%'
    },
    descriptionContainer: {
      position: 'relative' as const,
      height: '120px', // Altura fija para la descripción
      display: 'flex',
      flexDirection: 'column' as const,
      justifyContent: 'center' as const,
      overflow: 'hidden',
      width: '100%'
    },
    visibleContent: {
      position: 'absolute' as const,
      top: 0,
      left: 0,
      right: 0,
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start'
    }
  };

  // Variantes de animación para efecto blur
  const blurVariants = {
    hidden: { 
      opacity: 0,
      filter: "blur(10px)", 
      scale: 1.05
    },
    visible: { 
      opacity: 1,
      filter: "blur(0px)", 
      scale: 1,
      transition: { 
        duration: 0.8, 
        ease: [0.4, 0, 0.2, 1] 
      }
    }
  };

  return (
    <section className="relative py-20 overflow-hidden bg-black text-white flex items-center" style={{ minHeight: '100vh' }}>
      {/* Fondo con gradient sutil */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black opacity-90" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 w-full">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Lado izquierdo - Header y contenido descriptivo */}
          <div className="md:col-span-5 flex flex-col items-start text-left">
            {/* Innovación sin límites con animación de entrada */}
            <motion.div 
              ref={headerRef}
              className="mb-0 w-full text-left"
              initial={{ opacity: 0, y: -20 }}
              animate={{ 
                opacity: headerInView ? 1 : 0, 
                y: headerInView ? 0 : -20 
              }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="inline-flex items-center gap-3 before:h-px before:w-8 before:bg-linear-to-r before:from-transparent before:to-blue-200/50 after:h-px after:w-8 after:bg-linear-to-l after:from-transparent after:to-blue-200/50">
                <span className="inline-flex">
                  {isClient && (
                    <ShinyText 
                      text="Innovación sin límites" 
                      speed={3}
                      disabled={false} 
                      className="md:text-xl"
                    />
                  )}
                </span>
              </div>
            </motion.div>
            
            {/* Título con efecto blur */}
            <div 
              ref={titleRef}
              className="w-full mb-2" 
              style={staticContainerStyles.titleContainer}
            >
              {isClient && (
                <div style={{...staticContainerStyles.visibleContent, justifyContent: 'flex-start'}}>
                  <motion.div 
                    className="font-nacelle text-4xl font-semibold md:text-5xl bg-gradient-to-t from-gray-400 to-white bg-clip-text text-transparent text-left"
                    initial="hidden"
                    animate={titleInView ? "visible" : "hidden"}
                    variants={blurVariants}
                  >
                    {titleText}
                  </motion.div>
                </div>
              )}
            </div>
            
            {/* Descripción con DecryptedText en un contenedor de tamaño fijo */}
            <div 
              ref={descriptionRef}
              className="w-full mb-6" 
              style={staticContainerStyles.descriptionContainer}
            >
              {isClient && (
                <div style={{...staticContainerStyles.visibleContent, justifyContent: 'flex-start'}}>
                  <div className="invisible" aria-hidden="true">
                    <p className="text-lg">{descriptionText}</p>
                  </div>
                  <div className="absolute top-0 left-0 right-0 text-gray-300 h-full flex items-center justify-start">
                    <div className="text-left">
                      <DecryptedText
                        text={descriptionText}
                        speed={20}
                        animateOn={descriptionInView ? "view" : "hover"}
                        sequential={true}
                        maxIterations={5}
                        className="text-gray-300 text-lg"
                        encryptedClassName="text-gray-500 text-lg"
                        parentClassName="monospace text-left"
                        onAnimationComplete={handleTitleAnimationComplete}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Botón de acción */}
            <motion.div
              ref={buttonRef}
              className="w-full text-left mt-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: buttonInView ? 1 : 0, 
                y: buttonInView ? 0 : 20 
              }}
              transition={{ 
                duration: 0.5, 
                delay: 0.2,
                ease: [0.22, 1, 0.36, 1] 
              }}
            >
              <motion.button 
                className="btn-sm relative inline-flex items-center rounded-lg border border-teal-500/50 bg-black px-4 py-2 text-sm font-medium text-teal-200 hover:bg-teal-900/20 transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Consultar ahora
                <motion.svg 
                  className="ml-2 h-4 w-4" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24" 
                  xmlns="http://www.w3.org/2000/svg"
                  initial={{ x: 0 }}
                  animate={{ x: [0, 4, 0] }}
                  transition={{ 
                    duration: 1.5, 
                    repeat: Infinity, 
                    repeatType: "loop",
                    ease: "easeInOut",
                    repeatDelay: 1
                  }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </motion.svg>
              </motion.button>
            </motion.div>
          </div>
          
          {/* Lado derecho - Consola de código con navegación y animación */}
          <motion.div 
            ref={consoleRef}
            className="md:col-span-7 relative overflow-hidden rounded-xl" 
            style={{ height: '600px' }}
            initial={{ opacity: 0, x: 100 }}
            animate={{ 
              opacity: consoleInView ? 1 : 0, 
              x: consoleInView ? 0 : 100 
            }}
            transition={{ 
              duration: 0.7, 
              delay: 0.2,
              ease: [0.22, 1, 0.36, 1]
            }}
          >
            {/* Solo renderizamos el componente CodeConsole en el cliente */}
            {isClient && (
              <AnimatePresence mode="wait">
                <motion.div 
                  key={currentIndex}
                  initial={{ 
                    opacity: 0, 
                    x: direction === 'next' ? 100 : -100
                  }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ 
                    opacity: 0, 
                    x: direction === 'next' ? -100 : 100 
                  }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 300, 
                    damping: 30 
                  }}
                  className="h-full"
                >
                  <CodeConsole 
                    title={codeExamples[currentIndex].title}
                    description={codeExamples[currentIndex].description}
                    code={codeExamples[currentIndex].code}
                    language={codeExamples[currentIndex].language}
                    animateTyping={!isAnimating}
                  />
                </motion.div>
              </AnimatePresence>
            )}
            
            {/* Indicadores de navegación (flechas a los lados) */}
            {isClient && (
              <>
                <motion.div 
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-20"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: consoleInView ? 1 : 0, x: consoleInView ? 0 : -20 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  <motion.button 
                    onClick={prevConsole}
                    className="btn-sm relative inline-flex items-center justify-center h-10 w-10 rounded-r-lg border border-teal-500/30 bg-black/70 text-teal-200 hover:bg-teal-900/20 transition-colors duration-300 backdrop-blur-sm"
                    disabled={isAnimating}
                    aria-label="Anterior"
                    whileHover={{ scale: 1.1, x: 2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </motion.button>
                </motion.div>
                
                <motion.div 
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-20"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: consoleInView ? 1 : 0, x: consoleInView ? 0 : 20 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  <motion.button 
                    onClick={nextConsole}
                    className="btn-sm relative inline-flex items-center justify-center h-10 w-10 rounded-l-lg border border-teal-500/30 bg-black/70 text-teal-200 hover:bg-teal-900/20 transition-colors duration-300 backdrop-blur-sm"
                    disabled={isAnimating}
                    aria-label="Siguiente"
                    whileHover={{ scale: 1.1, x: -2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </motion.button>
                </motion.div>
                
                {/* Indicadores de página y título */}
                <motion.div 
                  className="absolute bottom-4 left-0 right-0 flex flex-col items-center z-20"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: consoleInView ? 1 : 0, y: consoleInView ? 0 : 20 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                >
                  {/* Título y descripción de la consola actual */}
                  <div className="mb-4 text-center">
                    <motion.div 
                      className="inline-flex items-center mb-1 px-3 py-1 rounded-full bg-teal-900/30 border border-teal-500/30"
                      whileHover={{ scale: 1.05 }}
                    >
                      <span className="text-xs text-teal-300">
                        {currentIndex + 1}/{codeExamples.length}
                      </span>
                    </motion.div>
                  </div>
                  
                  {/* Indicadores de página */}
                  <div className="flex space-x-3">
                    {codeExamples.map((example, index) => (
                      <motion.button
                        key={index}
                        className="group relative flex flex-col items-center transition-all duration-300"
                        onClick={() => goToIndex(index)}
                        disabled={isAnimating}
                        aria-label={`Ir a ${example.title}`}
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: consoleInView ? 1 : 0, y: consoleInView ? 0 : 10 }}
                        transition={{ delay: 0.6 + (index * 0.1), duration: 0.3 }}
                      >
                        {/* Indicador visual */}
                        <div 
                          className={`h-2 transition-all duration-300 rounded-full ${
                            index === currentIndex 
                              ? 'w-8 bg-teal-400' 
                              : 'w-4 bg-gray-600 group-hover:bg-teal-600'
                          }`}
                        />
                        
                        {/* Título emergente */}
                        <div className="absolute -top-8 whitespace-nowrap px-2 py-1 text-xs rounded bg-gray-800 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                          {example.title}
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              </>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Workflows;