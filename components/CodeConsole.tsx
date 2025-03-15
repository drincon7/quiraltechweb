'use client'

import React, { useEffect, useRef, useState } from 'react';
import Prism from 'prismjs';
import useTypewriterEffect from './typing-animation';
import TerminalLoader from './terminal-loader';

// IMPORTANTE: Asegúrate de importar los lenguajes que necesitas
// Puedes colocar esto en tu _app.js o layout.js
// import 'prismjs/themes/prism-tomorrow.css';
// import 'prismjs/components/prism-javascript';
// import 'prismjs/components/prism-jsx';
// import 'prismjs/components/prism-typescript';

interface CodeConsoleProps {
  title: string;
  description: string;
  code: string;
  language: string;
  animateTyping?: boolean;
}

const CodeConsole: React.FC<CodeConsoleProps> = ({ 
  title, 
  description, 
  code, 
  language = 'javascript',
  animateTyping = true
}) => {
  // 1. Definimos TODOS los estados primero, en el mismo orden siempre
  const [isVisible, setIsVisible] = useState(false);
  const [hasRendered, setHasRendered] = useState(false);
  
  // 2. Luego definimos TODOS los refs
  const codeRef = useRef<HTMLElement>(null);
  const randomMs = useRef(Math.floor(Math.random() * 40) + 10).current;
  
  // 3. Normalizamos el lenguaje para Prism
  const normalizedLanguage = useRef(
    language === 'jsx' ? 'javascript' : language // Usamos javascript para jsx si hay problemas
  ).current;
  
  // 4. Llamamos al hook de animación de escritura aquí, SIEMPRE (no condicional)
  // Aunque no usemos el resultado, debemos llamar al hook para mantener el orden
  const displayedTypingCode = useTypewriterEffect(code, 15, 800);
  
  // El código que mostraremos realmente, usando el resultado del hook solo si es necesario
  const displayedCode = hasRendered && animateTyping 
    ? displayedTypingCode 
    : code;
  
  // 5. Finalmente, TODOS los useEffect, en el mismo orden siempre
  // Efecto para marcar como renderizado en el cliente
  useEffect(() => {
    setHasRendered(true);
  }, []);

  // Efecto para mostrar la animación de "carga"
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Efecto para cargar los lenguajes de Prism dinámicamente si es necesario
  useEffect(() => {
    // Función para cargar dinámicamente los lenguajes que necesitamos
    const loadPrismLanguage = async (lang: string) => {
      try {
        // Solo cargar si Prism no tiene el lenguaje ya cargado
        if (Prism && !Prism.languages[lang]) {
          // Intentar cargar JSX para React
          if (lang === 'jsx' && !Prism.languages.jsx) {
            await import('prismjs/components/prism-jsx');
          }
          
          // Intentar cargar TypeScript
          if (lang === 'typescript' && !Prism.languages.typescript) {
            await import('prismjs/components/prism-typescript');
          }
          
          // Intentar cargar TSX
          if (lang === 'tsx' && !Prism.languages.tsx) {
            await import('prismjs/components/prism-tsx');
          }
        }
      } catch (e) {
        console.warn('Error cargando lenguaje Prism:', e);
      }
    };
    
    // Cargar el lenguaje correspondiente
    loadPrismLanguage(language);
  }, [language]);
  
  // Efecto para resaltar el código usando Prism.js
  useEffect(() => {
    if (codeRef.current) {
      try {
        // Primero añadir la clase del lenguaje para asegurar resaltado correcto
        if (language === 'jsx' || language === 'tsx') {
          codeRef.current.className = `language-${language} language-javascript`;
        } else {
          codeRef.current.className = `language-${language}`;
        }
        
        // Aplicar el resaltado
        Prism.highlightElement(codeRef.current);
      } catch (error) {
        console.warn('Error al resaltar el código:', error);
      }
    }
  }, [displayedCode, language]);

  return (
    <div 
      className={`code-console-container overflow-hidden rounded-xl border border-teal-500/30 bg-gray-900/80 shadow-lg backdrop-blur-sm transition-opacity duration-500 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      style={{
        height: '600px', // Altura fija para evitar redimensionamiento
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {/* Barra superior de la consola */}
      <div className="code-console-header flex items-center justify-between bg-gray-800/90 px-4 py-3">
        <div className="flex items-center space-x-2">
          {/* Círculos de control de ventana similares a macOS */}
          <div className="h-3 w-3 rounded-full bg-red-500"></div>
          <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
          <div className="h-3 w-3 rounded-full bg-green-500"></div>
        </div>
        
        <div className="code-console-title text-sm font-medium text-gray-300">
          {title}
        </div>
        
        <div className="flex items-center space-x-2">
          {/* Indicadores de estado y actividad */}
          <div className="h-2 w-2 rounded-full bg-teal-400 animate-pulse"></div>
          <span className="text-xs text-gray-400">online</span>
        </div>
      </div>
      
      {/* Área de descripción */}
      <div className="border-b border-gray-700/80 bg-gray-800/50 px-4 py-2">
        <p className="text-sm text-gray-300">{description}</p>
      </div>
      
      {/* Área de código con carga inicial - Usamos flex-grow para que ocupe el espacio disponible */}
      <div className="relative flex-grow">
        {/* Overlay de carga con terminal animada */}
        <div 
          className={`absolute inset-0 z-10 flex items-center justify-center bg-gray-900/95 backdrop-blur-sm transition-opacity duration-700 ${
            displayedCode.length > 10 && hasRendered ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
        >
          <div className="w-full max-w-lg">
            <TerminalLoader 
              duration={1500}
              lines={[
                `> Inicializando ${language}...`,
                '> Cargando dependencias...',
                '> Importando módulos...',
                `> Preparando visualización de ${title}...`,
                '> Verificando sintaxis...'
              ]}
            />
          </div>
        </div>
        
        {/* Área de código - Scrollable si el contenido excede la altura */}
        <div className="code-console-content p-4 overflow-auto h-full code-content">
          {/* Código con resaltado de sintaxis */}
          <div className="relative font-mono text-sm">
            <pre className={`language-${language} !bg-transparent`}>
              <code 
                ref={codeRef} 
                className={`language-${language}`}
                data-language={language}
              >
                {displayedCode}
              </code>
            </pre>
            
            {/* Cursor parpadeante que sigue al texto - Solo si hasRendered es true */}
            {hasRendered && (
              <div 
                className="absolute h-4 w-2 bg-teal-400 opacity-75 animate-[blink_1s_step-end_infinite]"
                style={{
                  bottom: '0',
                  right: animateTyping && displayedCode.length < code.length ? '0' : 'auto',
                  display: animateTyping && displayedCode.length >= code.length ? 'none' : 'block'
                }}
              ></div>
            )}
          </div>
        </div>
      </div>
      
      {/* Barra inferior con información adicional */}
      <div className="code-console-footer flex items-center justify-between bg-gray-800/80 px-4 py-2 text-xs text-gray-400">
        <div>
          <span className="mr-4">
            <span className="text-teal-400">{'>'}</span> {language}
          </span>
          <span>
            <span className="text-blue-400">~</span> {new Date().getFullYear()}
          </span>
        </div>
        
        <div className="flex items-center space-x-3">
          <span>{code.split('\n').length} líneas</span>
          <span className="flex items-center">
            <svg className="mr-1 h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            {randomMs}ms
          </span>
        </div>
      </div>
      
      {/* Estilos para la animación del cursor y resaltado de sintaxis forzado */}
      <style jsx global>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        
        /* IMPORTANTE: Colores forzados para todos los lenguajes */
        /* Estos estilos se aplicarán incluso sin Prism */
        .code-content code,
        .code-content pre {
          color: #f8f8f2 !important;
          text-shadow: none;
          background: transparent !important;
        }
        
        /* JSX específico */
        .language-jsx .keyword,
        .language-jsx .tag {
          color: #ff79c6 !important;
        }
        
        .language-jsx .attr-name,
        .language-jsx .attr-value {
          color: #ffb86c !important;
        }
        
        .language-jsx .string,
        .language-jsx .attr-value > .punctuation {
          color: #2dd4bf !important;
        }
        
        .language-jsx .function {
          color: #3b82f6 !important;
        }
        
        /* JavaScript específico */
        .language-javascript .keyword {
          color: #ff79c6 !important;
        }
        
        .language-javascript .string {
          color: #2dd4bf !important;
        }
        
        .language-javascript .function {
          color: #3b82f6 !important;
        }
        
        .language-javascript .operator {
          color: #f8f8f2 !important;
        }
        
        /* Para todos los lenguajes */
        .token.comment,
        .token.prolog,
        .token.doctype,
        .token.cdata {
          color: #8a8a8a !important;
          font-style: italic;
        }

        .token.punctuation {
          color: #bbb !important;
        }

        .token.property,
        .token.tag,
        .token.boolean,
        .token.number,
        .token.constant,
        .token.symbol {
          color: #fc929e !important;
        }

        .token.selector,
        .token.attr-name,
        .token.string,
        .token.char,
        .token.builtin {
          color: #2dd4bf !important;
        }

        .token.operator,
        .token.entity,
        .token.url,
        .language-css .token.string,
        .style .token.string {
          color: #bbb !important;
        }

        .token.atrule,
        .token.attr-value,
        .token.keyword {
          color: #ff79c6 !important;
        }

        .token.function {
          color: #3b82f6 !important;
        }

        .token.regex,
        .token.important,
        .token.variable {
          color: #ffb86c !important;
        }
        
        /* Colores para imports */
        .token.imports,
        .token.from {
          color: #ff79c6 !important;
        }
        
        /* Colores de declaración de funciones */
        .token.function-variable {
          color: #3b82f6 !important;
        }
      `}</style>
    </div>
  );
};

// Wrap del componente con React.memo para optimizar renderizados
export default React.memo(CodeConsole);