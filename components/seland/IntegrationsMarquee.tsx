"use client"

import { Marquee } from "@/components/ui/marquee"

const integrations = [
    {
        icon: '/images/partners/espresso.png',
        name: 'Espresso Network',
        description: 'Cross-chain composability confirmation layer',
    },
    {
        icon: '/images/partners/based.webp',
        name: 'Base',
        description: 'Open onchain platform built by Coinbase',
    },
    {
        icon: '/images/partners/hyperlane.png',
        name: 'Hyperlane',
        description: 'Cross-chain composability network',
    },
    {
        icon: '/images/partners/privy.jpg',
        name: 'Privy',
        description: 'Secure wallet and private key management',
    },
    {
        icon: '/images/partners/ponder.png',
        name: 'Ponder',
        description: 'Fast, reliable crypto backend software',
    },
    {
        icon: '/images/partners/tradingview.png',
        name: 'TradingView',
        description: 'Powerful charting and trading tools',
    },
]

export function IntegrationsMarquee() {
    return (
        <div className="py-20 bg-[#1e1c1c] relative z-10">
            <Marquee pauseOnHover className="[--duration:60s]">
                {integrations.map((integration, index) => (
                    <div
                        key={index}
                        className="mx-4 rounded-2xl border border-white/10 p-6 backdrop-blur-sm transition-all hover:scale-105 w-96 shrink-0 bg-linear-to-br from-white/5 via-white/5 to-orange-500/10 hover:border-white/20"
                    >
                        <div className="flex items-start gap-4">
                            <div className="w-8 h-8">
                                <img 
                                    src={integration.icon} 
                                    alt={integration.name}
                                    className="w-full h-full object-contain"
                                />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-xl font-semibold text-white mb-2">
                                    {integration.name}
                                </h3>
                                <p className="text-gray-400 text-sm leading-relaxed">
                                    {integration.description}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </Marquee>
        </div>
    )
}