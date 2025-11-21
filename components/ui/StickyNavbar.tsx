'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import Image from 'next/image';

export default function StickyNavbar() {
  const navbarRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const navbar = navbarRef.current;
    const logo = logoRef.current;
    if (!navbar || !logo) return;

    // Initially hide the sticky navbar
    gsap.set(navbar, {
      y: -100,
      opacity: 0,
    });

    // Show sticky navbar when scrolling past hero section
    const showNavbar = gsap.to(navbar, {
      y: 0,
      opacity: 1,
      duration: 0.3,
      ease: 'power2.out',
      paused: true,
    });

    ScrollTrigger.create({
      trigger: 'body',
      start: 'top -200px',
      end: 'bottom top',
      onEnter: () => showNavbar.play(),
      onLeaveBack: () => showNavbar.reverse(),
    });

    // Logo background animation
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
        start: 'top -300px',
        end: 'bottom top',
        toggleActions: 'play none none reverse',
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      showNavbar.kill();
      logoAnimation.kill();
    };
  }, []);

  return (
    <div
      ref={navbarRef}
      className="fixed top-0 left-0 right-0 z-50 bg-transparent px-6 md:px-18 py-4"
    >
      <div className="flex items-center justify-between w-full">
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
          <span className="font-bold text-xl text-white">
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
    </div>
  );
}