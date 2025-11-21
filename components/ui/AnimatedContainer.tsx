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

    // Initial state: single point (zero size)
    gsap.set(container, {
      width: '2px',
      height: '2px',
      borderRadius: '50%',
      scale: 1,
      opacity: 1,
      transformOrigin: 'center center',
    });

    // Initial state: content hidden
    gsap.set(content, {
      scale: 0.8,
    });

    // Animation: grow from single point to full layout
    const tl = gsap.timeline();

    // Grow from point to full size
    tl.to(container, {
      width: 'calc(100vw - 48px)',
      height: 'calc(100vh - 48px)',
      borderRadius: '24px',
      duration: 2.5,
      ease: 'power3.out',
      delay: 0.8,
    })
    // Then fade in content container
    .to(content, {
      opacity: 1,
      scale: 1,
      duration: 0.8,
      ease: 'power2.out',
    }, "-=0.5");

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
      }}
      color={[0.2, 0.3, 0.8]} 
      speed={0.5} 
      amplitude={0.05} 
      mouseReact={true}
    >
      {/* Dark overlay for content readability */}
      <div className="absolute inset-0 bg-black/60" />
      
      <div
        ref={contentRef}
        className="absolute inset-0 p-6 md:px-12 md:py-6 flex flex-col text-white overflow-hidden opacity-0 z-10"
      >
        {children}
      </div>
    </Iridescence>
  );
}