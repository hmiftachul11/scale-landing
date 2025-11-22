'use client';

import { DefiBeamAnimation } from '@/components/ui/animations/DefiBeamAnimation';

interface ProgressItem {
  label: string;
  percentage: number;
}

interface ChecklistItem {
  task: string;
  completed: boolean;
}

interface Metric {
  label: string;
  value: string;
  change: string;
  positive: boolean;
}

interface StepContent {
  type: "metrics" | "progress" | "checklist" | "tracker" | "animation";
  metrics?: Metric[];
  items?: ProgressItem[] | ChecklistItem[];
  progress?: number;
}

interface Step {
  number: number;
  title: string;
  description: string;
  content: StepContent;
}

export function HowItWork() {
  const steps: Step[] = [
    {
      number: 1,
      title: "Connect Wallet",
      description: "Connect your wallet to create your trading account.",
      content: {
        type: "animation",
      },
    },
    {
      number: 2,
      title: "Deposit & Earn",
      description:
        "Deposit assets like USDC to our Balance Manager contract. Your actual tokens are sent to the Lending Manager for yield and borrowing power while you receive synthetic sUSDC tokens for trading.",
      content: {
        type: "progress",
        items: [
          { label: "Yield", percentage: 12.5 },
          { label: "Volume", percentage: 89 },
          { label: "Utilization", percentage: 76 },
        ],
      },
    },
    {
      number: 3,
      title: "Trade Instantly",
      description:
        "Trade using your synthetic tokens (sUSDC) on our CLOB while your actual USDC continues earning yield. Auto-redemption occurs when orders are matched.",
      content: {
        type: "checklist",
        items: [
          { task: "Enable auto-compounding", completed: true },
          { task: "Optimize liquidity pools", completed: true },
          { task: "Configure risk parameters", completed: true },
        ],
      },
    },
    {
      number: 4,
      title: "Maximize Returns",
      description: "Monitor both your market performance and accumulated yield in real-time.",
      content: {
        type: "tracker",
        progress: 68,
      },
    },
  ]

  return (
    <section className="bg-[#1e1b1a] relative z-10 rounded-t-[100px]">
      <div className="px-6 py-24 sm:px-8 lg:px-16">
        <div className="w-full mx-auto text-start">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-tight text-balance">
            Earn yield while you trade.
          </h1>
        </div>
      </div>

      <div className="px-6 sm:px-8 lg:px-16 pb-24">
        <div className="w-full mx-auto">
          <div className="mb-16">
            {/* Step labels above timeline */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 mb-12">
              {steps.map((step) => (
                <div key={step.number} className="flex flex-col">
                  <p className="text-sm font-semibold tracking-wide text-white/80 mb-2">STEP {step.number}</p>
                  <h3 className="text-xl font-semibold text-white">{step.title}</h3>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-0 mb-16">
              {steps.map((_, index) => (
                <div key={index} className="flex items-center flex-1">
                  <div className="w-2 h-2 bg-orange-500 rounded-full" />
                  <div className="flex-1 h-px bg-white/20 mx-2" />
                </div>
              ))}
              <div className="w-2 h-2 bg-orange-500 rounded-full" />
            </div>
          </div>

          {/* Cards with integrated feature content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step) => (
              <div
                key={step.number}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-linear-to-br from-white/5 via-white/5 to-orange-500/10 p-6 backdrop-blur-sm hover:border-white/20 transition-all duration-300"
              >
                <div className="relative z-10 space-y-6">
                  <p className="text-sm text-white/70 leading-relaxed">{step.description}</p>

                  {step.content.type === "progress" && step.content.items && (
                    <div className="space-y-4">
                      {(step.content.items as ProgressItem[]).map((item, idx) => (
                        <div key={idx}>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium text-white">{item.label}</span>
                            <span className="text-sm font-semibold text-white">{item.percentage}%</span>
                          </div>
                          <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full bg-linear-to-r from-orange-400 to-orange-600"
                              style={{ width: `${item.percentage}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {step.content.type === "checklist" && step.content.items && (
                    <div className="space-y-3 bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                      {(step.content.items as ChecklistItem[]).map((item, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          <div
                            className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 transition-all ${
                              item.completed ? "bg-orange-500 border-orange-500" : "border-white/30"
                            }`}
                          >
                            {item.completed && (
                              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                              </svg>
                            )}
                          </div>
                          <span
                            className={`text-sm ${
                              item.completed ? "text-white opacity-60" : "text-white"
                            }`}
                          >
                            {item.task}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  {step.content.type === "metrics" && step.content.metrics && (
                    <div className="space-y-4">
                      {step.content.metrics.map((metric, idx) => (
                        <div key={idx} className="flex items-center justify-between">
                          <span className="text-sm text-white/70">{metric.label}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold text-white">{metric.value}</span>
                            <span className="text-xs font-semibold px-2 py-1 rounded bg-emerald-500/20 text-emerald-300">
                              {metric.change}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {step.content.type === "tracker" && step.content.progress !== undefined && (
                    <div className="space-y-4">
                      <div className="text-center">
                        <p className="text-4xl font-bold text-white">{step.content.progress}%</p>
                        <p className="text-xs text-white/70 mt-1">Progress Tracker</p>
                      </div>
                      <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full bg-linear-to-r from-orange-400 to-orange-600"
                          style={{ width: `${step.content.progress}%` }}
                        />
                      </div>
                    </div>
                  )}

                  {step.content.type === "animation" && (
                    <div className="w-full">
                      <DefiBeamAnimation
                        className="h-[300px] bg-transparent"
                        duration={6}
                        gradientStartColor="#ED6918"
                        gradientStopColor="#FFA500"
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}