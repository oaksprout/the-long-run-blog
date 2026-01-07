# Agent Usage Guide

How the AI agent uses this infrastructure to publish content and learn from analytics.

## Overview

The agent has two main capabilities:
1. **Publish** - Create and push MDX blog posts
2. **Analyze** - Query Umami for performance metrics

## Publishing Content

### Creating a Post

```typescript
import { createPost, type PostConfig } from './agent'

const post: PostConfig = {
  title: 'Understanding AI Agents',
  date: '2025-01-07',
  tags: ['ai', 'agents', 'automation'],
  summary: 'A deep dive into autonomous AI agent architecture',
  content: `
## Introduction

Autonomous agents are transforming how we interact with software...

## Key Concepts

### 1. Perception
Agents perceive their environment through sensors and APIs...

### 2. Reasoning
Using LLMs and structured prompts, agents reason about their goals...

### 3. Action
Agents take actions through tools and APIs...

## Conclusion

The future of AI is agentic...
  `.trim()
}

const result = await createPost(post)
if (result.success) {
  console.log(`Created: ${result.filePath}`)
  // Now commit and push
}
```

### Post Frontmatter Options

| Field | Required | Description |
|-------|----------|-------------|
| `title` | Yes | Post title |
| `date` | No | Publish date (default: today) |
| `tags` | Yes | Array of topic tags |
| `summary` | Yes | SEO description |
| `content` | Yes | Markdown content |
| `draft` | No | If true, not published |
| `authors` | No | Author slugs (default: ['default']) |
| `images` | No | Featured images |

### Git Workflow

After creating the post file:

```bash
# Stage the new post
git add data/blog/understanding-ai-agents.mdx

# Commit with descriptive message
git commit -m "Add: Understanding AI Agents"

# Push to trigger Railway deploy
git push origin main
```

Railway auto-deploys on push. Post will be live in ~60-90 seconds.

## Analyzing Performance

### Initialization

```typescript
import { loadConfig, AnalyticsClient } from './agent'

// Load config from environment
const config = loadConfig()

// Create analytics client
const analytics = new AnalyticsClient(config.umami)
```

### Getting Overall Stats

```typescript
// Last 30 days
const stats = await analytics.getStatsLastDays(30)

console.log({
  pageviews: stats.pageviews.value,
  visitors: stats.visitors.value,
  bounceRate: ((stats.bounces.value / stats.visits.value) * 100).toFixed(1) + '%',
  avgTimeOnSite: Math.round(stats.totaltime.value / stats.visits.value) + 's'
})
```

### Finding Top Content

```typescript
// Get top 10 pages
const topPages = await analytics.getTopPagesLastDays(30, 10)

for (const page of topPages) {
  console.log(`${page.x}: ${page.y} views`)
}
// Output:
// /blog/popular-post: 1523 views
// /blog/another-post: 892 views
// /: 654 views
```

### Traffic Sources

```typescript
const endAt = new Date()
const startAt = new Date()
startAt.setDate(startAt.getDate() - 30)

const referrers = await analytics.getReferrers(startAt, endAt)
console.log('Top referrers:', referrers.slice(0, 5))
```

### Full Performance Summary

```typescript
const summary = await analytics.getPerformanceSummary(30)

// Returns:
// {
//   stats: { pageviews, visitors, visits, bounces, totaltime },
//   topPages: [...top 10 pages...],
//   referrers: [...top 10 referrers...],
//   period: { start: '2024-12-08', end: '2025-01-07' }
// }
```

## Learning Loop

The agent should follow this workflow:

```
1. Query Analytics
   └─ What topics/formats perform best?
        │
        ▼
2. Generate Content
   └─ Optimize for high performers
        │
        ▼
3. Publish
   └─ git push triggers deploy
        │
        ▼
4. Wait for Data
   └─ Allow 24-72 hours for traffic
        │
        ▼
5. Evaluate
   └─ Query analytics for new content
        │
        ▼
6. Update Strategy
   └─ Adjust topics, format, timing
        │
        └──────────► Repeat
```

### Example Learning Analysis

```typescript
async function analyzeAndLearn() {
  const summary = await analytics.getPerformanceSummary(30)
  
  // Find patterns in successful content
  const successfulPosts = summary.topPages
    .filter(p => p.x.startsWith('/blog/'))
    .slice(0, 5)
  
  // Extract topics from URLs
  const topics = successfulPosts.map(p => {
    const slug = p.x.replace('/blog/', '')
    return { slug, views: p.y }
  })
  
  console.log('Top performing topics:', topics)
  
  // Compare to site-wide averages
  const avgViewsPerPost = summary.stats.pageviews.value / 
    summary.topPages.filter(p => p.x.startsWith('/blog/')).length
  
  console.log(`Average views per post: ${avgViewsPerPost}`)
  
  // Growth trend
  const growth = ((summary.stats.pageviews.value - summary.stats.pageviews.prev) / 
    summary.stats.pageviews.prev * 100).toFixed(1)
  
  console.log(`Pageview growth: ${growth}%`)
  
  return { topics, avgViewsPerPost, growth }
}
```

## Rate Limits

Umami API has no hard rate limits for self-hosted instances, but:
- Query during off-peak hours when possible
- Cache results for repeated analysis
- Batch queries using `getPerformanceSummary()`

## Error Handling

```typescript
import { loadConfig, AnalyticsClient } from './agent'

try {
  const config = loadConfig()
  const analytics = new AnalyticsClient(config.umami)
  const stats = await analytics.getStatsLastDays(30)
} catch (error) {
  if (error instanceof Error) {
    if (error.message.includes('Missing required environment variables')) {
      // Configuration error - check .env
    } else if (error.message.includes('Umami API error: 401')) {
      // Invalid API key
    } else if (error.message.includes('Umami API error: 404')) {
      // Invalid website ID
    }
  }
}
```
