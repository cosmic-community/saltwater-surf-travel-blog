import Link from 'next/link'
import { getPosts, getSurfSpots } from '@/lib/cosmic'
import PostCard from '@/components/PostCard'
import SpotCard from '@/components/SpotCard'

export default async function HomePage() {
  const [posts, spots] = await Promise.all([getPosts(), getSurfSpots()])

  const featuredPost = posts[0]

  return (
    <div>
      {/* Hero */}
      {featuredPost && (
        <section className="relative h-[70vh] min-h-[500px] overflow-hidden">
          {featuredPost.metadata?.featured_image && (
            <img
              src={`${featuredPost.metadata.featured_image.imgix_url}?w=1800&h=1000&fit=crop&auto=format,compress`}
              alt={featuredPost.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          <div className="relative z-10 flex flex-col justify-end h-full max-w-5xl mx-auto px-6 pb-16">
            {featuredPost.metadata?.difficulty && (
              <span className="inline-block text-xs font-semibold uppercase tracking-widest text-ocean-300 mb-3">
                {featuredPost.metadata.difficulty.value}
              </span>
            )}
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-white leading-tight max-w-3xl">
              {featuredPost.title}
            </h1>
            {featuredPost.metadata?.author && (
              <p className="text-white/70 mt-4 text-base">
                By {featuredPost.metadata.author.metadata?.name ?? featuredPost.metadata.author.title}
                {featuredPost.metadata?.surf_spot && (
                  <> · {featuredPost.metadata.surf_spot.metadata?.location ?? featuredPost.metadata.surf_spot.title}</>
                )}
              </p>
            )}
            <Link
              href={`/posts/${featuredPost.slug}`}
              className="mt-6 inline-flex items-center gap-2 text-white font-medium border border-white/40 rounded-full px-6 py-3 hover:bg-white hover:text-gray-900 transition-colors w-fit text-sm"
            >
              Read Story
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </section>
      )}

      {/* Latest Posts */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-ocean-500 mb-2">Journal</p>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900">Latest Stories</h2>
          </div>
          <Link href="/posts" className="text-sm font-medium text-ocean-600 hover:text-ocean-700 transition-colors hidden sm:block">
            View all →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
        <div className="mt-8 sm:hidden">
          <Link href="/posts" className="text-sm font-medium text-ocean-600 hover:text-ocean-700">
            View all stories →
          </Link>
        </div>
      </section>

      {/* Surf Spots */}
      <section className="bg-sand-50 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-ocean-500 mb-2">Destinations</p>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900">Surf Spots</h2>
            </div>
            <Link href="/spots" className="text-sm font-medium text-ocean-600 hover:text-ocean-700 transition-colors hidden sm:block">
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {spots.map((spot) => (
              <SpotCard key={spot.id} spot={spot} />
            ))}
          </div>
          <div className="mt-8 sm:hidden">
            <Link href="/spots" className="text-sm font-medium text-ocean-600 hover:text-ocean-700">
              View all spots →
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}