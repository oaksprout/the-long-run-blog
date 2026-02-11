import Link from '@/components/Link'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { formatDate } from 'pliny/utils/formatDate'
import RetentionCTA from '@/components/RetentionCTA'
import LeadMagnetCTA from '@/components/LeadMagnetCTA'

const MAX_DISPLAY = 5

export default function Home({ posts }) {
  return (
    <>
      <div className="relative isolate overflow-hidden">
        <div className="py-24 sm:py-32">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-2xl lg:mx-0">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl dark:text-gray-100">
                Longevity <span className="text-primary-500">Feed</span>
              </h1>
              <p className="mt-8 text-xl leading-9 text-gray-600 dark:text-gray-300">
                Our mission is to increase the number of people living within the constraints of the
                best longevity research. We focus on the <strong>44/60 Acceleration Windows</strong>{' '}
                — the critical pivots in biological aging — and translate cutting-edge science into
                actionable protocols for your healthspan.
              </p>
              <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-x-6">
                <Link
                  href="/blog"
                  className="bg-primary-500 hover:bg-primary-400 focus-visible:outline-primary-500 w-full rounded-md px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 sm:w-auto"
                >
                  Explore Research
                </Link>
                <Link
                  href="/about"
                  className="w-full text-center text-sm leading-6 font-semibold text-gray-900 sm:w-auto sm:text-left dark:text-gray-100"
                >
                  Learn About Our Mission <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div
            className="from-primary-200 to-primary-500 relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>
      </div>

      <div className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-primary-500 text-base leading-7 font-semibold">Beyond the Hype</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-gray-100">
              Scientific rigor for the 100-year life.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              {[
                {
                  name: 'Evidence-Based Translation',
                  description:
                    'We dive deep into peer-reviewed longevity research, distilling complex biology into actionable insights.',
                  icon: (
                    <svg
                      className="h-6 w-6 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
                      />
                    </svg>
                  ),
                },
                {
                  name: 'Practical Protocols',
                  description:
                    'Nutrition, exercise, and pharmacological strategies optimized for healthspan extension and cognitive resilience.',
                  icon: (
                    <svg
                      className="h-6 w-6 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  ),
                },
                {
                  name: 'Future-Proof Intelligence',
                  description:
                    'Staying ahead of the curve with insights on the latest longevity therapeutics and bio-tracking technologies.',
                  icon: (
                    <svg
                      className="h-6 w-6 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
                      />
                    </svg>
                  ),
                },
              ].map((feature) => (
                <div key={feature.name} className="flex flex-col">
                  <dt className="flex items-center gap-x-3 text-base leading-7 font-semibold text-gray-900 dark:text-gray-100">
                    <div className="bg-primary-500 flex h-10 w-10 items-center justify-center rounded-lg">
                      {feature.icon}
                    </div>
                    {feature.name}
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600 dark:text-gray-300">
                    <p className="flex-auto">{feature.description}</p>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      <LeadMagnetCTA />

      <div className="bg-gray-50 py-16 dark:bg-gray-900/40">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-primary-500 text-base leading-7 font-semibold">
              Interactive Tools
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-gray-100">
              Measure & Optimize Your Healthspan
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
              Go beyond reading. Use our clinical-grade interactive tools to identify your
              biological weakest links and build your personalized 2026 stack.
            </p>
          </div>
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-2">
            <div className="flex flex-col rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-shadow hover:shadow-md dark:border-gray-700 dark:bg-gray-800">
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                Organ Aging Quiz
              </h3>
              <p className="mt-4 flex-auto text-gray-600 dark:text-gray-300">
                Identify which of your 11 biological systems is leading the aging race. Based on the
                2025 Nature Medicine proteomics study.
              </p>
              <Link
                href="/quiz"
                className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 mt-6 font-semibold"
              >
                Take the Quiz &rarr;
              </Link>
            </div>
            <div className="flex flex-col rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-shadow hover:shadow-md dark:border-gray-700 dark:bg-gray-800">
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                Longevity Stack Tool
              </h3>
              <p className="mt-4 flex-auto text-gray-600 dark:text-gray-300">
                Build your age-adjusted protocol. From VO2 Max in your 30s to Rapamycin pulses in
                your 60s.
              </p>
              <Link
                href="/blog/the-age-adjusted-longevity-stack-2026"
                className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 mt-6 font-semibold"
              >
                Build Your Stack &rarr;
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {!posts.length && 'No posts found.'}
          {posts.slice(0, MAX_DISPLAY).map((post) => {
            const { slug, date, title, summary, tags } = post
            return (
              <li key={slug} className="py-12">
                <article>
                  <div className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
                    <dl>
                      <dt className="sr-only">Published on</dt>
                      <dd className="font-mono text-base leading-6 font-medium text-gray-500 dark:text-gray-400">
                        <time dateTime={date}>{formatDate(date, siteMetadata.locale)}</time>
                      </dd>
                    </dl>
                    <div className="space-y-5 xl:col-span-3">
                      <div className="space-y-6">
                        <div>
                          <h2 className="text-2xl leading-8 font-bold tracking-tight">
                            <Link
                              href={`/blog/${slug}`}
                              className="text-gray-900 dark:text-gray-100"
                            >
                              {title}
                            </Link>
                          </h2>
                          <div className="flex flex-wrap">
                            {tags.map((tag) => (
                              <Tag key={tag} text={tag} />
                            ))}
                          </div>
                        </div>
                        <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                          {summary}
                        </div>
                      </div>
                      <div className="text-base leading-6 font-medium">
                        <Link
                          href={`/blog/${slug}`}
                          className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 font-mono text-sm"
                          aria-label={`Read more: "${title}"`}
                        >
                          <span className="mr-2">❯</span>
                          EXECUTE: READ_MORE
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              </li>
            )
          })}
        </ul>
      </div>
      {posts.length > MAX_DISPLAY && (
        <div className="flex justify-end text-base leading-6 font-medium">
          <Link
            href="/blog"
            className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
            aria-label="All posts"
          >
            All Posts &rarr;
          </Link>
        </div>
      )}
      {siteMetadata.newsletter?.provider && (
        <div className="pt-4">
          <RetentionCTA />
        </div>
      )}
    </>
  )
}
