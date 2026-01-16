import { ReactNode } from 'react'

interface CalloutProps {
  children: ReactNode
  type?: 'info' | 'warning' | 'insight'
}

const Callout = ({ children, type = 'info' }: CalloutProps) => {
  const icon = type === 'warning' ? '⚠️' : type === 'insight' ? '🧠' : 'ℹ️'
  const borderClass =
    type === 'warning'
      ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20'
      : type === 'insight'
        ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
        : 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'

  return (
    <div className={`my-6 flex items-start space-x-4 rounded-lg border-l-4 p-4 ${borderClass}`}>
      <span className="text-xl">{icon}</span>
      <div className="prose dark:prose-invert text-sm">{children}</div>
    </div>
  )
}

export default Callout
