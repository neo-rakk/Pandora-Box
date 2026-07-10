export default function HeroApple() {
  return (
    <section className="pt-32 pb-20 px-6 bg-background">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight mb-6 leading-tight">
          Redefine Your Brand&rsquo;s Story
        </h1>
        
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed font-light">
          360° integrated communications strategy that transforms how your audience perceives, engages, and trusts your brand.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button 
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-3 bg-accent text-accent-foreground hover:bg-accent/90 transition-colors rounded-full font-medium text-sm"
          >
            Start Project
          </button>
          <button 
            onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-3 bg-transparent border border-foreground/20 text-foreground hover:border-foreground/50 transition-colors rounded-full font-medium text-sm"
          >
            Our Services
          </button>
        </div>
      </div>
    </section>
  )
}
