"use client"

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import LaunchAppButton from "../ui/animations/LaunchAppButton"

export function DefiFlywheelSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const mainTitleRef = useRef<HTMLHeadingElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const descriptionRef = useRef<HTMLParagraphElement>(null)
  const buttonRef = useRef<HTMLDivElement>(null)
  const stepsRef = useRef<HTMLDivElement>(null)
  const steps = [
    {
      number: "01",
      title: "Yield Attract Traders from other DEX/CEX",
      description: "Higher yields compared to traditional DEXs and CEXs attract sophisticated traders looking to maximize capital efficiency while maintaining active trading strategies."
    },
    {
      number: "02",
      title: "Idle Capital Generates Yield",
      description: "Trading capital that sits idle between trades automatically earns lending yield, transforming dead capital into productive assets without compromising trading readiness."
    },
    {
      number: "03",
      title: "Trading Volume Drives Borrowing",
      description: "Increased trading activity creates higher demand for borrowing as traders leverage positions and access additional capital for market opportunities."
    },
    {
      number: "04",
      title: "Strategic Orders Boost Liquidity",
      description: "Professional traders place strategic limit orders that enhance order book depth, creating better spreads and improved trading conditions for all participants."
    },
    {
      number: "05",
      title: "Enhanced Liquidity Attracts More Capital",
      description: "Superior liquidity conditions draw additional capital from institutional and retail traders, creating a compounding effect that strengthens the entire ecosystem."
    }
  ]

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    if (mainTitleRef.current && sectionRef.current && titleRef.current && descriptionRef.current && buttonRef.current && stepsRef.current) {
      const mainTitle = mainTitleRef.current
      const title = titleRef.current
      const description = descriptionRef.current
      const button = buttonRef.current
      const steps = stepsRef.current.children

      // Set initial states
      gsap.set(mainTitle, { y: 60, opacity: 0 })
      gsap.set(title, { y: 50, opacity: 0 })
      gsap.set(description, { y: 30, opacity: 0 })
      gsap.set(button, { y: 20, opacity: 0 })
      gsap.set(steps, { x: 50, opacity: 0 })

      // Main title animation (separate trigger)
      gsap.to(mainTitle, {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: mainTitle,
          start: "top 85%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      })

      // Create timeline for main content section
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      })

      // Animate left section elements
      tl.to(title, {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power2.out"
      })
        .to(description, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out"
        }, "-=0.7")
        .to(button, {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power2.out"
        }, "-=0.5")

        // Animate steps with stagger
        .to(steps, {
          x: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out"
        }, "-=0.3")
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <div className='min-h-screen bg-[#1e1c1c] relative z-10 text-white rounded-b-[100px]'>
      <div className="px-6 pb-12 sm:px-8 lg:px-16 bg-[#1e1c1c]">
        <div className="w-full mx-auto text-start">
          <h1 ref={mainTitleRef} className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-tight text-balance">
            Order Book DEX With Lending Protocol
          </h1>
        </div>
      </div>
      <div ref={sectionRef} className="flex">
        {/* Left Section */}
        <div className="flex-1 flex flex-col justify-start px-12 lg:px-20 py-14">
          <div className="max-w-xl">
            <h1 ref={titleRef} className="text-3xl lg:text-4xl font-bold mb-6 leading-tight">
              The Perfect DeFi Flywheel
            </h1>
            <p ref={descriptionRef} className="text-gray-400 text-lg leading-relaxed mb-8">
              Matching Order Book Dex with Lending Protocol creates a self-reinforcing flywheel effect where idle trading capital generates yield, higher yields attract more liquidity, better liquidity improves trading conditions, and increased trading volume drives more borrowing demand - creating an unstoppable cycle of growth.
            </p>
            <div ref={buttonRef} className="w-fit">
              <LaunchAppButton />
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex-1 flex flex-col justify-center px-12 lg:px-20 py-16">
          <div ref={stepsRef} className="space-y-12">
            {steps.map((step, index) => (
              <div key={step.number} className="flex gap-8">
                <div className="flex flex-col items-center">
                  <div className="text-gray-500 text-lg font-mono mb-2">
                    {step.number}
                  </div>
                  {index < steps.length - 1 && (
                    <div className="w-px bg-gray-700 h-20 mt-4"></div>
                  )}
                </div>
                <div className="flex-1 pb-8">
                  <h3 className="text-xl font-semibold mb-3 text-white">
                    {step.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}