'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Navbar from '@/components/ui/Navbar';
import LaunchAppButton from '@/components/ui/LaunchAppButton';
import AnimatedContainer from '@/components/ui/AnimatedContainer';

export default function HeroSection() {
  const navbarRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const navbar = navbarRef.current;
    const title = titleRef.current;
    const description = descriptionRef.current;
    const button = buttonRef.current;

    // Initial state: hide elements for slide up reveal
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

    // Slide up all elements simultaneously after container animation
    const tl = gsap.timeline({ delay: 3.0 }); // Wait for container expansion
    
    tl.to(navbar, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: 'power2.out',
    })
    .to(title, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: 'power2.out',
    }, "<")
    .to(description, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: 'power2.out',
    }, "<")
    .to(button, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: 'power2.out',
    }, "<");

  }, []);


  return (
    <section className="relative min-h-screen bg-black flex items-center justify-center p-6 overflow-hidden">
      <AnimatedContainer>
        {/* Navbar */}
        <Navbar ref={navbarRef} className="mb-8" />

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
      </AnimatedContainer>
    </section>
  );
}