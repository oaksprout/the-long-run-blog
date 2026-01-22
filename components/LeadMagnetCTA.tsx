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
      <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
        <div className="flex-1 text-center sm:text-left">
          <h3 className="text-primary-600 dark:text-primary-400 mb-2 text-xl font-bold">
            Download the Longevity Starter Guide
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Get our 2026 protocol for mitochondrial efficiency and cognitive resilience.
            <span className="mt-2 block font-semibold text-primary-600 dark:text-primary-400">
              🎁 Bonus: Includes the new "44/60 Shift Checklist" for navigating aging bursts.
            </span>
          </p>
          {!isUnlocked && (
            <p className="mt-2 text-sm font-medium text-gray-500 italic dark:text-gray-400">
              🔓 Share to unlock your free download
            </p>
          )}
        </div>
        <div className="flex-shrink-0">
          {isUnlocked ? (
            <Link
              href="/static/resources/longevity-starter-guide.html"
              className="bg-primary-600 hover:bg-primary-700 focus:ring-primary-300 dark:bg-primary-500 dark:hover:bg-primary-600 dark:focus:ring-primary-800 inline-flex items-center rounded-lg px-6 py-3 text-center text-sm font-bold text-white shadow-lg transition-all hover:scale-105 focus:ring-4 focus:outline-none"
            >
              Download Guide (HTML)
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
            <div className="flex flex-col items-center gap-3">
              <div className="flex gap-6">
                <SocialIcon
                  kind="x"
                  href={xShareUrl}
                  size={10}
                  onClick={handleShare}
                  className="transition-transform hover:scale-110"
                />
                <SocialIcon
                  kind="linkedin"
                  href={linkedinShareUrl}
                  size={10}
                  onClick={handleShare}
                  className="transition-transform hover:scale-110"
                />
              </div>
              <span className="text-xs font-medium text-gray-500">Click to share & unlock</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default LeadMagnetCTA
