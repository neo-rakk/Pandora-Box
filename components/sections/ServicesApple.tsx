export default function ServicesApple() {
  const services = [
    {
      number: "01",
      title: "Conseil Stratégique & PR",
      description: "Architecture de communication pour maximiser vos performances commerciales. Analyse, stratégie et relations publiques haut de gamme.",
      icon: "♟"
    },
    {
      number: "02", 
      title: "L'Atelier de l'Image",
      description: "Production vidéo, photo et audio premium. Contenus qui captivent conçus par notre collectif de professionnels passionnés.",
      icon: "🎬"
    },
    {
      number: "03",
      title: "Événementiel & Activation",
      description: "Du séminaire B2B au festival grand public. Transformons vos objectifs en expériences immersives et marquantes.",
      icon: "✨"
    },
    {
      number: "04",
      title: "Régie Publicitaire",
      description: "Plans média redoutablement efficaces. Affichage Outdoor et Indoor avec obsession du ROI et visibilité de masse.",
      icon: "📢"
    },
    {
      number: "05",
      title: "Branding & Identité",
      description: "Création d'univers visuels forts et mémorables. Plateforme de marque complète et déclinaisons d'identité premium.",
      icon: "🎨"
    },
    {
      number: "06",
      title: "Digital & Social Media",
      description: "Visibilité, engagement et conversion. Écosystèmes digitaux qui génèrent leads et communautés engagées.",
      icon: "#"
    },
    {
      number: "07",
      title: "Marketing IoT & Connecté",
      description: "Affichage dynamique intelligent et capteurs d'audience. Communication de demain qui interagit et s'adapte en temps réel.",
      icon: "📡"
    },
    {
      number: "08",
      title: "Logiciels sur-mesure & CRM",
      description: "Dashboards KPI, applications Web/Mobile et automatisation. Outils internes à la hauteur de vos ambitions.",
      icon: "💻"
    },
    {
      number: "09",
      title: "Expériences Immersives",
      description: "Réalité augmentée, visites virtuelles et bornes interactives. Créez le Wow Effect avec technologies immersives.",
      icon: "🥽"
    }
  ]

  return (
    <section id="services" className="py-32 px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="mb-24 text-center">
          <h2 className="text-5xl md:text-6xl font-semibold mb-6 text-foreground">Our Services</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">Comprehensive 360° communication solutions designed for forward-thinking brands.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, idx) => (
            <div key={idx} className="group">
              <div className="mb-6">
                <div className="text-4xl mb-4">{service.icon}</div>
                <div className="text-xs text-muted-foreground font-semibold mb-2">{service.number}</div>
                <h3 className="text-lg font-semibold text-foreground group-hover:text-accent transition-colors">{service.title}</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
