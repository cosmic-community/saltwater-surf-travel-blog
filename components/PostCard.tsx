import Link from 'next/link'
import type { Post } from '@/types'
import DifficultyBadge from '@/components/DifficultyBadge'

interface PostCardProps {
  post: Post
}

export default function PostCard({ post }: PostCardProps) {
  const featuredImage = post.metadata?.featured_image
  const author = post.metadata?.author
  const difficulty = post.metadata?.difficulty
  const surfSpot = post.metadata?.surf_spot

  return (
    <Link href={`/posts/${post.slug}`} className="group block">
      <article>
        {/* Image */}
        <div className="aspect-[4/3] overflow-hidden rounded-xl bg-sand-100">
          {featuredImage ? (
            <img
              src={`${featuredImage.imgix_url}?w=800&h=600&fit=crop&auto=format,compress`}
              alt={post.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-4xl">🌊</div>
          )}
        </div>

        {/* Meta */}
        <div className="mt-4">
          <div className="flex items-center gap-2 mb-2">
            {difficulty && <DifficultyBadge difficulty={difficulty} size="sm" />}
            {surfSpot && (
              <span className="text-xs text-gray-400">
                📍 {surfSpot.metadata?.location ?? surfSpot.title}
              </span>
            )}
          </div>

          <h3 className="text-lg font-serif font-bold text-gray-900 group-hover:text-ocean-600 transition-colors leading-snug">
            {post.title}
          </h3>

          {author && (
            <p className="mt-2 text-sm text-gray-400">
              By {author.metadata?.name ?? author.title}
            </p>
          )}
        </div>
      </article>
    </Link>
  )
}