'use client'

import { useState, useEffect } from 'react'
import Link from './Link'
import SocialIcon from './social-icons'
import siteMetadata from '@/data/siteMetadata'

const LeadMagnetCTA = () => {
  const [isUnlocked, setIsUnlocked] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const unlocked =
      typeof window !== 'undefined' ? localStorage.getItem('longevity_guide_unlocked') : null
    if (unlocked === 'true') {
      setIsUnlocked(true)
    }
  }, [])

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('longevity_guide_unlocked', 'true')
    }
    // Small delay to ensure the share window starts opening before UI change
    setTimeout(() => {
      setIsUnlocked(true)
    }, 1500)
  }

  const shareText = encodeURIComponent(
    `I'm optimizing my healthspan with The Long Run's Longevity Starter Guide! Check it out: `
  )
  const shareUrl = encodeURIComponent(siteMetadata.siteUrl)

  const xShareUrl = `https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`
  const linkedinShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`

  // Avoid hydration mismatch by rendering a placeholder during SSR
  if (!mounted) {
    return (
      <div className="border-primary-200 bg-primary-50 dark:border-primary-800 dark:bg-primary-900/20 my-8 min-h-[160px] animate-pulse rounded-xl border p-6" />
    )
  }

  return (
    <div className="border-primary-200 bg-primary-50 dark:border-primary-800 dark:bg-primary-900/20 my-8 rounded-xl border p-6 shadow-sm">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex-1">
          <h3 className="text-primary-600 dark:text-primary-400 mb-4 text-2xl font-bold">
            Master the 44/60 Acceleration Windows
          </h3>
          <p className="mb-6 text-lg text-gray-600 dark:text-gray-300">
            Stop guessing and start living within the constraints of the best research. Our upgraded
            guide includes the <strong>44/60 Shift Checklist</strong> — the definitive protocol for
            navigating biological age pivots identified by the latest longevity science.
          </p>
          <ul className="mb-6 grid gap-2 text-sm text-gray-600 sm:grid-cols-2 dark:text-gray-400">
            <li className="flex items-center gap-2">
              <span className="text-primary-500 font-bold">✓</span> 44/60 Acceleration Protocol
            </li>
            <li className="flex items-center gap-2">
              <span className="text-primary-500 font-bold">✓</span> Mitochondrial Efficiency
            </li>
            <li className="flex items-center gap-2">
              <span className="text-primary-500 font-bold">✓</span> The Leucine Shield Protocol
            </li>
            <li className="flex items-center gap-2">
              <span className="text-primary-500 font-bold">✓</span> Smart Bio-Tracking
            </li>
          </ul>
        </div>
        <div className="flex flex-shrink-0 flex-col items-center gap-4">
          {isUnlocked ? (
            <Link
              href="/static/resources/longevity-starter-guide.html"
              className="bg-primary-600 hover:bg-primary-700 focus:ring-primary-300 dark:bg-primary-500 dark:hover:bg-primary-600 dark:focus:ring-primary-800 inline-flex items-center rounded-lg px-8 py-4 text-center text-lg font-bold text-white shadow-lg transition-all hover:scale-105 focus:ring-4 focus:outline-none"
            >
              Download Now
              <svg
                className="ml-2 h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                ></path>
              </svg>
            </Link>
          ) : (
            <div className="flex flex-col items-center gap-4">
              <div className="flex gap-6">
                <SocialIcon
                  kind="x"
                  href={xShareUrl}
                  size={12}
                  onClick={handleShare}
                  className="hover:text-primary-500 transition-all hover:scale-125"
                />
                <SocialIcon
                  kind="linkedin"
                  href={linkedinShareUrl}
                  size={12}
                  onClick={handleShare}
                  className="hover:text-primary-500 transition-all hover:scale-125"
                />
              </div>
              <div className="flex flex-col items-center gap-1">
                <span className="text-sm font-bold text-gray-900 dark:text-gray-100">
                  Share to Unlock
                </span>
                <button
                  onClick={() => setIsUnlocked(true)}
                  className="text-xs text-gray-400 underline hover:text-gray-500"
                >
                  Or download directly (no share)
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default LeadMagnetCTA
