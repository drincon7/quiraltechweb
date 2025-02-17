"use client";

import React, { useEffect, useState, useRef } from 'react';
import { Fade } from "react-awesome-reveal";
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export default function HeroHome() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const [isInView, setIsInView] = useState(true);
  const threeContainerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const scrollProgress = -rect.top / (rect.height - window.innerHeight);
        setScrollPosition(scrollProgress);
        scrollRef.current = scrollProgress;
        setIsInView(rect.top <= window.innerHeight && rect.bottom >= 0);
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
    // Aumentamos la distancia inicial de la cámara
    // Parámetros de posición de cámara
    const baseCameraZ = 10;      // Distancia en el eje Z (alejamiento)
    const baseCameraY = 1;      // Altura de la cámara
    const baseCameraX = 0;      // Posición lateral
    const cameraRotationX =0;  // Rotación vertical (en radianes)
    const cameraRotationY = 0;  // Rotación horizontal (en radianes)
    const cameraRotationZ = 0;  // Inclinación lateral (en radianes)

    // Parámetros de posición orbital
    const orbitalRadius =0;     // Distancia desde el centro
    const polarAngle = 0;   // Ángulo vertical desde arriba (theta)
    const azimuthAngle = 10;  // Ángulo horizontal desde el frente (phi)
    
    // Calcula la posición de la cámara usando coordenadas esféricas
    const x = orbitalRadius * Math.sin(polarAngle) * Math.cos(azimuthAngle);
    const y = orbitalRadius * Math.cos(polarAngle);
    const z = orbitalRadius * Math.sin(polarAngle) * Math.sin(azimuthAngle);
    
    // Aplica la posición orbital
    camera.position.set(x, y, z);
    // Hace que la cámara mire al centro
    camera.lookAt(0, 0, 0);
    
    // Si quieres usar la posición directa en lugar de la orbital, 
    // comenta las dos líneas anteriores y descomenta estas:
    // camera.position.set(baseCameraX, baseCameraY, baseCameraZ);
    // camera.rotation.set(cameraRotationX, cameraRotationY, cameraRotationZ);

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
        model.scale.set(0.5, 0.5, 0.5);
        scene.add(model);
      },
      undefined,
      (error) => {
        console.error("Error al cargar el modelo:", error);
      }
    );

    // Reducimos el factor de zoom para un movimiento más sutil
    const zoomFactor = 2;

    let reqId: number;
    const animate = () => {
      reqId = requestAnimationFrame(animate);

      // Actualizamos la posición Z de la cámara con un zoom más sutil
      camera.position.z = baseCameraZ + scrollRef.current * zoomFactor;

      // Si el modelo está cargado, su rotación dependerá del scroll
      if (model) {
        // Multiplicamos por 2π para conseguir una rotación completa
        model.rotation.y = scrollRef.current * Math.PI * 2;
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

  const ratio = Math.min(Math.max(scrollPosition, 0), 1);
  const r = Math.round(255 * (1 - ratio));
  const g = Math.round(255 * (1 - ratio) + 170 * ratio);
  const b = Math.round(255 * (1 - ratio) + 255 * ratio);
  const textColor = `rgb(${r}, ${g}, ${b})`;

  const fadeEndThreshold = 0.8;
  const opacity =
    scrollPosition >= fadeEndThreshold
      ? Math.max(0, 1 - (scrollPosition - fadeEndThreshold) / (1 - fadeEndThreshold))
      : 1;

  return (
    <section 
      ref={sectionRef} 
      className="relative h-[300vh] overflow-hidden"
    >
      <div className="fixed inset-0 w-full h-screen overflow-hidden">
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
          className="absolute inset-0 bg-black"
          style={{ opacity: 0.4 + ratio * 0.2 }}
        />
        <div 
          className="relative pt-32 text-center"
          style={{ opacity }}
        >
          <Fade triggerOnce>
            <h1 className="animate-[gradient_6s_linear_infinite] bg-[linear-gradient(to_right, var(--color-gray-200), var(--color-indigo-200), var(--color-gray-50), var(--color-indigo-300), var(--color-gray-200))] bg-[length:200%_auto] bg-clip-text pb-5 font-nacelle text-4xl font-semibold text-transparent md:text-5xl">
              Tecnología con propósito
            </h1>
            <div className="mx-auto max-w-3xl">
              <p className="mb-8 text-xl text-white opacity-85">
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
            opacity,
            transition: 'all 0.3s ease',
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