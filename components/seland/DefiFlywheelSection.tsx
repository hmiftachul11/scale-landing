"use client"

import LaunchAppButton from "../ui/LaunchAppButton"

export function DefiFlywheelSection() {
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

  return (
    <div className="min-h-screen bg-[#1e1c1c] relative z-10 text-white flex">
      {/* Left Section */}
      <div className="flex-1 flex flex-col justify-start px-12 lg:px-20 py-20">
        <div className="max-w-xl">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
            The Perfect DeFi Flywheel
          </h1>
          <p className="text-gray-400 text-lg leading-relaxed mb-8">
            Matching Order Book Dex with Lending Protocol creates a self-reinforcing flywheel effect where idle trading capital generates yield, higher yields attract more liquidity, better liquidity improves trading conditions, and increased trading volume drives more borrowing demand - creating an unstoppable cycle of growth.
          </p>
          <div className="w-fit">
            <LaunchAppButton />
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex-1 flex flex-col justify-center px-12 lg:px-20 py-16">
        <div className="space-y-12">
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
  )
}