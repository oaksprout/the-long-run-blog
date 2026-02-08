import OrganAgingQuiz from '@/components/OrganAgingQuiz'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({ title: 'Organ Aging Quiz' })

export default function QuizPage() {
  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="pt-6 pb-4 md:space-y-2">
          <h1 className="text-2xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-3xl sm:leading-10 md:text-5xl md:leading-14 dark:text-gray-100">
            Organ Aging Quiz
          </h1>
          <p className="text-md leading-7 text-gray-500 dark:text-gray-400">
            Identify your biological 'weakest link' in 60 seconds.
          </p>
        </div>
        <div className="container py-8">
          <div className="mx-auto max-w-2xl">
            <OrganAgingQuiz />
          </div>
        </div>
      </div>
    </>
  )
}
