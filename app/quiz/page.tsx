import OrganAgingQuiz from '@/components/OrganAgingQuiz'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({ title: 'Organ Aging Quiz' })

export default function QuizPage() {
  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <h1 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 dark:text-gray-100">
            Organ Aging Quiz
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            Discover the biological age of your key organ systems based on your lifestyle habits.
          </p>
        </div>
        <div className="container py-12">
          <div className="mx-auto max-w-2xl">
            <OrganAgingQuiz />
          </div>
        </div>
      </div>
    </>
  )
}
