'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface FeatureProps {
  label?: string
  currentStep?: number
  totalSteps?: number
  title?: string
  description: string
  backgroundImage?: string
}

const featureContents = [
  {
    step: 1,
    title: 'Ultimate Capital Efficiency',
    description: 'Maximize returns by keeping your entire portfolio productive with our revolutionary approach to capital deployment. Never let your assets sit idle again while maintaining full liquidity and trading flexibility across multiple protocols and markets.',
  },
  {
    step: 2,
    title: 'Order Book Liquidation Protection',
    description: 'Trade safely with our advanced built-in protection mechanisms that shield you from unfavorable liquidations. Our intelligent monitoring system continuously tracks market conditions and automatically adjusts positions to prevent forced liquidations during volatile periods.',
  },
  {
    step: 3,
    title: 'Smart Loan Repayment System',
    description: 'Benefit from automated strategies that intelligently optimize your debt management and maximize returns through dynamic rebalancing. Our sophisticated algorithms continuously analyze market opportunities and automatically execute optimal repayment schedules based on yield differentials.',
  },
];

export default function Feature({
  label,
  currentStep = 1,
  totalSteps = 3,
  title,
  description,
  backgroundImage,
}: FeatureProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const [activeContent, setActiveContent] = useState(0);
  const previousContentRef = useRef(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const progressBar = progressRef.current;
    const content = contentRef.current;
    const title = titleRef.current;
    const description = descriptionRef.current;
    if (!section || !progressBar || !content || !title || !description) return;

    // Set initial states
    gsap.set(progressBar, { scaleX: 0, transformOrigin: 'left center' });
    gsap.set(content, { opacity: 1, y: 0 }); // Make first content visible

    // Split text into words and wrap each word in a span
    const splitTextIntoWords = (element: HTMLElement) => {
      const text = element.textContent || '';
      const words = text.split(' ');
      element.innerHTML = words.map(word => 
        `<span style="opacity: 0.6; color: white; display: inline-block; margin-right: 0.25em;">${word}</span>`
      ).join('');
      return element.querySelectorAll('span');
    };

    // Split title and description into word spans
    const titleWords = splitTextIntoWords(title);
    const descriptionWords = splitTextIntoWords(description);
    const allWords = [...titleWords, ...descriptionWords];

    // Word-by-word reveal animation
    const wordRevealAnimation = gsap.to(allWords, {
      opacity: 1,
      duration: 1,
      stagger: {
        each: 0.1,
        from: 'start'
      },
      ease: 'power2.out',
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: '+=300vh', // Match the progress bar duration
        scrub: 1,
      }
    });

    const scrollTrigger = gsap.to(progressBar, {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: '+=300vh', // Make it much longer for better animation experience
        scrub: 1,
        pin: true,
        pinSpacing: true,
        onUpdate: (self) => {
          // Calculate which content should be active based on progress
          const progress = self.progress;
          let newContentIndex = 0;

          if (progress > 0.66) {
            newContentIndex = 2;
          } else if (progress > 0.33) {
            newContentIndex = 1;
          } else {
            newContentIndex = 0;
          }

          // Continuous word reveal animation based on progress
          const currentWords = content.querySelectorAll('span');
          if (currentWords.length > 0) {
            const stepProgress = ((progress * 3) % 1); // Progress within current step
            const wordsToReveal = Math.floor(stepProgress * currentWords.length);
            
            currentWords.forEach((word, index) => {
              if (index <= wordsToReveal) {
                gsap.set(word, { opacity: 1 });
              } else {
                gsap.set(word, { opacity: 0.6 });
              }
            });
          }

          // Only animate if content is actually changing
          if (newContentIndex !== previousContentRef.current) {
            const content = contentRef.current;
            if (content) {
              // Update the previous content ref
              previousContentRef.current = newContentIndex;
              
              // Fade out current content (fade up)
              gsap.to(content, {
                opacity: 0,
                y: -20,
                duration: 0.3,
                ease: 'power2.out',
                onComplete: () => {
                  // Update content
                  setActiveContent(newContentIndex);
                  
                  // Re-split and setup new words for animation
                  setTimeout(() => {
                    const newTitleWords = splitTextIntoWords(title);
                    const newDescriptionWords = splitTextIntoWords(description);
                    const newAllWords = [...newTitleWords, ...newDescriptionWords];
                    
                    // Calculate progress within current step for word reveal
                    const stepProgress = ((progress * 3) % 1);
                    const wordsToReveal = Math.floor(stepProgress * newAllWords.length);
                    
                    // Set initial state for new words and reveal based on current progress
                    gsap.set(newAllWords, { opacity: 0.6 });
                    gsap.set(newAllWords.slice(0, wordsToReveal), { opacity: 1 });
                  }, 50);
                  
                  // Fade in new content (fade down)
                  gsap.fromTo(content, 
                    { opacity: 0, y: 20 },
                    { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }
                  );
                }
              });
            }
          }
        }
      }
    });

    return () => {
      scrollTrigger.scrollTrigger?.kill();
      scrollTrigger.kill();
      wordRevealAnimation.scrollTrigger?.kill();
      wordRevealAnimation.kill();
    };
  }, []);

  const currentContent = featureContents[activeContent];

  return (
    <section ref={sectionRef} className="relative min-h-screen overflow-hidden">
      {/* Background image overlay */}
      {backgroundImage && (
        <div
          className="absolute inset-0 opacity-40 bg-cover bg-center"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
      )}

      {/* Content wrapper */}
      <div className="absolute top-1/5 z-10 w-full">
        {/* Header */}
        <div className="px-8 py-6 mx-10 mb-4">
          <div className="flex items-center gap-2 bg-white/20 w-fit px-3 py-2 rounded-lg">
            <div className="w-5 h-5 bg-orange-600 rounded-lg" />
            <span className="text-sm font-semibold text-white tracking-widest uppercase">{label}</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-px bg-white/20 relative">
          <div
            ref={progressRef}
            className="absolute left-0 top-0 h-full bg-white w-full origin-left"
            style={{ transform: 'scaleX(0)' }}
          />
        </div>

        {/* Main content */}
        <div className="flex items-start mt-8 mx-10">
          {/* Left side - 1/3 width */}
          <div className="w-1/3 flex items-start px-8">
            <div className="border border-white/20 rounded-full px-6 py-3 bg-white/5 backdrop-blur-sm">
              <span className="text-white text-sm font-light tracking-widest">
                {String(currentContent.step).padStart(2, "0")} / {String(totalSteps).padStart(2, "0")}
              </span>
            </div>
          </div>

          {/* Right side - 2/3 width */}
          <div ref={contentRef} className="w-2/3 px-8 pr-16">
            <h2 ref={titleRef} className="text-4xl md:text-5xl text-white mb-6 leading-tight">
              {currentContent.title}
            </h2>
            <p ref={descriptionRef} className="text-xl md:text-2xl text-white leading-relaxed text-balance">
              {currentContent.description}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}