'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import OriginalIridescence from '@/components/OriginalIridescence';
import SelandNavbar from '@/components/ui/SelandNavbar';
import LaunchAppButton from '@/components/ui/LaunchAppButton';
import HowToWorkSection from '@/components/landing/HowToWork';
import FeatureSection from '@/components/seland/Feature';

export default function SelandPage() {
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const bg = bgRef.current;
    if (!bg) return;

    // Set initial state on page load (like onLeaveBack)
    bg.className = 'fixed inset-0 z-0 m-8 rounded-2xl overflow-hidden';
    bg.style.transition = 'all 1s ease-in-out';

    // Animation to change classes on scroll
    ScrollTrigger.create({
      trigger: document.body,
      start: 'top -50px',
      end: 'top -100px',
      onEnter: () => {
        bg.className = 'fixed inset-0 z-0 m-[-30px] rounded-none overflow-hidden';
        bg.style.transition = 'all 1s ease-in-out';
      },
      onLeave: () => {
        bg.className = 'fixed inset-0 z-0 m-[-30px] rounded-none overflow-hidden';
        bg.style.transition = 'all 1s ease-in-out';
      },
      onEnterBack: () => {
        bg.className = 'fixed inset-0 z-0 m-[-30px] rounded-none overflow-hidden';
        bg.style.transition = 'all 1s ease-in-out';
      },
      onLeaveBack: () => {
        bg.className = 'fixed inset-0 z-0 m-8 rounded-2xl overflow-hidden';
        bg.style.transition = 'all 1s ease-in-out';
        bg.style.top = '';
        bg.style.left = '';
        bg.style.width = '';
        bg.style.height = '';
        bg.style.margin = '';
        bg.style.borderRadius = '';
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="min-h-screen">
      <div 
        ref={bgRef}
        className="fixed inset-0 z-0 m-[-40] rounded-2xl overflow-hidden"
      >
        <OriginalIridescence
          color={[0.93, 0.41, 0.09]}
          speed={1}
          amplitude={0.05}
          mouseReact={true}
        />
        <div className="absolute inset-0 bg-black/70" />
      </div>

      <div className="relative z-10 h-[calc(100vh-48px)] m-6">
        <SelandNavbar />

        <div className="absolute top-1/4 left-10 z-20">
          <h2 className="max-w-5xl text-2xl md:text-4xl lg:text-8xl font-bold leading-tight text-white">
            Start Earning Yield While Trading
          </h2>
        </div>

        <div className="absolute bottom-10 left-10 z-20 max-w-2xl">
          <p className="text-white/90 text-xl leading-relaxed">
            Trade Your Assets While They Earn Yield. Revolutionary DeFi platform that maximizes capital efficiency through intelligent automation.
          </p>
        </div>

        <div className="absolute bottom-10 right-10 z-20">
          <LaunchAppButton
            text="Launch App"
            href="/app"
          />
        </div>
      </div>
      
      <div className="relative z-10">
        <FeatureSection />
      </div>
    </div>
  );
}