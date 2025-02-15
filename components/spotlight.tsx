"use client";

import React, { useRef, useState, useEffect } from "react";
import useMousePosition from "@/utils/useMousePosition";

type SpotlightProps = {
  children: React.ReactNode;
  className?: string;
};

type SpotlightChildProps = {
  props: {
    [key: string]: any;
  };
} & {
  'data-spotlight-index': number;
  'data-spotlight-active': boolean;
};

export default function Spotlight({
  children,
  className = "",
}: SpotlightProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mousePosition = useMousePosition();
  const mouse = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const containerSize = useRef<{ w: number; h: number }>({ w: 0, h: 0 });
  const [boxes, setBoxes] = useState<Array<HTMLElement>>([]);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    if (containerRef.current) {
      setBoxes(
        Array.from(containerRef.current.children).map(
          (el) => el as HTMLElement,
        ),
      );
    }
  }, []);

  useEffect(() => {
    initContainer();
    window.addEventListener("resize", initContainer);

    return () => {
      window.removeEventListener("resize", initContainer);
    };
  }, [boxes]);

  useEffect(() => {
    onMouseMove();
  }, [mousePosition]);

  const initContainer = () => {
    if (containerRef.current) {
      containerSize.current.w = containerRef.current.offsetWidth;
      containerSize.current.h = containerRef.current.offsetHeight;
    }
  };

  const onMouseMove = () => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const { w, h } = containerSize.current;
      const x = mousePosition.x - rect.left;
      const y = mousePosition.y - rect.top;
      const inside = x < w && x > 0 && y < h && y > 0;
      
      if (inside) {
        mouse.current.x = x;
        mouse.current.y = y;
        
        boxes.forEach((box, index) => {
          const boxRect = box.getBoundingClientRect();
          const boxX = -(boxRect.left - rect.left) + mouse.current.x;
          const boxY = -(boxRect.top - rect.top) + mouse.current.y;
          
          box.style.setProperty("--mouse-x", `${boxX}px`);
          box.style.setProperty("--mouse-y", `${boxY}px`);
          
          const isOverBox = 
            mousePosition.x >= boxRect.left &&
            mousePosition.x <= boxRect.right &&
            mousePosition.y >= boxRect.top &&
            mousePosition.y <= boxRect.bottom;
          
          if (isOverBox && hoveredIndex !== index) {
            setHoveredIndex(index);
          } else if (!isOverBox && hoveredIndex === index) {
            setHoveredIndex(null);
          }
          
          box.dataset.hovered = isOverBox ? 'true' : 'false';
        });
      } else {
        setHoveredIndex(null);
      }
    }
  };

  return (
    <div className={className} ref={containerRef}>
      {React.Children.map(children, (child, index) => {
        if (React.isValidElement(child)) {
          const elementWithProps = child as React.ReactElement<SpotlightChildProps>;
          return React.cloneElement(elementWithProps, {
            ...elementWithProps.props,
            'data-spotlight-index': index,
            'data-spotlight-active': hoveredIndex === index
          });
        }
        return child;
      })}
    </div>
  );
}