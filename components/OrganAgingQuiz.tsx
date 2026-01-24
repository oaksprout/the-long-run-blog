'use client'

import React, { useState } from 'react'

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

  const handleAnswer = (weights) => {
    const newScores = { ...scores }
    Object.keys(weights).forEach((organ) => {
      newScores[organ] += weights[organ]
    })
    setScores(newScores)

    if (step < questions.length - 1) {
      setStep(step + 1)
    } else {
      setShowResults(true)
    }
  }

  if (showResults) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-gray-100">
          Your Estimated Organ Ages
        </h2>
        <div className="space-y-4">
          {Object.entries(scores).map(([organ, score]) => (
            <div key={organ} className="flex items-center justify-between">
              <span className="text-gray-600 capitalize dark:text-gray-300">{organ}</span>
              <span className="text-primary-500 font-semibold">
                {chronologicalAge + score} years
              </span>
            </div>
          ))}
        </div>
        <button
          onClick={() => {
            setStep(0)
            setScores({ brain: 0, heart: 0, liver: 0, lungs: 0 })
            setShowResults(false)
          }}
          className="bg-primary-500 hover:bg-primary-600 mt-8 w-full rounded-md py-2 text-white"
        >
          Restart Quiz
        </button>
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
            onClick={() => handleAnswer(option.weights)}
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
