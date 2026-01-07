/**
 * Agent Publishing Utilities
 *
 * Provides functions for the AI agent to create and publish blog posts.
 * Posts are created as MDX files with frontmatter.
 */

import * as fs from 'fs/promises'
import * as path from 'path'

export interface PostConfig {
    title: string
    date?: string
    tags: string[]
    summary: string
    content: string
    draft?: boolean
    images?: string[]
    authors?: string[]
    canonicalUrl?: string
}

export interface PublishResult {
    success: boolean
    filePath: string
    slug: string
    error?: string
}

/**
 * Generate a URL-safe slug from a title
 */
export function generateSlug(title: string): string {
    return title
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '') // Remove special characters
        .replace(/\s+/g, '-') // Replace spaces with hyphens
        .replace(/-+/g, '-') // Replace multiple hyphens with single
        .replace(/^-|-$/g, '') // Remove leading/trailing hyphens
}

/**
 * Format a date as YYYY-MM-DD
 */
function formatDate(date: Date = new Date()): string {
    return date.toISOString().split('T')[0]
}

/**
 * Generate MDX frontmatter
 */
function generateFrontmatter(config: PostConfig): string {
    const {
        title,
        date = formatDate(),
        tags,
        summary,
        draft = false,
        images = [],
        authors = ['default'],
        canonicalUrl,
    } = config

    const lines = [
        '---',
        `title: '${title.replace(/'/g, "''")}'`,
        `date: '${date}'`,
        `tags: [${tags.map((t) => `'${t}'`).join(', ')}]`,
        `draft: ${draft}`,
        `summary: '${summary.replace(/'/g, "''")}'`,
    ]

    if (images.length > 0) {
        lines.push(`images: [${images.map((i) => `'${i}'`).join(', ')}]`)
    }

    lines.push(`authors: [${authors.map((a) => `'${a}'`).join(', ')}]`)

    if (canonicalUrl) {
        lines.push(`canonicalUrl: '${canonicalUrl}'`)
    }

    lines.push('---')

    return lines.join('\n')
}

/**
 * Create a new blog post MDX file
 *
 * @param config - Post configuration
 * @param blogDir - Directory to save posts (default: data/blog)
 * @returns PublishResult with file path and slug
 */
export async function createPost(
    config: PostConfig,
    blogDir: string = path.join(process.cwd(), 'data', 'blog')
): Promise<PublishResult> {
    const slug = generateSlug(config.title)
    const fileName = `${slug}.mdx`
    const filePath = path.join(blogDir, fileName)

    try {
        // Check if file already exists
        try {
            await fs.access(filePath)
            return {
                success: false,
                filePath,
                slug,
                error: `Post already exists: ${fileName}`,
            }
        } catch {
            // File doesn't exist, continue
        }

        // Generate the full MDX content
        const frontmatter = generateFrontmatter(config)
        const mdxContent = `${frontmatter}\n\n${config.content}\n`

        // Ensure directory exists
        await fs.mkdir(blogDir, { recursive: true })

        // Write the file
        await fs.writeFile(filePath, mdxContent, 'utf-8')

        return {
            success: true,
            filePath,
            slug,
        }
    } catch (error) {
        return {
            success: false,
            filePath,
            slug,
            error: error instanceof Error ? error.message : String(error),
        }
    }
}

/**
 * List all existing blog posts
 */
export async function listPosts(
    blogDir: string = path.join(process.cwd(), 'data', 'blog')
): Promise<string[]> {
    try {
        const files = await fs.readdir(blogDir)
        return files.filter((f) => f.endsWith('.mdx') || f.endsWith('.md'))
    } catch {
        return []
    }
}

/**
 * Delete a blog post by slug
 */
export async function deletePost(
    slug: string,
    blogDir: string = path.join(process.cwd(), 'data', 'blog')
): Promise<boolean> {
    const filePath = path.join(blogDir, `${slug}.mdx`)
    try {
        await fs.unlink(filePath)
        return true
    } catch {
        return false
    }
}

export default {
    createPost,
    generateSlug,
    listPosts,
    deletePost,
}
