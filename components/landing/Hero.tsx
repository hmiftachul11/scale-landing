'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import Link from 'next/link';
import Image from 'next/image';
import LaunchAppButton from '@/components/ui/LaunchAppButton';

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const navbarRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    const content = contentRef.current;
    const navbar = navbarRef.current;
    const title = titleRef.current;
    const description = descriptionRef.current;
    const button = buttonRef.current;
    
    if (!container || !content) return;

    // Initial state: single point (zero size)
    gsap.set(container, {
      width: '0px',
      height: '0px',
      borderRadius: '50%',
      scale: 1,
      opacity: 1,
      transformOrigin: 'center center',
    });

    // Initial state: content hidden (CSS already sets opacity-0, just set scale)
    gsap.set(content, {
      scale: 0.8,
    });

    // Initial state: hide entire navbar for slide up reveal
    if (navbar) {
      gsap.set(navbar, {
        y: 50,
        opacity: 0,
      });
    }
    if (title) {
      gsap.set(title, {
        y: 60,
        opacity: 0,
      });
    }
    if (description) {
      gsap.set(description, {
        y: 40,
        opacity: 0,
      });
    }
    if (button) {
      gsap.set(button, {
        y: 50,
        opacity: 0,
      });
    }

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
      onComplete: () => setIsExpanded(true)
    }, "-=0.5");

    // Slide up all elements simultaneously
    tl.to(navbar, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: 'power2.out',
    }, "-=0.3")
    .to(title, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: 'power2.out',
    }, "<") // Start at same time as navbar
    .to(description, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: 'power2.out',
    }, "<") // Start at same time as navbar
    .to(button, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: 'power2.out',
    }, "<"); // Start at same time as navbar

  }, []);


  return (
    <section className="relative min-h-screen bg-black flex items-center justify-center p-6 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800"></div>

      {/* Main expandable container */}
      <div
        ref={containerRef}
        className="relative bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-600/40 backdrop-blur-sm shadow-2xl shadow-black/50"
        style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Layout content - appears after expansion */}
        <div
          ref={contentRef}
          className="absolute inset-0 p-6 md:px-12 md:py-6 flex flex-col text-white overflow-hidden opacity-0"
        >
          {/* Navbar inside layout */}
          <div ref={navbarRef} className="flex items-center justify-between w-full mb-8">
            {/* Logo - Top Left */}
            <div className="flex items-center gap-3">
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
            <div className="bg-white/10 backdrop-blur-md rounded-lg cursor-pointer px-2 py-2 border border-white/20">
              <div className="flex items-center space-x-1">
                <button className="px-4 py-2 text-gray-300 hover:text-white text-sm font-medium transition-colors rounded-lg cursor-pointer hover:bg-white/10">
                  PLATFORM
                </button>
                <button className="px-4 py-2 text-gray-300 hover:text-white text-sm font-medium transition-colors rounded-lg cursor-pointer hover:bg-white/10">
                  COMPANY
                </button>
                <button className="px-4 py-2 text-gray-300 hover:text-white text-sm font-medium transition-colors rounded-lg cursor-pointer hover:bg-white/10">
                  NEWSROOM
                </button>
                <Link
                  href="#"
                  className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white text-sm font-medium rounded-lg cursor-pointer transition-all"
                >
                  WORK WITH US
                </Link>
              </div>
            </div>
          </div>

          {/* Background pattern */}
          <div className="absolute inset-0 opacity-5 pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-32 h-32 border border-white/20 rounded-full"></div>
            <div className="absolute bottom-1/3 right-1/3 w-24 h-24 border border-white/10 rounded-full"></div>
            <div className="absolute top-2/3 right-1/4 w-16 h-16 border border-white/10 rounded-full"></div>
          </div>

          {/* Main content */}
          <div className="mt-8 md:mt-12">
            <h1 ref={titleRef} className="max-w-5xl text-2xl md:text-4xl lg:text-8xl font-bold leading-tight">
              Start Earning Yield While Trading
            </h1>
          </div>

          {/* Description text - Bottom Left */}
          <div className="absolute bottom-6 md:bottom-12 left-6 md:left-12">
            <p ref={descriptionRef} className="text-lg md:text-xl text-gray-300 max-w-2xl leading-relaxed">
              Trade Your Assets While They Earn Yield. Revolutionary DeFi platform that maximizes capital efficiency through intelligent automation.
            </p>
          </div>

          {/* Launch App Button - Bottom Right */}
          <div className="absolute bottom-6 md:bottom-12 right-6 md:right-12">
            <LaunchAppButton ref={buttonRef} href="#" />
          </div>
        </div>
      </div>

    </section>
  );
}