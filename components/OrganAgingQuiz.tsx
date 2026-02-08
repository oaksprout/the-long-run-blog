'use client'

import React, { useState } from 'react'
import LeadMagnetCTA from './LeadMagnetCTA'

interface Umami {
  track: (eventName: string, eventData?: object) => void
}
// ... existing interface and declare global ...
declare global {
  interface Window {
    umami: Umami
  }
}

const questions = [
  {
    id: 'sleep',
    text: 'How many hours of sleep do you average per night?',
    options: [
      { label: 'Less than 6 hours', weights: { brain: 3, heart: 1 } },
      { label: '6-8 hours', weights: { brain: 0, heart: 0 } },
      { label: '8+ hours', weights: { brain: -1, heart: -1 } },
    ],
  },
  {
    id: 'exercise',
    text: 'How many minutes of zone 2 cardio do you do per week?',
    options: [
      { label: '0-30 mins', weights: { heart: 4, lungs: 3 } },
      { label: '30-150 mins', weights: { heart: 0, lungs: 0 } },
      { label: '150+ mins', weights: { heart: -2, lungs: -2 } },
    ],
  },
  {
    id: 'diet',
    text: 'How often do you consume processed sugars?',
    options: [
      { label: 'Daily', weights: { liver: 3, brain: 2 } },
      { label: 'A few times a week', weights: { liver: 1, brain: 1 } },
      { label: 'Rarely', weights: { liver: 0, brain: 0 } },
    ],
  },
]

const OrganAgingQuiz = () => {
  const [step, setStep] = useState(0)
  const [scores, setScores] = useState({ brain: 0, heart: 0, liver: 0, lungs: 0 })
  const [showResults, setShowResults] = useState(false)
  const [chronologicalAge, setChronologicalAge] = useState(40)

  const handleAnswer = (option: (typeof questions)[0]['options'][0]) => {
    const { weights } = option
    const newScores = { ...scores }
    Object.keys(weights).forEach((organ) => {
      newScores[organ] += weights[organ]
    })
    setScores(newScores)

    // Track answer
    if (typeof window !== 'undefined' && window.umami) {
      window.umami.track('quiz_answer', {
        question: questions[step].id,
        answer: option.label,
      })
    }

    if (step < questions.length - 1) {
      setStep(step + 1)
    } else {
      setShowResults(true)
      // Track completion
      if (typeof window !== 'undefined' && window.umami) {
        window.umami.track('quiz_complete', {
          brain_age: chronologicalAge + newScores.brain,
          heart_age: chronologicalAge + newScores.heart,
          liver_age: chronologicalAge + newScores.liver,
          lungs_age: chronologicalAge + newScores.lungs,
        })
      }
    }
  }

  if (showResults) {
    return (
      <div className="space-y-6">
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-gray-100">
            Your Biological Age Offset
          </h2>
          <div className="mb-6 grid grid-cols-2 gap-4">
            {Object.entries(scores).map(([organ, score]) => (
              <div
                key={organ}
                className="flex flex-col items-center rounded-lg bg-gray-50 p-3 dark:bg-gray-700/50"
              >
                <span className="text-xs text-gray-500 uppercase dark:text-gray-400">{organ}</span>
                <span
                  className={`text-lg font-bold ${
                    score > 0 ? 'text-red-500' : score < 0 ? 'text-green-500' : 'text-gray-500'
                  }`}
                >
                  {score > 0 ? `+${score}` : score} years
                </span>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-100 pt-4 dark:border-gray-700">
            <label
              htmlFor="age-range"
              className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Adjust your chronological age for a full report:
            </label>
            <div className="flex items-center gap-4">
              <input
                id="age-range"
                type="range"
                min="20"
                max="80"
                value={chronologicalAge}
                onChange={(e) => setChronologicalAge(parseInt(e.target.value))}
                className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 dark:bg-gray-700"
              />
              <span className="text-primary-500 w-12 text-lg font-bold">{chronologicalAge}</span>
            </div>
          </div>

          <button
            onClick={() => {
              if (typeof window !== 'undefined' && window.umami) {
                window.umami.track('quiz_restart')
              }
              setStep(0)
              setScores({ brain: 0, heart: 0, liver: 0, lungs: 0 })
              setShowResults(false)
            }}
            className="text-primary-500 hover:text-primary-600 mt-6 w-full text-sm font-medium underline"
          >
            Restart Quiz
          </button>
        </div>

        <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <LeadMagnetCTA />
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <div className="text-primary-500 mb-4 text-sm font-medium">
        Question {step + 1} of {questions.length}
      </div>
      <h2 className="mb-6 text-xl font-semibold text-gray-900 dark:text-gray-100">
        {questions[step].text}
      </h2>
      <div className="space-y-3">
        {questions[step].options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswer(option)}
            className="hover:border-primary-500 hover:bg-primary-50/50 dark:hover:border-primary-400 dark:hover:bg-primary-900/20 w-full rounded-lg border border-gray-200 px-4 py-3 text-left dark:border-gray-600"
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  )
}

export default OrganAgingQuiz
