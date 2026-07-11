import { NextRequest, NextResponse } from 'next/server'
import { verifyAdminToken } from '@/lib/admin-auth'
import { readContentData, writeContentData } from '@/lib/content-store'

const DEFAULT_DATA: Record<string, unknown> = {
  hero: {
    title: 'Transform Your Brand',
    subtitle: 'Experience 360° integrated communication strategies that drive results',
    cta: 'Get Started',
    ctaSecondary: 'Our Services',
    bgType: 'none',
    backgroundImage: 'https://images.unsplash.com/photo-1542744094-3a31f103e35f?q=80&w=1600',
    backgroundImages: [
      { url: 'https://images.unsplash.com/photo-1542744094-3a31f103e35f?q=80&w=1600' },
      { url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1600' },
      { url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1600' }
    ]
  },
  about: {
    title: 'Who We Are',
    description: 'We are a premium integrated communications agency specializing in 360° brand strategies for enterprise clients.',
    mission: 'Our mission is to transform brands through strategic, data-driven communication.',
    values: ['Excellence', 'Innovation', 'Integrity', 'Impact']
  },
  services: {
    title: 'Nos Services',
    subtitle: 'Quatre univers complémentaires pour orchestrer votre présence avec précision, créativité et technologie.',
    services: [
      { name: 'Conseil Stratégique & PR', description: 'Architecture de communication pour maximiser vos performances commerciales. Analyse, stratégie et relations publiques haut de gamme.' },
      { name: 'L’Atelier de l’Image', description: 'Vidéo de production, photo et audio premium. Contenus qui captivent conçus par notre collectif de professionnels passionnés.' },
      { name: 'Événementiel & Activation', description: 'Du séminaire B2B au festival grand public. Transformons vos objectifs en expériences immersives et marquantes.' },
      { name: 'Régie Publicitaire', description: 'Plans média redoutablement efficaces. Affichage Outdoor et Indoor avec obsession du ROI et visibilité de masse.' },
      { name: 'Branding & Identité', description: 'Création d’univers visuels forts et mémorables. Plateforme de marque complète et déclinaisons d’identité premium.' },
      { name: 'Numérique et réseaux sociaux', description: 'Visibilité, engagement et conversion. Écosystèmes digitaux qui génèrent leads et communautés engagées.' },
      { name: 'Marketing IoT & Connecté', description: 'Affichage dynamique intelligent et capteurs d’audience. Communication de demain qui interagit et s’adapte en temps réel.' },
      { name: 'Logiciels sur-mesure & CRM', description: 'Tableaux de bord, KPI, applications Web/Mobile, etc. automatisation. Outils internes à la hauteur de vos ambitions.' },
      { name: 'Expériences Immersives', description: 'Réalité augmentée, visites virtuelles et bornes interactives. Créez le Wow Effect avec technologies immersives.' }
    ],
    universes: [
      { title: 'Conseil & Stratégie', subtitle: 'Architecture de marque', headline: 'Une direction claire avant chaque prise de parole.', description: 'Nous cadrons vos enjeux, votre positionnement et vos messages afin de transformer chaque action de communication en levier de confiance.', expertise: 'Conseil stratégique, Relations publiques, Branding, Plans média', cta: 'Structurer votre vision', image: '/uploads/1783702356824-wp8030358-macbook-4k-wallpapers.jpg', imageAlt: 'Espace de stratégie premium avec ordinateur portable', backgroundVariant: 'soft' },
      { title: 'Création de contenu', subtitle: 'Production premium', headline: 'Des images, des sons et des récits qui installent une présence.', description: 'Notre atelier conçoit des contenus précis et mémorables, pensés pour sublimer une marque sans jamais la surcharger.', expertise: 'Production vidéo, Photographie, Audio, Direction créative', cta: 'Imaginer vos contenus', image: '/uploads/1783699895703-wp8030358-macbook-4k-wallpapers.jpg', imageAlt: 'Production visuelle premium sur écran haute résolution', backgroundVariant: 'glass' },
      { title: 'Digital', subtitle: 'Croissance connectée', headline: 'Un écosystème fluide, mesurable et prêt à convertir.', description: 'Nous relions stratégie sociale, logiciels métiers et CRM pour créer des parcours cohérents, pilotés par la donnée.', expertise: 'Réseaux sociaux, Logiciels sur-mesure, CRM, Tableaux de bord', cta: 'Accélérer votre digital', image: '/uploads/1783699937804-wp8030358-macbook-4k-wallpapers.jpg', imageAlt: 'Interface digitale élégante sur ordinateur portable', backgroundVariant: 'soft' },
      { title: 'Innovation & Expériences', subtitle: 'Technologies expérientielles', headline: 'Créer des moments qui restent, en physique comme en immersif.', description: 'Affichage intelligent, IoT, réalité augmentée et activations événementielles donnent à votre marque une dimension vivante.', expertise: 'IoT, Affichage intelligent, Réalité augmentée, Événementiel', cta: 'Concevoir une expérience', image: '/placeholder.jpg', imageAlt: 'Installation immersive contemporaine', backgroundVariant: 'deep' }
    ]
  },
  innovation: {
    title: 'Tech Innovation',
    subtitle: 'Cutting-edge tools and methodologies',
    features: ['AI-powered analytics', 'Real-time campaign monitoring', 'Automated reporting', 'Predictive modeling']
  },
  approach: {
    title: 'Our Approach',
    subtitle: 'Strategic methodology for success',
    steps: [
      { number: '1', title: 'Discovery', description: 'Deep analysis of your market and audience' },
      { number: '2', title: 'Strategy', description: 'Development of comprehensive communication plan' },
      { number: '3', title: 'Execution', description: 'Professional implementation across channels' },
      { number: '4', title: 'Optimization', description: 'Continuous monitoring and refinement' }
    ]
  },
  contact: {
    title: 'Get In Touch',
    subtitle: "Let's discuss your next project",
    email: 'hello@pandorabox.com',
    phone: '+1 (555) 123-4567'
  },
  features: {
    title: 'Why Pandora Box',
    subtitle: 'What makes us different and why forward-thinking brands choose us.',
    features: [
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
  },
  settings: {
    pageTitle: "PANDORA BOX - 360° Communication Agency",
    pageDescription: "Premium integrated marketing communications for enterprise brands",
    logoText: "Pandora Box",
    favicon: "📦",
    primaryColor: "#0071e3",
    backgroundColor: "#ffffff",
    textColor: "#000000",
    cardColor: "#f5f5f5"
  }
}

async function getData() {
  return readContentData(DEFAULT_DATA)
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const section = searchParams.get('section')

    const data = await getData()

    if (section && section in data) {
      return NextResponse.json({ [section]: data[section] })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error reading data:', error)
    return NextResponse.json(DEFAULT_DATA, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    // Verify admin authentication
    const authHeader = request.headers.get('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const token = authHeader.substring(7)
    if (!verifyAdminToken(token)) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
    }

    const body = await request.json()
    const data = await getData()

    // Update the data
    const updatedData = { ...data, ...body }

    const result = await writeContentData(updatedData)

    return NextResponse.json({ success: true, storage: result.storage, data: updatedData })
  } catch (error) {
    console.error('Error saving data:', error)
    return NextResponse.json({ error: 'Failed to save data' }, { status: 500 })
  }
}
