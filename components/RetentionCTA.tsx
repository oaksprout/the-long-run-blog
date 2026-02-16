'use client'

import { useState, useEffect } from 'react'
import NewsletterForm from 'pliny/ui/NewsletterForm'

export default function RetentionCTA() {
  const [isBookmarked, setIsBookmarked] = useState(false)

  // This is a simple mock/instructional bookmark CTA
  const handleBookmark = () => {
    alert('Press Ctrl+D (or Cmd+D on Mac) to bookmark this page for your longevity research!')
    setIsBookmarked(true)
  }

  return (
    <div className="my-12 rounded-2xl border border-gray-200 bg-gray-50 p-8 dark:border-gray-800 dark:bg-gray-900/50">
      <div className="grid items-center gap-8 md:grid-cols-2">
        <div>
          <h3 className="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100">
            Join The Long Run Digest
          </h3>
          <p className="mb-6 text-gray-600 dark:text-gray-400">
            Get weekly high-impact longevity research translations and healthspan extension
            protocols delivered to your inbox.
          </p>
          <NewsletterForm title="" />
        </div>
        <div className="border-t border-gray-200 pt-8 md:border-t-0 md:border-l md:pt-0 md:pl-8 dark:border-gray-800">
          <h3 className="mb-4 text-xl font-bold text-gray-900 dark:text-gray-100">
            Never miss a protocol
          </h3>
          <p className="mb-6 text-gray-600 dark:text-gray-400">
            We release deep-dives every Tuesday. Bookmark this site to stay updated on the latest in
            longevity science.
          </p>
          <button
            onClick={handleBookmark}
            className={`flex w-full items-center justify-center rounded-lg px-4 py-2 font-medium transition-colors ${
              isBookmarked
                ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                : 'bg-primary-500 hover:bg-primary-600 text-white'
            }`}
          >
            <svg
              className="mr-2 h-5 w-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
            </svg>
            {isBookmarked ? 'Bookmark added to memory' : 'Bookmark this page'}
          </button>
          <p className="mt-4 text-center text-xs text-gray-500 dark:text-gray-400">
            Join 2,400+ researchers and biohackers.
          </p>
        </div>
      </div>
    </div>
  )
}
