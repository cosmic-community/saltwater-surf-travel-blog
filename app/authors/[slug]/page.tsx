// app/authors/[slug]/page.tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getAuthorBySlug, getAuthors, getPostsByAuthor } from '@/lib/cosmic'
import PostCard from '@/components/PostCard'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const author = await getAuthorBySlug(slug)

  if (!author) {
    return { title: 'Author Not Found — Saltwater' }
  }

  return {
    title: `${author.metadata?.name ?? author.title} — Saltwater`,
    description: author.metadata?.bio?.substring(0, 160) || 'A surf travel writer.',
  }
}

export async function generateStaticParams() {
  const authors = await getAuthors()
  return authors.map((author) => ({ slug: author.slug }))
}

export default async function AuthorPage({ params }: PageProps) {
  const { slug } = await params
  const author = await getAuthorBySlug(slug)

  if (!author) {
    notFound()
  }

  const posts = await getPostsByAuthor(author.id)
  const profilePhoto = author.metadata?.profile_photo

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      {/* Author Header */}
      <div className="flex flex-col sm:flex-row items-start gap-8 mb-16">
        {profilePhoto && (
          <img
            src={`${profilePhoto.imgix_url}?w=300&h=300&fit=crop&auto=format,compress`}
            alt={author.metadata?.name ?? author.title}
            className="w-28 h-28 rounded-full object-cover border-4 border-sand-100"
          />
        )}
        <div className="flex-1">
          <p className="text-xs font-semibold uppercase tracking-widest text-ocean-500 mb-2">Author</p>
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-900">
            {author.metadata?.name ?? author.title}
          </h1>
          {author.metadata?.bio && (
            <p className="mt-4 text-gray-500 leading-relaxed max-w-xl">{author.metadata.bio}</p>
          )}
        </div>
      </div>

      {/* Posts */}
      {posts.length > 0 ? (
        <section>
          <h2 className="text-2xl font-serif font-bold text-gray-900 mb-8">
            Stories by {author.metadata?.name ?? author.title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </section>
      ) : (
        <p className="text-gray-400 text-center py-12">No stories by this author yet.</p>
      )}

      {/* Back */}
      <div className="mt-12 pt-8 border-t border-gray-100">
        <Link href="/posts" className="text-sm font-medium text-gray-400 hover:text-gray-600 transition-colors">
          ← Back to all stories
        </Link>
      </div>
    </div>
  )
}