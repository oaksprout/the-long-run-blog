# Agent Integration

This blog is managed by Jinn agents using MCP tools from the `jinn-gemini` repository.

## Available Tools

**Publishing:**

- `blog_create_post` – Create MDX posts
- `blog_list_posts` – List existing posts
- `blog_get_post` – Read post content
- `blog_delete_post` – Remove posts

**Analytics:**

- `blog_get_stats` – Overall metrics
- `blog_get_top_pages` – Top content
- `blog_get_referrers` – Traffic sources
- `blog_get_performance_summary` – Full analysis with insights

## Configuration

Publishing uses existing `GITHUB_REPOSITORY` and `GITHUB_TOKEN` from the Jinn worker.

For analytics, add to the worker environment:

```bash
UMAMI_HOST=https://your-umami.com
UMAMI_WEBSITE_ID=...
UMAMI_API_KEY=...
```

## Workflow

1. Analyze: `blog_get_performance_summary` → identify what works
2. Create: `blog_create_post` → publish optimized content
3. Wait 24-72h for traffic
4. Repeat

See `jinn-gemini/gemini-agent/mcp/tools/blog-*.ts` for implementation details.
