'use client';

import { useEffect, useRef, ReactNode } from 'react';
import { gsap } from 'gsap';
import Iridescence from '@/components/Iridescence';

interface AnimatedContainerProps {
  children: ReactNode;
  className?: string;
}

export default function AnimatedContainer({ children, className = "" }: AnimatedContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const content = contentRef.current;
    
    if (!container || !content) return;

    // Initial state: single point (zero size) with hidden background
    gsap.set(container, {
      width: '2px',
      height: '2px',
      borderRadius: '50%',
      scale: 1,
      opacity: 1,
      transformOrigin: 'center center',
    });
    
    // Canvas will be visible immediately from Iridescence component

    // Initial state: content hidden
    gsap.set(content, {
      scale: 0.8,
      opacity: 0,
    });

    // Animation: grow from single point to full layout
    const tl = gsap.timeline({ delay: 0 });

    // Grow from point to full size - start immediately with Iridescence visible
    tl.to(container, {
      width: 'calc(100vw - 48px)',
      height: 'calc(100vh - 48px)',
      borderRadius: '24px',
      duration: 2.5,
      ease: 'power3.out',
    })
    // Then fade in content container
    .to(content, {
      opacity: 1,
      scale: 1,
      duration: 0.8,
      ease: 'power2.out',
    }, "-=0.8");

  }, []);

  return (
    <Iridescence
      ref={containerRef}
      className={`relative border border-gray-600/40 backdrop-blur-sm shadow-2xl shadow-black/50 overflow-hidden ${className}`}
      style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgb(30, 20, 15)', // Dark fallback with orange hint
      }}
      color={[0.93, 0.41, 0.09]} 
      speed={1} 
      amplitude={0.05} 
      mouseReact={true}
    >

      <div className="absolute inset-0 bg-black/60" />
      <div
        ref={contentRef}
        className="absolute inset-0 p-6 md:px-12 md:py-6 flex flex-col text-white overflow-hidden z-10"
      >
        {children}
      </div>
    </Iridescence>
  );
}