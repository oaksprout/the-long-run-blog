/** @type {import("pliny/config").PlinyConfig } */
const siteMetadata = {
  title: 'The Long Run',
  author: 'The Long Run',
  headerTitle: 'The Long Run',
  description: 'Translating cutting-edge longevity research into actionable insights for healthspan extension',
  language: 'en-us',
  theme: 'system', // system, dark or light
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://blog-the-long-run-production.up.railway.app',
  siteRepo: 'https://github.com/oaksprout/the-long-run-blog',
  siteLogo: `${process.env.BASE_PATH || ''}/static/images/logo.png`,
  socialBanner: `${process.env.BASE_PATH || ''}/static/images/twitter-card.png`,
  email: '',
  github: '',
  x: '',
  linkedin: '',
  telegram: 'https://t.me/TheLongRunBrief',
  locale: 'en-US',
  // set to true if you want a navbar fixed to the top
  stickyNav: false,
  analytics: {
    // Umami analytics - configured via environment variables
    umamiAnalytics: {
      umamiWebsiteId:
        process.env.NEXT_UMAMI_ID ||
        process.env.NEXT_PUBLIC_UMAMI_ID ||
        process.env.UMAMI_WEBSITE_ID ||
        '00ba0400-cc63-4405-965f-650ca8e6c30e',
      // Custom Umami host (Railway deployed)
      src:
        process.env.NEXT_UMAMI_SRC ||
        process.env.NEXT_PUBLIC_UMAMI_SRC ||
        (process.env.UMAMI_HOST
          ? `${process.env.UMAMI_HOST}/script.js`
          : 'https://umami-production-ae2b.up.railway.app/script.js'),
    },
  },
  newsletter: {
    // Disable newsletter for now
    provider: '',
  },
  comments: {
    // Disable comments for now - can be enabled later with Giscus
    provider: '',
  },
  search: {
    provider: 'kbar',
    kbarConfig: {
      searchDocumentsPath: `${process.env.BASE_PATH || ''}/search.json`,
    },
  },
}

module.exports = siteMetadata
