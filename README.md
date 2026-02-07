# Saltwater — Surf Travel Blog

![Saltwater Surf Travel Blog](https://imgix.cosmicjs.com/7a06d8e0-0406-11f1-ac33-41545c854ef6-photo-1507525428034-b723cf961d3e-1770456128552.jpg?w=1200&h=300&fit=crop&auto=format,compress)

A modern, minimal surf travel blog powered by [Cosmic](https://www.cosmicjs.com) and built with Next.js 16. Browse surf destinations, read travel stories, and discover new breaks — all content managed through Cosmic's headless CMS.

## Features

- 🏄 **Surf Spot Directory** — Browse destinations with difficulty filtering
- 📝 **Rich Blog Posts** — Markdown content with full prose styling
- ✍️ **Author Profiles** — Dedicated pages for each contributor
- 🎯 **Difficulty Badges** — Colour-coded Beginner / Intermediate / Advanced tags
- 📱 **Responsive Design** — Mobile-first with a slide-out hamburger menu
- 🔍 **SEO Optimised** — Dynamic metadata for every page
- ⚡ **Server Components** — Lightning-fast rendering with Next.js 16 App Router

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](http://localhost:3040/projects/new?clone_bucket=698703cc34b144850dfe801d&clone_repository=6987059634b144850dfe8043)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create a complete content model for: A surf travel blog

> Use the install_content_model action to create ALL object types AND demo content in one step. Include:
> 1. All necessary object types with appropriate metafields
> 2. 2-3 demo objects for each type with realistic content
> 3. Unsplash image URLs for thumbnails and file metafields (use real URLs like https://images.unsplash.com/photo-...)

> Remember to create types that are referenced by others FIRST (e.g., categories and authors before blog posts)."

### Code Generation Prompt

> "Next.js modern, minimal, responsive, mobile nav"

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies

- [Next.js 16](https://nextjs.org/) — React framework with App Router
- [Cosmic](https://www.cosmicjs.com) — Headless CMS ([docs](https://www.cosmicjs.com/docs))
- [Tailwind CSS](https://tailwindcss.com/) — Utility-first CSS framework
- [TypeScript](https://www.typescriptlang.org/) — Strict type safety
- [react-markdown](https://github.com/remarkjs/react-markdown) — Markdown rendering

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) runtime installed
- A Cosmic account with the surf travel blog content model

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd saltwater-surf-blog

# Install dependencies
bun install

# Set up environment variables
# Add COSMIC_BUCKET_SLUG, COSMIC_READ_KEY, COSMIC_WRITE_KEY to your environment

# Run the development server
bun dev
```

Open [http://localhost:3000](http://localhost:3000) to see the blog.

## Cosmic SDK Examples

### Fetching Posts with Related Objects

```typescript
import { cosmic } from '@/lib/cosmic'

const { objects: posts } = await cosmic.objects
  .find({ type: 'posts' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

### Fetching a Single Surf Spot

```typescript
const { object: spot } = await cosmic.objects
  .findOne({ type: 'surf-spots', slug: 'uluwatu-bali' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

## Cosmic CMS Integration

This application uses three content types:

| Type | Slug | Purpose |
|------|------|---------|
| 📝 Posts | `posts` | Blog articles with markdown content |
| 🏄 Surf Spots | `surf-spots` | Destination profiles with difficulty ratings |
| ✍️ Authors | `authors` | Writer profiles with bios and photos |

Posts reference both an Author and a Surf Spot via object metafields, resolved with `depth: 1`.

## Deployment Options

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the repository in [Vercel](https://vercel.com)
3. Add environment variables: `COSMIC_BUCKET_SLUG`, `COSMIC_READ_KEY`, `COSMIC_WRITE_KEY`
4. Deploy

### Netlify

1. Push your code to GitHub
2. Import in [Netlify](https://netlify.com)
3. Set build command: `bun run build`
4. Set publish directory: `.next`
5. Add environment variables
6. Deploy

<!-- README_END -->