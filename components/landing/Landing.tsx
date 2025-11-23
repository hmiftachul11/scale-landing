'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Iridescence from '@/components/Iridescence';
import Navbar from './Navbar';
import LaunchAppButton from '@/components/ui/LaunchAppButton';
import Feature from './Feature';
import { HowItWork } from './HowItWork';
import { DefiFlywheelSection } from './DefiFlywheelSection';
import { IntegrationsMarquee } from './IntegrationsMarquee';
import { CTA } from './CTA';
import { Footer } from './Footer';

export default function Landing() {
  const bgRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const navbarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const bg = bgRef.current;
    const content = contentRef.current;
    const navbar = navbarRef.current;
    if (!bg || !content || !navbar) return;

    // Store original styles to restore on cleanup
    const originalBgStyle = bg.style.cssText;
    const originalContentStyle = content.style.cssText;
    const originalNavbarStyle = navbar.style.cssText;

    // Set final size immediately but scale to 0
    bg.className = 'fixed inset-0 z-0 m-8 rounded-2xl overflow-hidden';
    gsap.set(bg, {
      scale: 0.001,
      borderRadius: '50%',
      transformOrigin: 'center center',
    });

    // Hide content and navbar initially
    gsap.set(content, {
      opacity: 0,
    });
    gsap.set(content.children, {
      y: 50,
      opacity: 0,
    });
    gsap.set(navbar, {
      y: -20,
      opacity: 0,
    });

    // Animation: grow from center using scale
    const tl = gsap.timeline({ delay: 0 });

    // Background expansion
    tl.to(bg, {
      scale: 1,
      borderRadius: '24px',
      duration: 2.5,
      ease: 'power3.out',
      onComplete: () => {
        if (bg) {
          bg.style.transition = 'all 1s ease-in-out';
          gsap.set(bg, { clearProps: "scale,borderRadius,transformOrigin" });
        }
      }
    })
    // Navbar reveal animation
    .to(navbar, {
      y: 0,
      opacity: 1,
      duration: 0.6,
      ease: 'power2.out',
    }, "-=1.2")
    // Content container reveal
    .to(content, {
      opacity: 1,
      duration: 0.3,
      ease: 'power2.out',
    }, "-=1.0")
    // Content reveal animation - staggered from bottom to top
    .to(content.children, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: 'power2.out',
      stagger: 0.15,
    }, "-=0.8");

    // Animation to change classes on scroll
    const scrollTrigger = ScrollTrigger.create({
      trigger: document.body,
      start: 'top -50px',
      end: 'top -100px',
      onEnter: () => {
        if (bg) {
          bg.className = 'fixed inset-0 z-0 m-[-30px] rounded-none overflow-hidden';
          bg.style.transition = 'all 1s ease-in-out';
        }
      },
      onLeave: () => {
        if (bg) {
          bg.className = 'fixed inset-0 z-0 m-[-30px] rounded-none overflow-hidden';
          bg.style.transition = 'all 1s ease-in-out';
        }
      },
      onEnterBack: () => {
        if (bg) {
          bg.className = 'fixed inset-0 z-0 m-[-30px] rounded-none overflow-hidden';
          bg.style.transition = 'all 1s ease-in-out';
        }
      },
      onLeaveBack: () => {
        if (bg) {
          bg.className = 'fixed inset-0 z-0 m-8 rounded-2xl overflow-hidden';
          bg.style.transition = 'all 1s ease-in-out';
          // Clear specific properties instead of setting them
          bg.style.removeProperty('top');
          bg.style.removeProperty('left');
          bg.style.removeProperty('width');
          bg.style.removeProperty('height');
          bg.style.removeProperty('margin');
          bg.style.removeProperty('border-radius');
        }
      }
    });

    return () => {
      // Kill timeline first
      tl.kill();
      // Kill scroll trigger
      scrollTrigger.kill();
      // Clear all GSAP properties and restore original styles
      if (bg) {
        gsap.set(bg, { clearProps: "all" });
        bg.style.cssText = originalBgStyle;
      }
      if (content) {
        gsap.set(content, { clearProps: "all" });
        gsap.set(content.children, { clearProps: "all" });
        content.style.cssText = originalContentStyle;
      }
      if (navbar) {
        gsap.set(navbar, { clearProps: "all" });
        navbar.style.cssText = originalNavbarStyle;
      }
      // Kill any remaining ScrollTriggers
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <>
      <div ref={navbarRef} className="z-50 opacity-0 fixed top-10 left-10 right-10 px-6 py-4 transition-all duration-300">
        <Navbar />
      </div>
      
      <div className="min-h-screen">
        <div 
          ref={bgRef}
          className="fixed inset-0 z-0 m-[-40] rounded-2xl overflow-hidden"
        >
          <Iridescence
            color={[0.93, 0.41, 0.09]}
            speed={1}
            amplitude={0.05}
            mouseReact={true}
          />
          <div className="absolute inset-0 bg-black/70" />
        </div>

        <div ref={contentRef} className="relative z-10 h-[calc(100vh-48px)] m-6 opacity-0">
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
        
        <Feature
          label="Features"
          currentStep={1}
          totalSteps={3}
          title="Ultimate Capital Efficiency"
          description="Maximize returns by keeping your entire portfolio productive. Trade your assets while they earn yield through our revolutionary DeFi platform that leverages intelligent automation for optimal capital efficiency."
        />
      </div>
      
      <HowItWork />

      <DefiFlywheelSection />

      <IntegrationsMarquee />

      <CTA />

      <Footer />
    </>
  );
}