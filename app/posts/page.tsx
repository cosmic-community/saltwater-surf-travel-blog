import type { Metadata } from 'next'
import { getPosts } from '@/lib/cosmic'
import PostCard from '@/components/PostCard'

export const metadata: Metadata = {
  title: 'Stories — Saltwater',
  description: 'Surf travel stories and guides from around the world.',
}

export default async function PostsPage() {
  const posts = await getPosts()

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <div className="mb-12">
        <p className="text-xs font-semibold uppercase tracking-widest text-ocean-500 mb-2">Journal</p>
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900">All Stories</h1>
        <p className="mt-4 text-gray-500 max-w-xl">
          Dispatches from the world&apos;s best surf destinations — written by those who paddle out.
        </p>
      </div>

      {posts.length === 0 ? (
        <p className="text-gray-400 text-center py-20">No stories yet. Check back soon.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  )
}