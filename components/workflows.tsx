'use client'

import React, { useState, useEffect } from 'react';
import CodeConsole from './CodeConsole'; // Asegúrate de que la ruta sea correcta

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

  // Estados para controlar la dirección de la animación
  const [direction, setDirection] = useState<'next' | 'prev' | null>(null);
  const [slideAnimation, setSlideAnimation] = useState<boolean>(false);

  // Efecto para marcar cuando estamos en el cliente
  // Esto evita errores de hidratación
  useEffect(() => {
    setIsClient(true);
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
          setDirection(null);
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
          setDirection(null);
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
          setDirection(null);
        }, 300);
      }, 300);
    }, 300);
  };

  return (
    <section className="relative py-20 overflow-hidden bg-black text-white" style={{ minHeight: '100vh' }}>
      {/* Fondo con gradient sutil */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black opacity-90" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Lado izquierdo - Header y contenido descriptivo */}
          <div className="md:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-3 before:h-px before:w-8 before:bg-linear-to-r before:from-transparent before:to-blue-200/50 after:h-px after:w-8 after:bg-linear-to-l after:from-transparent after:to-blue-200/50">
              <span className="inline-flex bg-gradient-to-r from-blue-500 to-teal-500 bg-clip-text text-transparent md:text-xl">
                Innovación sin límites
              </span>
            </div>
            
            <h2 className="animate-[gradient_6s_linear_infinite] bg-gradient-to-r from-blue-500 via-teal-500 to-blue-500 bg-[length:200%_auto] bg-clip-text pb-4 font-nacelle text-3xl font-semibold text-transparent md:text-5xl">
              Soluciones Digitales a Medida
            </h2>
            
            <p className="text-gray-300 text-lg">
              Impulsamos tu transformación digital con plataformas, sitios web, apps móviles y experiencias en realidad virtual. Conectamos tecnología y creatividad para potenciar tu negocio.
            </p>
            
            <div className="pt-4">
              <button className="btn-sm relative inline-flex items-center rounded-lg border border-teal-500/50 bg-black px-4 py-2 text-sm font-medium text-teal-200 hover:bg-teal-900/20 transition-colors duration-300">
                Consultar ahora
                <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
          </div>
          
          {/* Lado derecho - Consola de código con navegación y animación */}
          <div className="md:col-span-7 relative overflow-hidden rounded-xl" style={{ height: '600px' }}>
            {/* Solo renderizamos el componente CodeConsole en el cliente */}
            {isClient && (
              <div 
                className={`transform transition-all duration-500 ${
                  slideAnimation && direction === 'next' ? '-translate-x-full opacity-0' : 
                  slideAnimation && direction === 'prev' ? 'translate-x-full opacity-0' : 
                  'translate-x-0 opacity-100'
                }`}
              >
                <CodeConsole 
                  title={codeExamples[currentIndex].title}
                  description={codeExamples[currentIndex].description}
                  code={codeExamples[currentIndex].code}
                  language={codeExamples[currentIndex].language}
                  animateTyping={!isAnimating}
                />
              </div>
            )}
            
            {/* Indicadores de navegación (flechas a los lados) */}
            {isClient && (
              <>
                <div className="absolute left-0 top-1/2 -translate-y-1/2 z-20">
                  <button 
                    onClick={prevConsole}
                    className="btn-sm relative inline-flex items-center justify-center h-10 w-10 rounded-r-lg border border-teal-500/30 bg-black/70 text-teal-200 hover:bg-teal-900/20 transition-colors duration-300 backdrop-blur-sm"
                    disabled={isAnimating}
                    aria-label="Anterior"
                  >
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                </div>
                
                <div className="absolute right-0 top-1/2 -translate-y-1/2 z-20">
                  <button 
                    onClick={nextConsole}
                    className="btn-sm relative inline-flex items-center justify-center h-10 w-10 rounded-l-lg border border-teal-500/30 bg-black/70 text-teal-200 hover:bg-teal-900/20 transition-colors duration-300 backdrop-blur-sm"
                    disabled={isAnimating}
                    aria-label="Siguiente"
                  >
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
                
                {/* Indicadores de página y título */}
                <div className="absolute bottom-4 left-0 right-0 flex flex-col items-center z-20">
                  {/* Título y descripción de la consola actual */}
                  <div className="mb-4 text-center">
                    <div className="inline-flex items-center mb-1 px-3 py-1 rounded-full bg-teal-900/30 border border-teal-500/30">
                      <span className="text-xs text-teal-300">
                        {currentIndex + 1}/{codeExamples.length}
                      </span>
                    </div>
                  </div>
                  
                  {/* Indicadores de página */}
                  <div className="flex space-x-3">
                    {codeExamples.map((example, index) => (
                      <button
                        key={index}
                        className={`group relative flex flex-col items-center transition-all duration-300`}
                        onClick={() => goToIndex(index)}
                        disabled={isAnimating}
                        aria-label={`Ir a ${example.title}`}
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
                        <div className={`absolute -top-8 whitespace-nowrap px-2 py-1 text-xs rounded bg-gray-800 text-white opacity-0 group-hover:opacity-100 transition-opacity`}>
                          {example.title}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Workflows;