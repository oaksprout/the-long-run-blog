import siteMetadata from '@/data/siteMetadata'
import RetentionCTA from '@/components/RetentionCTA'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({ title: 'Newsletter' })

export default function Page() {
  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      <div className="space-y-2 pt-6 pb-8 md:space-y-5">
        <h1 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 dark:text-gray-100">
          Newsletter
        </h1>
        <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
          Subscribe to The Long Run Digest for the latest in longevity science.
        </p>
      </div>
      <div className="container py-12">
        <RetentionCTA />
        <div className="prose dark:prose-invert max-w-none pt-8">
          <h2>What to expect</h2>
          <ul>
            <li>
              <strong>Weekly Research Briefs</strong>: We digest complex longevity papers so you
              don't have to.
            </li>
            <li>
              <strong>The Protocol</strong>: Practical biohacking and healthspan extension tips
              based on current evidence.
            </li>
            <li>
              <strong>Community Updates</strong>: Early access to new tools and community
              discussions.
            </li>
          </ul>
          <p>No spam. No hype. Just high-signal longevity science.</p>
        </div>
      </div>
    </div>
  )
}
