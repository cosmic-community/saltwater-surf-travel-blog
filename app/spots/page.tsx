import type { Metadata } from 'next'
import { getSurfSpots } from '@/lib/cosmic'
import SpotCard from '@/components/SpotCard'

export const metadata: Metadata = {
  title: 'Surf Spots — Saltwater',
  description: 'Explore surf destinations from Bali to Morocco to Hawaii.',
}

export default async function SpotsPage() {
  const spots = await getSurfSpots()

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <div className="mb-12">
        <p className="text-xs font-semibold uppercase tracking-widest text-ocean-500 mb-2">Destinations</p>
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900">Surf Spots</h1>
        <p className="mt-4 text-gray-500 max-w-xl">
          Our curated guide to the best surf breaks on the planet — from mellow beginners&apos; breaks to world-class barrels.
        </p>
      </div>

      {spots.length === 0 ? (
        <p className="text-gray-400 text-center py-20">No spots yet. Check back soon.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {spots.map((spot) => (
            <SpotCard key={spot.id} spot={spot} />
          ))}
        </div>
      )}
    </div>
  )
}