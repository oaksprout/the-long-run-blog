/** @type {import("pliny/config").PlinyConfig } */
const siteMetadata = {
  title: 'The Long Run',
  author: 'The Long Run Team',
  headerTitle: 'The Long Run',
  description:
    'High-impact longevity science research translation and insights for the pursuit of radical healthspan extension.',
  language: 'en-us',
  theme: 'system', // system, dark or light
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://the-long-run-blog.vercel.app',
  siteRepo: 'https://github.com/Jinn-Network/the-long-run-blog',
  siteLogo: `${process.env.BASE_PATH || ''}/static/images/logo.png`,
  socialBanner: `${process.env.BASE_PATH || ''}/static/images/twitter-card.png`,
  email: '',
  github: 'https://github.com/Jinn-Network',
  x: 'https://x.com/JinnNetwork',
  linkedin: '',
  discord: 'https://discord.gg/the-long-run', // Placeholder for community engagement
  locale: 'en-US',
  // set to true if you want a navbar fixed to the top
  stickyNav: false,
  analytics: {
    // Umami analytics - configured via environment variables
    umamiAnalytics: {
      umamiWebsiteId: process.env.NEXT_UMAMI_ID,
      // Custom Umami host (Railway deployed)
      src: process.env.NEXT_UMAMI_SRC || 'https://us.umami.is/script.js',
    },
  },
  newsletter: {
    // Enable buttondown as default provider
    provider: 'buttondown',
  },
  comments: {
    // Enable Giscus for community engagement
    provider: 'giscus',
    giscusConfig: {
      repo: process.env.NEXT_PUBLIC_GISCUS_REPO,
      repositoryId: process.env.NEXT_PUBLIC_GISCUS_REPOSITORY_ID,
      category: process.env.NEXT_PUBLIC_GISCUS_CATEGORY,
      categoryId: process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID,
      mapping: 'pathname',
      reactions: '1',
      metadata: '0',
      theme: 'light',
      darkTheme: 'transparent_dark',
      themeURL: '',
      lang: 'en',
    },
  },
  search: {
    provider: 'kbar',
    kbarConfig: {
      searchDocumentsPath: `${process.env.BASE_PATH || ''}/search.json`,
    },
  },
}

module.exports = siteMetadata