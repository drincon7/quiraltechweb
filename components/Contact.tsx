"use client";

import React, { useRef, useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { motion } from 'framer-motion';
import Orb from './ui/Orb/Orb';
import { FaWhatsapp } from 'react-icons/fa';

// Definir interfaces para los tipos
interface FormData {
  name: string;
  lastName: string;
  email: string;
  country: string;
  phone: string;
  message: string;
}

// Definir tipo para estado de envío
type SubmitStatus = 'success' | 'error' | null;

// Mapa de países y sus códigos de marcación
const countryCodes: {[key: string]: string} = {
  "argentina": "+54",
  "bolivia": "+591",
  "brasil": "+55",
  "chile": "+56",
  "colombia": "+57",
  "costa rica": "+506",
  "cuba": "+53",
  "ecuador": "+593",
  "el salvador": "+503",
  "españa": "+34",
  "estados unidos": "+1",
  "guatemala": "+502",
  "honduras": "+504",
  "méxico": "+52",
  "nicaragua": "+505",
  "panamá": "+507",
  "paraguay": "+595",
  "perú": "+51",
  "puerto rico": "+1",
  "república dominicana": "+1",
  "uruguay": "+598",
  "venezuela": "+58",
  // Añade más países según sea necesario
};

export default function HeroContact() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    lastName: '',
    email: '',
    country: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>(null);
  const [countryCode, setCountryCode] = useState<string>('');

  // Detectar el código de país cuando cambia el campo de país
  useEffect(() => {
    if (formData.country) {
      const normalizedCountry = formData.country.toLowerCase().trim();
      const foundCode = Object.entries(countryCodes).find(([country]) => 
        normalizedCountry.includes(country) || country.includes(normalizedCountry)
      );
      
      if (foundCode) {
        setCountryCode(foundCode[1]);
      } else {
        setCountryCode('');
      }
    } else {
      setCountryCode('');
    }
  }, [formData.country]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Send the form data to our API route
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Error al enviar el formulario');
      }
      
      setSubmitStatus('success');
      // Reset form after successful submission
      setFormData({
        name: '',
        lastName: '',
        email: '',
        country: '',
        phone: '',
        message: ''
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      // Reset status after 5 seconds
      setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);
    }
  };

  return (
    <section 
      ref={sectionRef} 
      className="fixed inset-0 w-full h-screen overflow-hidden"
    >
      {/* Contenedor principal que garantiza posicionamiento correcto */}
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Contenedor del Orb ajustado para evitar difuminado */}
        <div 
          className="relative w-full h-full flex items-center justify-center"
          style={{ 
            overflow: 'hidden'
          }}
        >
          <motion.div 
            className="relative"
            style={{ 
              width: '100vh', 
              height: '100vh',
              maxWidth: '1000px',
              maxHeight: '1000px',
              borderRadius: '50%',
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
              duration: 0.8, 
              ease: "easeOut" 
            }}
          >
            <Orb 
              hue={50}
              hoverIntensity={0}
              rotateOnHover={false}
              forceHoverState={true}
            />
          </motion.div>
        </div>
      </div>
      
      {/* Contact Form overlay - Centrado pero sin ser afectado por el orb */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="z-10 w-full max-w-md px-6 pointer-events-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mb-5 text-center"
          >
            <h1 className="font-nacelle text-4xl font-semibold md:text-5xl bg-gradient-to-t from-gray-400 to-white bg-clip-text text-transparent text-center">
              Contáctanos
            </h1>
            <p className="text-gray-200 mt-2">Estaremos encantados de responder a tus consultas</p>
          </motion.div>
          
          <motion.form 
            onSubmit={handleSubmit}
            className="bg-white/10 backdrop-blur-md rounded-xl p-6 shadow-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            style={{ maxHeight: 'calc(100vh - 200px)', overflowY: 'auto' }}
          >
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="name" className="block text-white text-sm font-medium mb-1">Nombre</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-white/20 text-white rounded-lg px-3 py-2 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Tu nombre"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-white text-sm font-medium mb-1">Apellido</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="w-full bg-white/20 text-white rounded-lg px-3 py-2 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Tu apellido"
                />
              </div>
            </div>
            
            <div className="mb-4">
              <label htmlFor="email" className="block text-white text-sm font-medium mb-1">Correo electrónico</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-white/20 text-white rounded-lg px-3 py-2 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="tucorreo@ejemplo.com"
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="country" className="block text-white text-sm font-medium mb-1">País</label>
              <input
                type="text"
                id="country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                required
                className="w-full bg-white/20 text-white rounded-lg px-3 py-2 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Tu país"
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="phone" className="block text-white text-sm font-medium mb-1">Teléfono celular</label>
              <div className="flex">
                <div className="bg-white/20 text-white rounded-l-lg px-3 py-2 flex items-center">
                  {countryCode || '+'}
                </div>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full bg-white/20 text-white rounded-r-lg px-3 py-2 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Tu número de celular"
                />
              </div>

            </div>
            
            <div className="mb-6">
              <label htmlFor="message" className="block text-white text-sm font-medium mb-1">Mensaje</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={3}
                style={{ maxHeight: '100px', resize: 'none' }}
                className="w-full bg-white/20 text-white rounded-lg px-3 py-2 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="¿Cómo podemos ayudarte?"
              ></textarea>
            </div>
            
            <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                {isSubmitting ? 'Enviando...' : 'Enviar mensaje'}
              </button>
              
              <a
                href="https://wa.me/573185166772" 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center bg-white hover:bg-gray-100 text-green-600 font-medium py-2 px-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 shadow-md"
              >
                <FaWhatsapp className="mr-2" size={20} />
                WhatsApp
              </a>
            </div>
            
            {submitStatus === 'success' && (
              <div className="mt-4 p-3 bg-green-500/20 text-green-100 rounded-lg text-center">
                ¡Mensaje enviado con éxito! Te contactaremos pronto.
              </div>
            )}
            
            {submitStatus === 'error' && (
              <div className="mt-4 p-3 bg-red-500/20 text-red-100 rounded-lg text-center">
                Hubo un error al enviar el mensaje. Por favor, intenta nuevamente.
              </div>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  );
}