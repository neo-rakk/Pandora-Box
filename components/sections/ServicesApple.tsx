'use client'

import Image from 'next/image'
import { useEffect, useMemo, useState } from 'react'

const BLUR_PLACEHOLDER =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYwMCIgaGVpZ2h0PSIxMjAwIiB2aWV3Qm94PSIwIDAgMTYwMCAxMjAwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxmaWx0ZXIgaWQ9ImIiPjxmZUdhdXNzaWFuQmx1ciBzdGREZXZpYXRpb249IjQwIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjE2MDAiIGhlaWdodD0iMTIwMCIgZmlsbD0iI2Y1ZjVmNSIvPjxjaXJjbGUgY3g9IjExNTAiIGN5PSI0MDAiIHI9IjQyMCIgZmlsbD0iI2U1ZTdlYiIgZmlsdGVyPSJ1cmwoI2IpIi8+PGNpcmNsZSBjeD0iNDIwIiBjeT0iODIwIiByPSIzNjAiIGZpbGw9IiNkMWQ1ZGIiIGZpbHRlcj0idXJsKCNiKSIvPjwvc3ZnPg=='

const FALLBACK_IMAGE = '/placeholder.jpg'

type LegacyService = {
  name?: string
  description?: string
  image?: string
  imageAlt?: string
}

type ServiceUniverse = {
  title: string
  headline?: string
  subtitle?: string
  description: string
  expertise: string[] | string
  cta?: string
  image?: string
  imageAlt?: string
  backgroundVariant?: 'soft' | 'glass' | 'deep'
}

type ServicesContent = {
  title?: string
  subtitle?: string
  universes?: ServiceUniverse[]
  services?: LegacyService[]
}

const fallbackContent: Required<Pick<ServicesContent, 'title' | 'subtitle'>> & { universes: NormalizedServiceUniverse[] } = {
  title: 'Nos Services',
  subtitle: 'Quatre univers complémentaires pour orchestrer votre présence avec précision, créativité et technologie.',
  universes: [
    {
      title: 'Conseil & Stratégie',
      headline: 'Une direction claire avant chaque prise de parole.',
      subtitle: 'Architecture de marque',
      description:
        'Nous cadrons vos enjeux, votre positionnement et vos messages afin de transformer chaque action de communication en levier de confiance.',
      expertise: ['Conseil stratégique', 'Relations publiques', 'Branding', 'Plans média'],
      cta: 'Structurer votre vision',
      image: '/uploads/1783702356824-wp8030358-macbook-4k-wallpapers.jpg',
      imageAlt: 'Espace de stratégie premium avec ordinateur portable',
      backgroundVariant: 'soft',
    },
    {
      title: 'Création de contenu',
      headline: 'Des images, des sons et des récits qui installent une présence.',
      subtitle: 'Production premium',
      description:
        'Notre atelier conçoit des contenus précis et mémorables, pensés pour sublimer une marque sans jamais la surcharger.',
      expertise: ['Production vidéo', 'Photographie', 'Audio', 'Direction créative'],
      cta: 'Imaginer vos contenus',
      image: '/uploads/1783699895703-wp8030358-macbook-4k-wallpapers.jpg',
      imageAlt: 'Production visuelle premium sur écran haute résolution',
      backgroundVariant: 'glass',
    },
    {
      title: 'Digital',
      headline: 'Un écosystème fluide, mesurable et prêt à convertir.',
      subtitle: 'Croissance connectée',
      description:
        'Nous relions stratégie sociale, logiciels métiers et CRM pour créer des parcours cohérents, pilotés par la donnée.',
      expertise: ['Réseaux sociaux', 'Logiciels sur-mesure', 'CRM', 'Tableaux de bord'],
      cta: 'Accélérer votre digital',
      image: '/uploads/1783699937804-wp8030358-macbook-4k-wallpapers.jpg',
      imageAlt: 'Interface digitale élégante sur ordinateur portable',
      backgroundVariant: 'soft',
    },
    {
      title: 'Innovation & Expériences',
      headline: 'Créer des moments qui restent, en physique comme en immersif.',
      subtitle: 'Technologies expérientielles',
      description:
        'Affichage intelligent, IoT, réalité augmentée et activations événementielles donnent à votre marque une dimension vivante.',
      expertise: ['IoT', 'Affichage intelligent', 'Réalité augmentée', 'Événementiel'],
      cta: 'Concevoir une expérience',
      image: '/placeholder.jpg',
      imageAlt: 'Installation immersive contemporaine',
      backgroundVariant: 'deep',
    },
  ],
}

function normalizeExpertise(value: unknown): string[] {
  if (Array.isArray(value)) return value.filter((item): item is string => typeof item === 'string' && item.trim().length > 0)
  if (typeof value === 'string') return value.split(',').map((item) => item.trim()).filter(Boolean)
  return []
}

function buildUniverses(content: ServicesContent | null): NormalizedServiceUniverse[] {
  if (content?.universes?.length) {
    return content.universes.map((universe, index) => ({
      ...fallbackContent.universes[index % fallbackContent.universes.length],
      ...universe,
      expertise: normalizeExpertise(universe.expertise),
    }))
  }

  const legacyServices = content?.services ?? []
  if (!legacyServices.length) return fallbackContent.universes

  return fallbackContent.universes.map((universe, index) => ({
    ...universe,
    expertise: legacyServices.slice(index * 2, index * 2 + 3).map((service) => service.name).filter((name): name is string => Boolean(name)),
    description: legacyServices[index * 2]?.description || universe.description,
  }))
}

type NormalizedServiceUniverse = Omit<ServiceUniverse, 'expertise'> & { expertise: string[] }

function ServiceContent({ universe }: { universe: NormalizedServiceUniverse }) {
  return (
    <div className="relative z-10 max-w-xl">
      {universe.subtitle && (
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground">{universe.subtitle}</p>
      )}
      <h3 className="text-4xl font-semibold leading-[0.98] tracking-[-0.045em] text-foreground md:text-5xl lg:text-6xl">
        {universe.title}
      </h3>
      {universe.headline && <p className="mt-6 text-xl leading-snug text-foreground/85 md:text-2xl">{universe.headline}</p>}
      <p className="mt-5 max-w-lg text-base leading-8 text-muted-foreground md:text-lg">{universe.description}</p>
      <ul className="mt-8 grid gap-3 text-sm font-medium text-foreground/80 sm:grid-cols-2" aria-label={`Expertises ${universe.title}`}>
        {universe.expertise.map((item) => (
          <li key={item} className="flex items-center gap-3">
            <span className="h-px w-6 bg-foreground/25" aria-hidden="true" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
      {universe.cta && (
        <a
          href="#contact"
          className="mt-10 inline-flex rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition duration-300 hover:scale-[1.02] hover:bg-primary/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          {universe.cta}
        </a>
      )}
    </div>
  )
}

function IllustrationContainer({ universe, priority }: { universe: NormalizedServiceUniverse; priority: boolean }) {
  const imageSrc = universe.image || FALLBACK_IMAGE

  return (
    <div className="service-illustration relative z-10 mx-auto aspect-[4/3] w-full max-w-[620px] overflow-hidden rounded-[2.25rem] border border-white/10 bg-background/40 shadow-[0_30px_90px_rgba(0,0,0,0.16)] transition duration-700 group-hover:scale-[1.015] dark:shadow-[0_30px_90px_rgba(255,255,255,0.08)] md:rounded-[3rem]">
      <Image
        src={imageSrc}
        alt={universe.imageAlt || ''}
        fill
        sizes="(max-width: 768px) 92vw, (max-width: 1200px) 46vw, 620px"
        className="object-cover"
        placeholder="blur"
        blurDataURL={BLUR_PLACEHOLDER}
        priority={priority}
        unoptimized={imageSrc.startsWith('data:')}
      />
      <div className="absolute inset-0 bg-gradient-to-tr from-background/25 via-transparent to-white/20" aria-hidden="true" />
    </div>
  )
}

function ServicePanel({ universe, index }: { universe: NormalizedServiceUniverse; index: number }) {
  const reversed = index % 2 === 1
  const variantClass = universe.backgroundVariant === 'deep' ? 'bg-foreground/[0.04] dark:bg-white/[0.06]' : universe.backgroundVariant === 'glass' ? 'bg-card/70 backdrop-blur-xl' : 'bg-card/80'

  return (
    <article className={`service-panel group relative overflow-hidden rounded-[2rem] border border-border/70 ${variantClass} px-6 py-10 shadow-[0_20px_80px_rgba(0,0,0,0.06)] md:rounded-[3rem] md:px-12 md:py-16 lg:px-16`}>
      <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-accent/10 blur-3xl" aria-hidden="true" />
      <div className={`grid items-center gap-12 lg:grid-cols-2 lg:gap-16 ${reversed ? 'lg:[&>*:first-child]:order-2' : ''}`}>
        <ServiceContent universe={universe} />
        <IllustrationContainer universe={universe} priority={index === 0} />
      </div>
    </article>
  )
}

export default function ServicesApple() {
  const [content, setContent] = useState<ServicesContent | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true

    async function fetchContent() {
      try {
        const res = await fetch('/api/data?section=services')
        const data = (await res.json()) as { services?: ServicesContent }
        if (mounted) setContent(data.services || fallbackContent)
      } catch (error) {
        console.error('Failed to fetch services content:', error)
        if (mounted) setContent(fallbackContent)
      } finally {
        if (mounted) setLoading(false)
      }
    }

    fetchContent()
    return () => {
      mounted = false
    }
  }, [])

  const universes = useMemo(() => buildUniverses(content), [content])

  if (loading) return <section id="services" className="h-96 bg-background" aria-label="Chargement des services" />

  return (
    <section id="services" className="relative overflow-hidden bg-background px-4 py-28 sm:px-6 md:py-36">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-80 bg-gradient-to-b from-card/50 to-transparent" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl">
        <div className="mx-auto mb-20 max-w-4xl text-center md:mb-28">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.32em] text-muted-foreground">Une constellation d’expertises</p>
          <h2 className="text-5xl font-semibold leading-none tracking-[-0.055em] text-foreground md:text-7xl lg:text-8xl">
            {content?.title || fallbackContent.title}
          </h2>
          <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-muted-foreground md:text-xl">
            {content?.subtitle || fallbackContent.subtitle}
          </p>
        </div>

        <div className="space-y-8 md:space-y-12">
          {universes.map((universe, index) => (
            <ServicePanel key={`${universe.title}-${index}`} universe={universe} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
