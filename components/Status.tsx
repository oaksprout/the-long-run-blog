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
    <div className="border-primary-500/30 bg-primary-500/5 text-primary-600 dark:text-primary-400 flex items-center space-x-2 rounded-full border px-3 py-1 text-xs font-medium">
      <span className="relative flex h-2 w-2">
        <span className="bg-primary-400 absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"></span>
        <span className="bg-primary-500 relative inline-flex h-2 w-2 rounded-full"></span>
      </span>
      <span className="font-mono uppercase tracking-wider">Network: Online</span>
    </div>
  )
}

export default Status