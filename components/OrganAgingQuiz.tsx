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
    id: 'brain_fog',
    text: 'Do you experience "brain fog" or word-finding difficulties after 3 PM?',
    category: 'brain',
    options: [
      { label: 'Frequently', weights: { brain: 4 } },
      { label: 'Occasionally', weights: { brain: 2 } },
      { label: 'Rarely/Never', weights: { brain: 0 } },
    ],
  },
  {
    id: 'sleep_latency',
    text: 'How long does it typically take you to fall asleep?',
    category: 'brain',
    options: [
      { label: 'More than 20 minutes', weights: { brain: 3 } },
      { label: '10-20 minutes', weights: { brain: 1 } },
      { label: 'Less than 10 minutes', weights: { brain: 0 } },
    ],
  },
  {
    id: 'heart_recovery',
    text: 'What is your recovery time after climbing a flight of stairs?',
    category: 'heart',
    options: [
      { label: 'I feel winded for more than a minute', weights: { heart: 4, lungs: 2 } },
      { label: 'I catch my breath in 30-60 seconds', weights: { heart: 2, lungs: 1 } },
      { label: 'I feel fine almost immediately', weights: { heart: 0, lungs: 0 } },
    ],
  },
  {
    id: 'cold_extremities',
    text: 'Do you have cold hands or feet regularly, even in warm environments?',
    category: 'heart',
    options: [
      { label: 'Yes, frequently', weights: { heart: 3 } },
      { label: 'Sometimes', weights: { heart: 1 } },
      { label: 'Rarely/Never', weights: { heart: 0 } },
    ],
  },
  {
    id: 'metabolic_hunger',
    text: 'Do you get "hangry" or shaky if you miss a meal?',
    category: 'metabolic',
    options: [
      { label: 'Yes, definitely', weights: { liver: 4 } },
      { label: 'Occasionally', weights: { liver: 2 } },
      { label: 'Rarely/Never', weights: { liver: 0 } },
    ],
  },
  {
    id: 'visceral_fat',
    text: 'Where do you primarily store body fat when you gain weight?',
    category: 'metabolic',
    options: [
      { label: 'Midsection/Visceral area', weights: { liver: 4 } },
      { label: 'Hips/Thighs', weights: { liver: 1 } },
      { label: 'Evenly distributed', weights: { liver: 0 } },
    ],
  },
  {
    id: 'thirst',
    text: 'Is your hydration constant but you still feel thirsty?',
    category: 'kidney',
    options: [
      { label: 'Yes, often', weights: { kidney: 4 } },
      { label: 'Sometimes', weights: { kidney: 2 } },
      { label: 'Rarely/Never', weights: { kidney: 0 } },
    ],
  },
  {
    id: 'puffiness',
    text: 'Do you have puffiness under the eyes in the morning?',
    category: 'kidney',
    options: [
      { label: 'Yes, frequently', weights: { kidney: 3 } },
      { label: 'Occasionally', weights: { kidney: 1 } },
      { label: 'Rarely/Never', weights: { kidney: 0 } },
    ],
  },
]

const OrganAgingQuiz = () => {
  const [step, setStep] = useState(0)
  const [scores, setScores] = useState({ brain: 0, heart: 0, liver: 0, lungs: 0, kidney: 0 })
  const [showResults, setShowResults] = useState(false)
  const [chronologicalAge, setChronologicalAge] = useState(40)

  const handleAnswer = (option: (typeof questions)[0]['options'][0]) => {
    const { weights } = option
    const newScores = { ...scores }
    Object.keys(weights).forEach((organ) => {
      newScores[organ] += weights[organ]
    })
    setScores(newScores)

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
      if (typeof window !== 'undefined' && window.umami) {
        window.umami.track('quiz_complete', {
          brain_age: chronologicalAge + newScores.brain,
          heart_age: chronologicalAge + newScores.heart,
          liver_age: chronologicalAge + newScores.liver,
          lungs_age: chronologicalAge + newScores.lungs,
          kidney_age: chronologicalAge + newScores.kidney,
        })
      }
    }
  }

  const getRecommendations = () => {
    const sortedOrgans = Object.entries(scores).sort((a, b) => b[1] - a[1])
    const weakestLink = sortedOrgans[0][0]

    const recommendations = {
      brain: {
        title: 'Your Neural Clock Might Be Fast',
        text: 'Consider reviewing the GLP-1 Brainspan revolution and optimizing your sleep protocol.',
        link: '/blog/the-glp-1-brainspan-revolution-why-the-weight-loss-drug-is-2026s-biggest-neuroprotection-breakthrough',
      },
      heart: {
        title: 'Your Vascular System Needs Support',
        text: 'Focus on Zone 2 cardio and check your ApoB levels to preserve your cardiovascular engine.',
        link: '/blog/the-age-adjusted-longevity-stack-2026',
      },
      liver: {
        title: 'Your Factory is Overheated',
        text: 'Metabolic markers like fasting insulin should be monitored. Check out the Rapamycin & Acarbose synergy.',
        link: '/blog/rapamycin-acarbose-synergy-the-37-percent-breakthrough',
      },
      kidney: {
        title: 'Check Your Filters',
        text: 'Hydration and potentially a Cystatin C test are recommended to assess kidney function properly.',
        link: '/blog/the-2026-longevity-blueprint-research-synthesis',
      },
      lungs: {
        title: 'Optimize Your Oxygen Intake',
        text: 'Focus on VO2 Max training and breathwork to improve pulmonary efficiency.',
        link: '/blog/the-mitochondrial-efficiency-protocol-quality-over-quantity',
      },
    }

    return recommendations[weakestLink]
  }

  if (showResults) {
    const rec = getRecommendations()
    return (
      <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-gray-100">
          Your Estimated Organ Ages
        </h2>
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {Object.entries(scores).map(([organ, score]) => (
            <div key={organ} className="rounded-lg bg-gray-50 p-4 dark:bg-gray-900/50">
              <div className="text-sm text-gray-500 capitalize dark:text-gray-400">{organ}</div>
              <div className="text-xl font-bold text-primary-500">
                {chronologicalAge + score} years
              </div>
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

        <div className="mb-8 rounded-lg border border-primary-100 bg-primary-50/30 p-6 dark:border-primary-900/30 dark:bg-primary-900/10">
          <h3 className="mb-2 text-lg font-bold text-gray-900 dark:text-gray-100">{rec.title}</h3>
          <p className="mb-4 text-gray-600 dark:text-gray-400">{rec.text}</p>
          <a
            href={rec.link}
            className="text-primary-600 hover:text-primary-700 font-medium dark:text-primary-400"
          >
            Read the full protocol →
          </a>
        </div>

        <button
          onClick={() => {
            if (typeof window !== 'undefined' && window.umami) {
              window.umami.track('quiz_restart')
            }
            setStep(0)
            setScores({ brain: 0, heart: 0, liver: 0, lungs: 0, kidney: 0 })
            setShowResults(false)
          }}
          className="bg-primary-500 hover:bg-primary-600 w-full rounded-md py-3 font-semibold text-white transition-colors"
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
