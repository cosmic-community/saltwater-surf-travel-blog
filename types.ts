// Base Cosmic object
export interface CosmicObject {
  id: string
  slug: string
  title: string
  content?: string
  metadata: Record<string, unknown>
  type: string
  created_at: string
  modified_at: string
}

// Difficulty select-dropdown
export interface DifficultyOption {
  key: 'beginner' | 'intermediate' | 'advanced'
  value: 'Beginner' | 'Intermediate' | 'Advanced'
}

export type DifficultyKey = 'beginner' | 'intermediate' | 'advanced'

// File metafield
export interface CosmicFile {
  url: string
  imgix_url: string
}

// Author
export interface Author extends CosmicObject {
  type: 'authors'
  metadata: {
    name: string
    bio?: string
    profile_photo?: CosmicFile
  }
}

// Surf Spot
export interface SurfSpot extends CosmicObject {
  type: 'surf-spots'
  metadata: {
    name: string
    location: string
    difficulty: DifficultyOption
    description?: string
    hero_image?: CosmicFile
  }
}

// Post
export interface Post extends CosmicObject {
  type: 'posts'
  metadata: {
    content: string
    featured_image?: CosmicFile
    difficulty?: DifficultyOption
    author?: Author
    surf_spot?: SurfSpot
  }
}

// API Response
export interface CosmicResponse<T> {
  objects: T[]
  total: number
}

// Error helper
export function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error
}