// app/posts/[slug]/page.tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import { getPostBySlug, getPosts } from '@/lib/cosmic'
import DifficultyBadge from '@/components/DifficultyBadge'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    return { title: 'Post Not Found — Saltwater' }
  }

  return {
    title: `${post.title} — Saltwater`,
    description: post.metadata?.content?.substring(0, 160).replace(/[#*_\n]/g, '') || 'A surf travel story.',
  }
}

export async function generateStaticParams() {
  const posts = await getPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const author = post.metadata?.author
  const surfSpot = post.metadata?.surf_spot
  const featuredImage = post.metadata?.featured_image
  const difficulty = post.metadata?.difficulty

  return (
    <article>
      {/* Hero */}
      <header className="relative h-[50vh] min-h-[400px] overflow-hidden">
        {featuredImage && (
          <img
            src={`${featuredImage.imgix_url}?w=1800&h=900&fit=crop&auto=format,compress`}
            alt={post.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="relative z-10 flex flex-col justify-end h-full max-w-3xl mx-auto px-6 pb-12">
          <div className="flex items-center gap-3 mb-4">
            {difficulty && <DifficultyBadge difficulty={difficulty} />}
            {surfSpot && (
              <Link
                href={`/spots/${surfSpot.slug}`}
                className="text-xs font-medium text-white/80 hover:text-white transition-colors"
              >
                📍 {surfSpot.metadata?.location ?? surfSpot.title}
              </Link>
            )}
          </div>
          <h1 className="text-3xl md:text-5xl font-serif font-bold text-white leading-tight">
            {post.title}
          </h1>
          {author && (
            <div className="flex items-center gap-3 mt-6">
              {author.metadata?.profile_photo && (
                <img
                  src={`${author.metadata.profile_photo.imgix_url}?w=80&h=80&fit=crop&auto=format,compress`}
                  alt={author.metadata?.name ?? author.title}
                  className="w-10 h-10 rounded-full object-cover border-2 border-white/30"
                />
              )}
              <Link
                href={`/authors/${author.slug}`}
                className="text-white/80 text-sm hover:text-white transition-colors"
              >
                {author.metadata?.name ?? author.title}
              </Link>
            </div>
          )}
        </div>
      </header>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-6 py-16">
        <div className="prose prose-lg prose-gray max-w-none prose-headings:font-serif prose-headings:font-bold prose-a:text-ocean-600 prose-img:rounded-lg">
          <ReactMarkdown>{post.metadata?.content ?? ''}</ReactMarkdown>
        </div>

        {/* Surf Spot Card */}
        {surfSpot && (
          <div className="mt-16 border border-gray-100 rounded-2xl overflow-hidden">
            <div className="flex flex-col sm:flex-row">
              {surfSpot.metadata?.hero_image && (
                <img
                  src={`${surfSpot.metadata.hero_image.imgix_url}?w=600&h=400&fit=crop&auto=format,compress`}
                  alt={surfSpot.title}
                  className="w-full sm:w-48 h-48 sm:h-auto object-cover"
                />
              )}
              <div className="p-6 flex-1">
                <p className="text-xs font-semibold uppercase tracking-widest text-ocean-500 mb-1">Surf Spot</p>
                <h3 className="text-lg font-serif font-bold text-gray-900">{surfSpot.metadata?.name ?? surfSpot.title}</h3>
                <p className="text-sm text-gray-500 mt-1">{surfSpot.metadata?.location}</p>
                {surfSpot.metadata?.difficulty && (
                  <div className="mt-3">
                    <DifficultyBadge difficulty={surfSpot.metadata.difficulty} />
                  </div>
                )}
                <Link
                  href={`/spots/${surfSpot.slug}`}
                  className="mt-4 inline-block text-sm font-medium text-ocean-600 hover:text-ocean-700 transition-colors"
                >
                  View spot guide →
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Back */}
        <div className="mt-12 pt-8 border-t border-gray-100">
          <Link href="/posts" className="text-sm font-medium text-gray-400 hover:text-gray-600 transition-colors">
            ← Back to all stories
          </Link>
        </div>
      </div>
    </article>
  )
}