import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

const postsDir = path.join(process.cwd(), 'content/blog')

export type PostMeta = {
  slug: string
  title: string
  description: string
  date: string
  category: string
  readTime: string
  audience: string
}

export function getAllPostSlugs(): string[] {
  if (!fs.existsSync(postsDir)) return []
  return fs.readdirSync(postsDir).filter(f => f.endsWith('.md')).map(f => f.replace(/\.md$/, ''))
}

export function getAllPosts(): PostMeta[] {
  return getAllPostSlugs().map(slug => {
    const raw = fs.readFileSync(path.join(postsDir, `${slug}.md`), 'utf8')
    const { data } = matter(raw)
    return { slug, ...(data as Omit<PostMeta, 'slug'>) }
  }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export async function getPost(slug: string): Promise<{ meta: PostMeta; content: string } | null> {
  const filePath = path.join(postsDir, `${slug}.md`)
  if (!fs.existsSync(filePath)) return null
  const raw = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(raw)
  const processed = await remark().use(html).process(content)
  return { meta: { slug, ...(data as Omit<PostMeta, 'slug'>) }, content: processed.toString() }
}
