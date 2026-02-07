// app/spots/[slug]/page.tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import { getSurfSpotBySlug, getSurfSpots, getPostsBySurfSpot } from '@/lib/cosmic'
import DifficultyBadge from '@/components/DifficultyBadge'
import PostCard from '@/components/PostCard'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const spot = await getSurfSpotBySlug(slug)

  if (!spot) {
    return { title: 'Spot Not Found — Saltwater' }
  }

  return {
    title: `${spot.metadata?.name ?? spot.title} — Saltwater`,
    description: spot.metadata?.description?.substring(0, 160).replace(/[#*_\n]/g, '') || 'A surf destination guide.',
  }
}

export async function generateStaticParams() {
  const spots = await getSurfSpots()
  return spots.map((spot) => ({ slug: spot.slug }))
}

export default async function SpotPage({ params }: PageProps) {
  const { slug } = await params
  const spot = await getSurfSpotBySlug(slug)

  if (!spot) {
    notFound()
  }

  const relatedPosts = await getPostsBySurfSpot(spot.id)
  const heroImage = spot.metadata?.hero_image
  const difficulty = spot.metadata?.difficulty

  return (
    <div>
      {/* Hero */}
      <header className="relative h-[50vh] min-h-[400px] overflow-hidden">
        {heroImage && (
          <img
            src={`${heroImage.imgix_url}?w=1800&h=900&fit=crop&auto=format,compress`}
            alt={spot.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="relative z-10 flex flex-col justify-end h-full max-w-3xl mx-auto px-6 pb-12">
          <div className="flex items-center gap-3 mb-4">
            {difficulty && <DifficultyBadge difficulty={difficulty} />}
          </div>
          <h1 className="text-3xl md:text-5xl font-serif font-bold text-white leading-tight">
            {spot.metadata?.name ?? spot.title}
          </h1>
          <p className="text-white/70 mt-3 text-base">📍 {spot.metadata?.location}</p>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-6 py-16">
        {spot.metadata?.description && (
          <div className="prose prose-lg prose-gray max-w-none prose-headings:font-serif prose-headings:font-bold prose-a:text-ocean-600">
            <ReactMarkdown>{spot.metadata.description}</ReactMarkdown>
          </div>
        )}

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="mt-16">
            <h2 className="text-2xl font-serif font-bold text-gray-900 mb-8">
              Stories from {spot.metadata?.name ?? spot.title}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {relatedPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          </section>
        )}

        {/* Back */}
        <div className="mt-12 pt-8 border-t border-gray-100">
          <Link href="/spots" className="text-sm font-medium text-gray-400 hover:text-gray-600 transition-colors">
            ← Back to all spots
          </Link>
        </div>
      </div>
    </div>
  )
}