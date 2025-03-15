'use client'

import { useRef, useEffect } from 'react';

export default function Features() {
  return (
    <section className="relative">
      {/* Parte superior con degradado de azul oscuro a azul claro y finalmente blanco */}
      <div className="bg-gradient-to-b from-blue-900 via-blue-600 to-white h-36"></div>
      
      {/* Contenido principal con fondo blanco */}
      <div className="bg-white relative">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="pt-24 md:pt-32 pb-16 md:pb-20">
            
            {/* Header - Estilo similar a la segunda imagen */}
            <div className="mb-16 mt-10 px-1">
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-700 to-indigo-800 bg-clip-text text-transparent px-0.5 pb-2 inline-block leading-relaxed">
                Tecnología que Impulsa tu Éxito
              </h2>
            </div>
            
            {/* Grid de estadísticas (similar al diseño SSQD) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-1 mb-20">
              {/* Sección principal - Desarrolladores - Estirada verticalmente */}
              <div className="bg-gray-50 p-8 md:p-12 flex flex-col justify-center row-span-2 rounded-2xl">
                <h3 className="text-gray-700 font-medium mb-4">Velocidad</h3>
                <div className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent pb-2 px-0.5 inline-block leading-relaxed">
                  Ágil
                </div>
                <p className="text-gray-600 mt-4">Entregas rápidas, desarrollo eficiente</p>
              </div>
              
              {/* Sección principal - Petabytes */}
              <div className="bg-gradient-to-b from-blue-900 to-blue-950 text-white p-8 md:p-12 col-span-1 md:col-span-2 flex flex-col justify-between rounded-2xl relative overflow-hidden">
                <div className="z-10">
                  <p className="font-medium mb-3">Empresa joven y dinámica</p>
                  <div className="text-6xl md:text-8xl font-bold mb-4 text-blue-100">
                    QuiralTech
                  </div>
                  <p className="text-blue-100 text-lg mb-8 max-w-xl">
                    Nos especializamos en desarrollo de software, tecnología y consultoría con un enfoque personalizado y directo.
                  </p>
                </div>
                {/* Degradado sutil al fondo */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-800/10 to-indigo-900/20"></div>
                <div className="flex justify-end z-10">
                  <button className="bg-white text-blue-900 px-8 py-3 rounded-full font-medium hover:bg-gray-100 transition-colors">
                    CONTACTAR
                  </button>
                </div>
              </div>
              
              {/* Panel nuevo - similar al "Last 24 hours" */}
              <div className="bg-gray-50 p-8 md:p-10 col-span-1 md:col-span-2 rounded-2xl">
                <p className="text-gray-700 font-medium mb-3">Innovación constante</p>
                <div className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent pb-2 px-0.5 inline-block leading-relaxed">
                  IA + Dev
                </div>
                <p className="text-gray-600 mt-3">Integramos inteligencia artificial en nuestros procesos de desarrollo</p>
              </div>
              
              {/* Sección inferior - grid de 3 columnas */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-1 col-span-1 md:col-span-3 mt-1">
                {/* Sección inferior - Proyectos últimas 24h */}
                <div className="bg-gray-50 p-8 md:p-10 rounded-2xl">
                  <p className="text-gray-700 font-medium mb-3">Inversión</p>
                  <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent pb-2 px-0.5 inline-block leading-relaxed">
                    Inteligente
                  </div>
                  <p className="text-gray-600 mt-2">Alta calidad, precio justo</p>
                </div>
                
                {/* Sección inferior - Staked */}
                <div className="bg-gray-50 p-8 md:p-10 rounded-2xl">
                  <p className="text-gray-700 font-medium mb-3">Atención</p>
                  <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent pb-2 px-0.5 inline-block leading-relaxed">
                    Premium
                  </div>
                  <p className="text-gray-600 mt-2">Cada cliente es único</p>
                </div>
                
                {/* Sección inferior - Satisfacción */}
                <div className="bg-gray-50 p-8 md:p-10 rounded-2xl">
                  <p className="text-gray-700 font-medium mb-3">Flexibilidad</p>
                  <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent pb-2 px-0.5 inline-block leading-relaxed">
                    100%
                  </div>
                  <p className="text-gray-600 mt-2">Abiertos a toda idea</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}