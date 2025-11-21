'use client';

import { forwardRef, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import Image from 'next/image';

interface NavbarProps {
  className?: string;
}

const Navbar = forwardRef<HTMLDivElement, NavbarProps>(({ className = '' }, ref) => {
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const logo = logoRef.current;
    if (!logo) return;

    // GSAP ScrollTrigger for logo background (only for scroll-triggered styling)
    const logoAnimation = gsap.to(logo, {
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      backdropFilter: 'blur(12px)',
      borderRadius: '8px',
      paddingTop: '8px',
      paddingBottom: '8px',
      paddingLeft: '12px',
      paddingRight: '12px',
      duration: 0.3,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: 'body',
        start: 'top -100px',
        end: 'bottom top',
        toggleActions: 'play none none reverse',
      }
    });

    return () => {
      logoAnimation.scrollTrigger?.kill();
      logoAnimation.kill();
    };
  }, []);

  return (
    <div ref={ref} className={`flex items-center justify-between w-full z-50 ${className}`}>
      {/* Logo - Top Left */}
      <div ref={logoRef} className="flex items-center gap-3 transition-all duration-300">
        <div className="relative w-8 h-8">
          <Image
            src="/images/logo/ScaleX.webp"
            alt="ScaleX Logo"
            width={32}
            height={32}
            className="w-full h-full object-contain"
          />
        </div>
        <span className="font-bold text-2xl md:text-xl text-white">
          ScaleX
        </span>
      </div>

      {/* Navigation Pill - Top Right */}
      <div className="bg-white/20 backdrop-blur-md rounded-lg cursor-pointer px-2 py-2">
        <div className="flex items-center space-x-1">
          <button className="px-4 py-3 text-gray-300 hover:text-white text-sm font-medium transition-colors rounded-lg cursor-pointer hover:bg-white/10">
            PLATFORM
          </button>
          <button className="px-4 py-3 text-gray-300 hover:text-white text-sm font-medium transition-colors rounded-lg cursor-pointer hover:bg-white/10">
            COMPANY
          </button>
          <button className="px-4 py-3 text-gray-300 hover:text-white text-sm font-medium transition-colors rounded-lg cursor-pointer hover:bg-white/10">
            NEWSROOM
          </button>
          <Link
            href="#"
            className="px-4 py-3 bg-gray-800 hover:bg-gray-700 text-white text-sm font-medium rounded-lg cursor-pointer transition-all"
          >
            WORK WITH US
          </Link>
        </div>
      </div>
    </div>
  );
});

Navbar.displayName = 'Navbar';

export default Navbar;