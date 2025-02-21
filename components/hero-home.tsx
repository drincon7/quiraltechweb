"use client";

import React, { useEffect, useState, useRef } from 'react';
import { Fade } from "react-awesome-reveal";
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

// Mantenemos las interfaces y posiciones existentes
interface Position {
  x: number;
  y: number;
  z: number;
  rotationX: number;
  rotationY: number;
  rotationZ: number;
  scale: number;
}

const easeInOutQuad = (t: number): number => {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
};

// Mantenemos tus posiciones exactas
const initialPosition: Position = {
  x: 0,
  y: -8,
  z: 0,
  rotationX: 0,
  rotationY: Math.PI + 0.56,
  rotationZ: 0,
  scale: 0.1
};

const finalPosition: Position = {
  x: 6,
  y: -8,
  z: 10,
  rotationX: -.25,
  rotationY: Math.PI * 2 + 0.54,
  rotationZ: .132,
  scale: 1,
};

export default function HeroHome() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const [isInView, setIsInView] = useState(true);
  const threeContainerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef(0);
  const [modelVisible, setModelVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const totalHeight = rect.height;
        
        // Detectamos cuando el siguiente componente está entrando en vista
        const nextSection = sectionRef.current.nextElementSibling;
        if (nextSection) {
          const nextRect = nextSection.getBoundingClientRect();
          const nextSectionEntering = nextRect.top <= viewportHeight;
          setModelVisible(!nextSectionEntering);
        }

        // Actualizamos el progreso del scroll
        const scrollProgress = -rect.top / (totalHeight - viewportHeight);
        setScrollPosition(scrollProgress);
        scrollRef.current = scrollProgress;
        setIsInView(rect.top <= viewportHeight && rect.bottom >= 0);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!threeContainerRef.current) return;
    const container = threeContainerRef.current;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );

    camera.position.set(5, 2, 8);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    let model: THREE.Group | null = null;
    const loader = new GLTFLoader();
    
    loader.load(
      '/modelos/scene.gltf',
      (gltf) => {
        model = gltf.scene;
        model.position.set(
          initialPosition.x,
          initialPosition.y,
          initialPosition.z
        );
        model.rotation.set(
          initialPosition.rotationX,
          initialPosition.rotationY,
          initialPosition.rotationZ
        );
        model.scale.set(
          initialPosition.scale,
          initialPosition.scale,
          initialPosition.scale
        );
        scene.add(model);
      },
      undefined,
      (error) => {
        console.error("Error al cargar el modelo:", error);
      }
    );

    let reqId: number;
    const animate = () => {
      reqId = requestAnimationFrame(animate);

      if (model && isInView) {
        const progress = easeInOutQuad(Math.min(Math.max(scrollRef.current, 0), 1));
        
        // Interpolamos la posición
        model.position.x = initialPosition.x + (finalPosition.x - initialPosition.x) * progress;
        model.position.y = initialPosition.y + (finalPosition.y - initialPosition.y) * progress;
        model.position.z = initialPosition.z + (finalPosition.z - initialPosition.z) * progress;
        
        // Interpolamos las rotaciones
        model.rotation.x = initialPosition.rotationX + 
          (finalPosition.rotationX - initialPosition.rotationX) * progress;
        model.rotation.y = initialPosition.rotationY + 
          (finalPosition.rotationY - initialPosition.rotationY) * progress;
        model.rotation.z = initialPosition.rotationZ + 
          (finalPosition.rotationZ - initialPosition.rotationZ) * progress;
        
        // Interpolamos la escala
        const currentScale = initialPosition.scale + 
          (finalPosition.scale - initialPosition.scale) * progress;
        model.scale.set(currentScale, currentScale, currentScale);
      }

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      cancelAnimationFrame(reqId);
    };
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="relative h-[400vh] overflow-hidden"
    >
      <div 
        className="fixed inset-0 w-full h-screen overflow-hidden"
        style={{ 
          opacity: modelVisible ? 1 : 0,
          transition: 'opacity 0.5s ease-out',
          pointerEvents: modelVisible ? 'auto' : 'none'
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div 
            ref={threeContainerRef}
            style={{
              width: '100vw',
              height: '100vh'
            }}
          />
        </div>
        <div 
          className="relative pt-32 text-center"
          style={{ 
            opacity: modelVisible ? 1 : 0,
            transition: 'opacity 0.5s ease-out'
          }}
        >
          <Fade triggerOnce>
            <h1 className="animate-[gradient_6s_linear_infinite] bg-gradient-to-r from-blue-500 via-teal-500 to-blue-500 bg-[length:200%_auto] bg-clip-text pb-4 font-nacelle text-3xl font-semibold text-transparent md:text-5xl">
              Tecnología con propósito
            </h1>
            <div className="mx-auto max-w-3xl">
              <p className="text-lg text-blue-400">
                Transforma tus desafíos en soluciones digitales innovadoras
              </p>
            </div>
          </Fade>
        </div>
      </div>

      {isInView && (
        <div 
          className="fixed left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2 text-center"
          style={{ 
            opacity: modelVisible ? 1 : 0,
            transition: 'all 0.5s ease-out',
            zIndex: 10
          }}
        >
          <Fade direction="up" delay={400} triggerOnce>
            <h1 className="animate-[gradient_6s_linear_infinite] bg-[linear-gradient(to_right, var(--color-gray-200), var(--color-indigo-200), var(--color-gray-50), var(--color-indigo-300), var(--color-gray-200))] bg-[length:200%_auto] bg-clip-text pb-5 font-nacelle text-4xl font-semibold text-transparent md:text-4xl">
              Sumate al cambio
            </h1>
          </Fade>
          <div className="mx-auto mt-8 max-w-xs sm:flex sm:max-w-none sm:justify-center">
            <Fade direction="up" delay={600} triggerOnce>
              <div>
                <a className="btn group mb-4 w-full bg-linear-to-t from-indigo-600 to-indigo-500 bg-[length:100%_100%] bg-[bottom] text-white shadow-[inset_0px_1px_0px_0px_--theme(--color-white/.16)] hover:bg-[length:100%_150%] sm:mb-0 sm:w-auto"
                   href="#0">
                  <span className="relative inline-flex items-center">
                    Start Building
                    <span className="ml-1 tracking-normal text-white/50 transition-transform group-hover:translate-x-0.5">
                      -&gt;
                    </span>
                  </span>
                </a>
              </div>
            </Fade>
            <Fade direction="up" delay={800} triggerOnce>
              <div>
                <a className="btn relative w-full bg-linear-to-b from-gray-800 to-gray-800/60 bg-[length:100%_100%] bg-[bottom] text-gray-300 before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(to_right, var(--color-gray-800), var(--color-gray-700), var(--color-gray-800))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)] hover:bg-[length:100%_150%] sm:ml-4 sm:w-auto"
                   href="#0">
                  Schedule Demo
                </a>
              </div>
            </Fade>
          </div>
        </div>
      )}
    </section>
  );
}