interface Project {
  title: string
  description: string
  href?: string
  imgSrc?: string
}

const projectsData: Project[] = [
  {
    title: 'Protocol Translation',
    description: `Taking dense research papers from open-access journals and translating them into actionable lifestyle protocols for healthspan extension.`,
    imgSrc: '/static/images/ocean.jpeg',
    href: '/tags/protocols',
  },
  {
    title: 'Science-Based Myth Busting',
    description: `Using rigorous data analysis to validate or debunk trending health fads like cold plunges, supplements, and fasting protocols.`,
    imgSrc: '/static/images/twitter-card.png',
    href: '/tags/myth-busting',
  },
]

export default projectsData
