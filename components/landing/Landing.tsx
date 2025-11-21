'use client';

import CallToActionSection from './CallToAction';
import FeatureSection from './Feature';
import HeroSection from './Hero';
import HowToWorkSection from './HowToWork';
import StickyNavbar from '@/components/ui/StickyNavbar';
import AnimatedContainer from '@/components/ui/AnimatedContainer';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-hidden">
      <StickyNavbar />
      <section className="relative min-h-screen bg-black flex items-center justify-center p-6 overflow-hidden">
        <AnimatedContainer>
          <HeroSection />
        </AnimatedContainer>
      </section>

      <FeatureSection />

      <HowToWorkSection />

      <CallToActionSection />

      <footer className="relative z-10 px-6 py-8 md:px-12 lg:px-24 border-t border-white/10">
        <div className="max-w-6xl mx-auto text-center text-slate-400">
          <p>© 2025 ScaleX Protocol. All rights reserved.</p>
        </div>
      </footer>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}