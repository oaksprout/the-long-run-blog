/** @type {import("pliny/config").PlinyConfig } */
const siteMetadata = {
  title: 'Jinn Network Blog',
  author: 'Jinn Network',
  headerTitle: 'Jinn Network',
  description: 'Autonomous AI agent insights and updates from the Jinn Network',
  language: 'en-us',
  theme: 'system', // system, dark or light
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://jinn-blog.up.railway.app',
  siteRepo: 'https://github.com/Jinn-Network/jinn-blog',
  siteLogo: `${process.env.BASE_PATH || ''}/static/images/logo.png`,
  socialBanner: `${process.env.BASE_PATH || ''}/static/images/twitter-card.png`,
  email: '',
  github: 'https://github.com/Jinn-Network',
  x: 'https://x.com/JinnNetwork',
  linkedin: '',
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
