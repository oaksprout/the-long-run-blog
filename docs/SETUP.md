# Railway Deployment Guide

Complete guide to deploy the Jinn Blog infrastructure on Railway.

## Prerequisites

- [Railway account](https://railway.app) (connected to GitHub)
- GitHub repository: `https://github.com/Jinn-Network/jinn-blog`

## Deployment Steps

### 1. Create Railway Project

1. Go to [Railway Dashboard](https://railway.app/dashboard)
2. Click **New Project**
3. Name it `jinn-blog`

### 2. Add PostgreSQL Database

1. In your project, click **+ New** → **Database** → **PostgreSQL**
2. Wait for provisioning (~30 seconds)
3. Note: Connection URL will be available as `${{Postgres.DATABASE_URL}}`

### 3. Deploy Umami Analytics

1. Fork [umami-software/umami](https://github.com/umami-software/umami) to Jinn-Network
2. In Railway project, click **+ New** → **GitHub Repo**
3. Select the Umami fork
4. Add environment variable:
   ```
   DATABASE_URL = ${{Postgres.DATABASE_URL}}
   ```
5. Go to **Settings** → **Networking** → **Generate Domain**
6. Deploy and wait for build
7. Visit the generated URL
8. Create admin account on first visit
9. Add website:
   - Go to **Settings** → **Websites** → **Add website**
   - Enter blog URL (Railway-generated domain from step 5)
   - Copy the **Website ID**
10. Create API key:
    - Go to **Settings** → **API Keys** → **Create**
    - Copy the generated key

### 4. Deploy Blog

1. Push this repository to `https://github.com/Jinn-Network/jinn-blog`
2. In Railway project, click **+ New** → **GitHub Repo**
3. Select `jinn-blog`
4. Add environment variables:
   ```
   NEXT_UMAMI_ID = <website-id-from-step-9>
   NEXT_UMAMI_SRC = https://<umami-domain>/script.js
   ```
5. Go to **Settings** → **Networking** → **Generate Domain**
6. Deploy

### 5. Verify Setup

1. Visit the blog URL - should see the homepage
2. Open browser DevTools → Network tab
3. Verify Umami script loads successfully
4. Check Umami dashboard - should show pageview

## Environment Variables Summary

### Blog Service

| Variable         | Value                        | Description               |
| ---------------- | ---------------------------- | ------------------------- |
| `NEXT_UMAMI_ID`  | `xxxxxxxx-xxxx-...`          | Website ID from Umami     |
| `NEXT_UMAMI_SRC` | `https://umami.../script.js` | Umami tracking script URL |

### Umami Service

| Variable       | Value                        | Description                   |
| -------------- | ---------------------------- | ----------------------------- |
| `DATABASE_URL` | `${{Postgres.DATABASE_URL}}` | Railway PostgreSQL connection |

### Agent Configuration (External)

These are used by the AI agent, not by Railway:

```env
UMAMI_HOST=https://<umami-railway-domain>
UMAMI_WEBSITE_ID=<website-id>
UMAMI_API_KEY=<api-key>
GIT_REPO_URL=git@github.com:Jinn-Network/jinn-blog.git
```

## Troubleshooting

### Blog won't build

- Check build logs in Railway
- Ensure `yarn.lock` is committed
- Verify Node.js version compatibility

### Umami not tracking

- Verify `NEXT_UMAMI_ID` is set correctly
- Check browser for Content Security Policy errors
- Ensure Umami domain is accessible

### API requests failing

- Verify API key is valid
- Check CORS settings in Umami
- Ensure website ID is correct

## Costs

Railway usage-based pricing:

- **Hobby plan**: $5/month credit included
- **PostgreSQL**: ~$5-10/month for small database
- **Apps**: ~$5-15/month per service

Total estimated: **$15-30/month**
