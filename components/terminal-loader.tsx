'use client'

import React, { useState, useEffect } from 'react';

interface TerminalLoaderProps {
  onComplete?: () => void;
  duration?: number;
  lines?: string[];
}

const TerminalLoader: React.FC<TerminalLoaderProps> = ({
  onComplete,
  duration = 2000,
  lines = [
    'Initializing environment...',
    'Loading dependencies...',
    'Checking syntax...',
    'Optimizing code...',
    'Preparing console display...'
  ]
}) => {
  const [visibleLines, setVisibleLines] = useState<string[]>([]);
  const [completed, setCompleted] = useState(false);
  
  useEffect(() => {
    let timer: NodeJS.Timeout;
    let currentIndex = 0;
    
    // Tiempo entre líneas (distribuido a lo largo de la duración)
    const interval = duration / (lines.length + 1);
    
    const addLine = () => {
      if (currentIndex < lines.length) {
        setVisibleLines(prev => [...prev, lines[currentIndex]]);
        currentIndex++;
        timer = setTimeout(addLine, interval);
      } else {
        setCompleted(true);
        if (onComplete) {
          setTimeout(onComplete, 300);
        }
      }
    };
    
    // Iniciar la secuencia
    timer = setTimeout(addLine, 100);
    
    return () => clearTimeout(timer);
  }, [lines, duration, onComplete]);
  
  return (
    <div className={`terminal-loader p-4 font-mono text-sm text-green-400 transition-opacity duration-300 ${
      completed ? 'opacity-0' : 'opacity-100'
    }`}>
      <div className="mb-2 flex items-center space-x-1">
        <span className="text-white">$</span>
        <span className="typing-text">npm run start:dev</span>
      </div>
      
      {visibleLines.map((line, index) => (
        <div key={index} className="py-1 pl-4 text-xs opacity-90">
          {line}
          {index === visibleLines.length - 1 && !completed && (
            <span className="ml-1 inline-block h-3 w-2 bg-green-400 animate-[blink_1s_step-end_infinite]"></span>
          )}
        </div>
      ))}
      
      {completed && (
        <div className="mt-2 text-teal-400">
          Ready! <span className="ml-1 inline-block h-3 w-2 bg-teal-400 animate-[blink_1s_step-end_infinite]"></span>
        </div>
      )}
      
      <style jsx>{`
        .typing-text {
          overflow: hidden;
          border-right: 2px solid #4ade80;
          white-space: nowrap;
          animation: typing 1s steps(30, end), blink-caret .5s step-end infinite;
        }
        
        @keyframes typing {
          from { width: 0 }
          to { width: 100% }
        }
        
        @keyframes blink-caret {
          from, to { border-color: transparent }
          50% { border-color: #4ade80 }
        }
      `}</style>
    </div>
  );
};

export default TerminalLoader;