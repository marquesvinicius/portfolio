import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'
import type { PortableTextBlock } from '@portabletext/types'
import { projectId, dataset, apiVersion } from '@/sanity/env'

// Cliente público para ler dados
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // Usar CDN para melhor performance
})

// Cliente privado para operações com token (se necessário)
export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN, // Token de escrita
})

// Builder para URLs de imagens
const builder = imageUrlBuilder(client)

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

// Tipos TypeScript
export interface SanityProject {
  _id: string
  _type: 'project'
  title: string
  slug: { current: string }
  description: string
  longDescription?: string
  tech: string[]
  category: 'web' | 'mobile' | 'desktop' | 'game' | 'api' | 'podcast' | 'other'
  status: 'completed' | 'in-progress' | 'archived'
  featured: boolean
  thumbnail?: SanityImageSource
  gallery?: SanityImageSource[]
  links?: {
    demo?: string
    repository?: string
    video?: string
    external?: string
  }
  publishedAt: string
  highlights?: string[]
}

export interface SanityPost {
  _id: string
  _type: 'post'
  title: string
  slug: { current: string }
  excerpt?: string
  body: PortableTextBlock[]
  coverImage?: SanityImageSource
  publishedAt: string
  categories?: string[]
  tags?: string[]
  author?: {
    name: string
    image?: SanityImageSource
  }
}

// Queries GROQ
export const projectsQuery = `*[_type == "project"] | order(publishedAt desc) {
  _id,
  title,
  slug,
  description,
  longDescription,
  tech,
  category,
  status,
  featured,
  thumbnail,
  gallery,
  links,
  publishedAt,
  highlights
}`

export const featuredProjectsQuery = `*[_type == "project" && featured == true] | order(publishedAt desc) {
  _id,
  title,
  slug,
  description,
  tech,
  category,
  status,
  featured,
  thumbnail,
  gallery,
  publishedAt
}`

export const projectBySlugQuery = `*[_type == "project" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  description,
  longDescription,
  tech,
  category,
  status,
  featured,
  thumbnail,
  gallery,
  links,
  publishedAt,
  highlights
}`

export const postsQuery = `*[_type == "post"] | order(publishedAt desc) {
  _id,
  title,
  slug,
  excerpt,
  coverImage,
  publishedAt,
  categories,
  tags
}`

export const postBySlugQuery = `*[_type == "post" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  excerpt,
  body,
  coverImage,
  publishedAt,
  categories,
  tags,
  author
}`
