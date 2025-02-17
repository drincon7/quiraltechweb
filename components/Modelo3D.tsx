// Modelo3D.tsx
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
// Importa OrbitControls si deseas usarlos
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const Modelo3D: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Escena, cámara y renderer
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xdddddd);

    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current?.clientWidth! / mountRef.current?.clientHeight!,
      0.1,
      1000
    );
    camera.position.set(0, 1, 3);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(
      mountRef.current?.clientWidth || window.innerWidth,
      mountRef.current?.clientHeight || window.innerHeight
    );
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current?.appendChild(renderer.domElement);

    // 2. Iluminación
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // 3. Cargar el modelo .gltf
    const loader = new GLTFLoader();
    loader.load(
      'public/modelos/scene.gltf', // Ajusta la ruta según corresponda
      (gltf) => {
        scene.add(gltf.scene);
      },
      undefined,
      (error) => {
        console.error('Error al cargar el modelo:', error);
      }
    );

    // 4. (Opcional) Controles para interactuar con la escena
    // const controls = new OrbitControls(camera, renderer.domElement);
    // controls.update();

    // 5. Loop de animación
    const animate = () => {
      requestAnimationFrame(animate);
      // Si usas controles, actualízalos aquí
      // controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // 6. Manejar redimensionamiento
    const handleResize = () => {
      if (mountRef.current) {
        const width = mountRef.current.clientWidth;
        const height = mountRef.current.clientHeight;
        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
      }
    };
    window.addEventListener('resize', handleResize);

    // 7. Limpieza al desmontar el componente
    return () => {
      window.removeEventListener('resize', handleResize);
      mountRef.current?.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} style={{ width: '100%', height: '100vh' }} />;
};

export default Modelo3D;
