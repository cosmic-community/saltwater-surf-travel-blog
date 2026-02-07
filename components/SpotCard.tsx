import Link from 'next/link'
import type { SurfSpot } from '@/types'
import DifficultyBadge from '@/components/DifficultyBadge'

interface SpotCardProps {
  spot: SurfSpot
}

export default function SpotCard({ spot }: SpotCardProps) {
  const heroImage = spot.metadata?.hero_image
  const difficulty = spot.metadata?.difficulty

  return (
    <Link href={`/spots/${spot.slug}`} className="group block">
      <article>
        {/* Image */}
        <div className="aspect-[4/3] overflow-hidden rounded-xl bg-sand-100 relative">
          {heroImage ? (
            <img
              src={`${heroImage.imgix_url}?w=800&h=600&fit=crop&auto=format,compress`}
              alt={spot.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-4xl">🏄</div>
          )}
          {/* Overlay info */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-5">
            <h3 className="text-lg font-serif font-bold text-white leading-snug">
              {spot.metadata?.name ?? spot.title}
            </h3>
            <p className="text-white/70 text-sm mt-1">📍 {spot.metadata?.location}</p>
          </div>
        </div>

        {/* Meta */}
        <div className="mt-3 flex items-center gap-2">
          {difficulty && <DifficultyBadge difficulty={difficulty} size="sm" />}
        </div>
      </article>
    </Link>
  )
}