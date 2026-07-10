export default function FeaturesApple() {
  const features = [
    {
      title: "360° Integrated Strategy",
      description: "Unified approach across all communication channels for consistent brand messaging and maximum impact."
    },
    {
      title: "Data-Driven Optimization",
      description: "Real-time analytics and insights drive every decision. We measure, analyze, and continuously improve."
    },
    {
      title: "Creative Excellence",
      description: "Award-winning creative team that brings bold ideas to life with premium production quality."
    },
    {
      title: "Technology Forward",
      description: "IoT, AR/VR, and AI-powered solutions that put your brand at the forefront of innovation."
    },
    {
      title: "Enterprise Focus",
      description: "Specialized expertise in serving enterprise clients with complex, multi-channel requirements."
    },
    {
      title: "ROI Obsessed",
      description: "Every campaign tracked, optimized for results. Your success metrics are our key performance indicators."
    }
  ]

  return (
    <section id="features" className="py-32 px-6 bg-secondary">
      <div className="max-w-6xl mx-auto">
        <div className="mb-24 text-center">
          <h2 className="text-5xl md:text-6xl font-semibold mb-6 text-foreground">Why Pandora Box</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">What makes us different and why forward-thinking brands choose us.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          {features.map((feature, idx) => (
            <div key={idx} className="group">
              <div className="w-12 h-12 rounded-full bg-accent/10 group-hover:bg-accent/20 transition-colors mb-6"></div>
              <h3 className="text-lg font-semibold text-foreground mb-3">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
