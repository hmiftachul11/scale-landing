interface SectionLayoutProps {
  label?: string
  currentStep?: number
  totalSteps?: number
  title?: string
  description: string
  backgroundImage?: string
}

export default function SectionLayout({
  label,
  currentStep = 1,
  totalSteps = 3,
  title,
  description,
  backgroundImage,
}: SectionLayoutProps) {
  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Background image overlay */}
      {backgroundImage && (
        <div
          className="absolute inset-0 opacity-40 bg-cover bg-center"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
      )}

      {/* Content wrapper */}
      <div className="absolute top-1/5 z-10">
        {/* Header */}
        <div className="px-8 py-6 mx-10 mb-4">
          <div className="flex items-center gap-2 bg-white/20 w-fit px-3 py-2 rounded-lg">
            <div className="w-5 h-5 bg-orange-600 rounded-lg" />
            <span className="text-sm font-semibold text-white tracking-widest uppercase">{label}</span>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-white/20" />

        {/* Main content */}
        <div className="flex items-start mt-8 mx-10">
          {/* Left side - 1/3 width */}
          <div className="w-1/3 flex items-start px-8">
            <div className="border border-white/20 rounded-full px-6 py-3 bg-white/5 backdrop-blur-sm">
              <span className="text-white text-sm font-light tracking-widest">
                {String(currentStep).padStart(2, "0")} / {String(totalSteps).padStart(2, "0")}
              </span>
            </div>
          </div>

          {/* Right side - 2/3 width */}
          <div className="w-2/3 px-8 pr-16">
            {title && <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">{title}</h2>}
            <p className="text-xl md:text-2xl text-white leading-relaxed font-light text-balance">{description}</p>
          </div>
        </div>
      </div>
    </section>
  )
}