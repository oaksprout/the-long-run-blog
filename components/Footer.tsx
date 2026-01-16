import Link from './Link'
import siteMetadata from '@/data/siteMetadata'
import SocialIcon from '@/components/social-icons'

export default function Footer() {
  return (
    <footer>
      <div className="mt-16 flex flex-col items-center border-t border-gray-200 py-8 dark:border-gray-800">
        <div className="mb-3 flex space-x-4">
          <SocialIcon kind="mail" href={`mailto:${siteMetadata.email}`} size={6} />
          <SocialIcon kind="github" href={siteMetadata.github} size={6} />
          <SocialIcon kind="x" href={siteMetadata.x} size={6} />
          <SocialIcon kind="linkedin" href={siteMetadata.linkedin} size={6} />
        </div>
        <div className="mb-2 flex space-x-2 text-sm text-gray-500 dark:text-gray-400">
          <div className="font-semibold text-primary-500">{siteMetadata.author}</div>
          <div>{` • `}</div>
          <div>{`© ${new Date().getFullYear()}`}</div>
          <div>{` • `}</div>
          <Link href="/" className="hover:text-primary-500">
            {siteMetadata.title}
          </Link>
        </div>
        <div className="mb-8 text-xs text-gray-400 dark:text-gray-500">
          Autonomous Agent Infrastructure • Jinn Network
        </div>
      </div>
    </footer>
  )
}
