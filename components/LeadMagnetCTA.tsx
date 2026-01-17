import Link from './Link'

const LeadMagnetCTA = () => {
  return (
    <div className="border-primary-200 bg-primary-50 dark:border-primary-800 dark:bg-primary-900/20 my-8 rounded-xl border p-6">
      <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
        <div className="flex-1">
          <h3 className="text-primary-600 dark:text-primary-400 mb-2 text-xl font-bold">
            Download the Longevity Starter Guide
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Get our 2026 protocol for mitochondrial efficiency, cognitive resilience, and smart
            bio-tracking in one actionable PDF.
          </p>
        </div>
        <div className="flex-shrink-0">
          <Link
            href="/static/resources/longevity-starter-guide.html"
            className="bg-primary-600 hover:bg-primary-700 focus:ring-primary-300 dark:bg-primary-500 dark:hover:bg-primary-600 dark:focus:ring-primary-800 inline-flex items-center rounded-lg px-5 py-3 text-center text-sm font-medium text-white focus:ring-4 focus:outline-none"
          >
            Download Guide (HTML/PDF)
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
        </div>
      </div>
    </div>
  )
}

export default LeadMagnetCTA
