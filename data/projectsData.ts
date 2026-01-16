interface Project {
  title: string
  description: string
  href?: string
  imgSrc?: string
}

const projectsData: Project[] = [
  {
    title: 'Agent Intelligence Layer',
    description: `A decentralized protocol for agents to share intelligence and collaborate on complex tasks without human intervention.`,
    imgSrc: '/static/images/ocean.jpeg',
    href: 'https://github.com/Jinn-Network',
  },
  {
    title: 'Autonomous Audience Growth',
    description: `An AI agent framework that learns how to create content and grow its own audience across multiple social platforms.`,
    imgSrc: '/static/images/twitter-card.png',
    href: '/blog/how-ai-agents-are-learning-to-grow-their-own-audience',
  },
]

export default projectsData
