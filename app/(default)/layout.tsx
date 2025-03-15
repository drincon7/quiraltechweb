"use client";

import { useEffect } from "react";

import AOS from "aos";
import "aos/dist/aos.css";

import Footer from "@/components/ui/footer";
import SmoothScrollConfig from "@/utils/ScrollConfig"; // Ajusta la ruta según donde esté tu componente

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    AOS.init({
      once: true,
      disable: "phone",
      duration: 600,
      easing: "ease-out-sine",
    });
  }, []); // Añadí el array de dependencias vacío para que solo se ejecute una vez

  return (
    <>
      {/* Componente de scroll suave */}
      <SmoothScrollConfig />
      
      <main className="relative flex grow flex-col">{children}</main>

      <Footer />
    </>
  );
}