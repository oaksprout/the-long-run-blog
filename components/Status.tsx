'use client'

import { useEffect, useState } from 'react'

const Status = () => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="flex items-center space-x-2 rounded-full border border-primary-500/30 bg-primary-500/5 px-3 py-1 text-xs font-medium text-primary-600 dark:text-primary-400">
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary-400 opacity-75"></span>
        <span className="relative inline-flex h-2 w-2 rounded-full bg-primary-500"></span>
      </span>
      <span className="font-mono uppercase tracking-wider">Network: Online</span>
    </div>
  )
}

export default Status
