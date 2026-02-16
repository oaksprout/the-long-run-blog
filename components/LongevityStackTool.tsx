'use client'

import React, { useState } from 'react'
import Link from '@/components/Link'

const stacks = {
  '30s': {
    title: 'The Accumulation Phase',
    objective: 'Peak Physiological Performance',
    items: [
      { id: 'vo2max', label: 'Push VO2 Max to peak (4x4 intervals)', category: 'Physical' },
      { id: 'lpa', label: 'Screen for Lp(a) and APOE genotype', category: 'Screening' },
      { id: 'creatine', label: 'Creatine optimization (5g daily)', category: 'Supplement' },
      { id: 'vitd', label: 'Vitamin D/K2 optimization', category: 'Supplement' },
    ],
  },
  '40s': {
    title: 'The Maintenance Phase',
    objective: 'Metabolic Resilience',
    items: [
      { id: 'cgm', label: 'CGM monitoring (2-4 weeks/year)', category: 'Monitoring' },
      {
        id: 'acarbose',
        label: 'Consider low-dose Acarbose/Metformin',
        category: 'Pharmacological',
      },
      {
        id: 'hormones',
        label: 'Establish testosterone/perimenopausal baseline',
        category: 'Hormonal',
      },
      { id: 'zone2', label: 'Consistent Zone 2 (3-4 hours/week)', category: 'Physical' },
    ],
  },
  '50s+': {
    title: 'The Preservation Phase',
    objective: 'Attenuating Senescence',
    items: [
      {
        id: 'rapa',
        label: 'Intermittent Rapamycin pulse (5-6mg weekly)',
        category: 'Pharmacological',
      },
      { id: 'apob', label: 'Aggressive ApoB management (< 60 mg/dL)', category: 'Lipid' },
      {
        id: 'senolytics',
        label: 'Periodic Senolytic clearing (Quercetin/Fisetin)',
        category: 'Senolytic',
      },
      { id: 'glp1', label: 'Consider low-dose GLP-1 for neuroprotection', category: 'Brainspan' },
    ],
  },
}

const foundation = [
  { id: 'stability', label: 'Stability & Strength training', category: 'Foundation' },
  { id: 'sleep', label: 'Sleep Recovery optimization', category: 'Foundation' },
  { id: 'protein', label: 'High Protein-to-Energy ratio', category: 'Foundation' },
]

const LongevityStackTool = () => {
  const [decade, setDecade] = useState<'30s' | '40s' | '50s+'>('30s')
  const [checkedItems, setCheckedItems] = useState<string[]>([])

  const currentStack = stacks[decade]
  const allItems = [...foundation, ...currentStack.items]

  const toggleItem = (id: string) => {
    setCheckedItems((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]))

    if (typeof window !== 'undefined' && window.umami) {
      window.umami.track('stack_item_toggle', { item: id, decade })
    }
  }

  const progress = Math.round(
    (checkedItems.filter((id) => allItems.some((item) => item.id === id)).length /
      allItems.length) *
      100
  )

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <h2 className="mb-2 text-2xl font-bold text-gray-900 dark:text-gray-100">
        Interactive Longevity Stack
      </h2>
      <p className="mb-6 text-gray-600 dark:text-gray-400">
        Build your personalized 2026 protocol based on your biological decade.
      </p>

      <div className="mb-8 flex space-x-2">
        {(['30s', '40s', '50s+'] as const).map((d) => (
          <button
            key={d}
            onClick={() => {
              setDecade(d)
              if (typeof window !== 'undefined' && window.umami) {
                window.umami.track('stack_decade_change', { decade: d })
              }
            }}
            className={`flex-1 rounded-md py-2 text-sm font-medium transition-colors ${
              decade === d
                ? 'bg-primary-500 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            {d}
          </button>
        ))}
      </div>

      <div className="mb-8">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
            Stack Maturity
          </span>
          <span className="text-primary-500 text-sm font-bold">{progress}%</span>
        </div>
        <div className="h-2 w-full rounded-full bg-gray-100 dark:bg-gray-700">
          <div
            className="bg-primary-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="mb-3 text-xs font-bold tracking-wider text-gray-400 uppercase">
            Core Foundation
          </h3>
          <div className="space-y-3">
            {foundation.map((item) => (
              <label
                key={item.id}
                aria-label={item.label}
                className="flex cursor-pointer items-center space-x-3 rounded-lg border border-gray-100 p-3 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-900/40"
              >
                <input
                  type="checkbox"
                  checked={checkedItems.includes(item.id)}
                  onChange={() => toggleItem(item.id)}
                  className="text-primary-500 focus:ring-primary-500 h-5 w-5 rounded border-gray-300 dark:border-gray-600 dark:bg-gray-700"
                />
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    {item.label}
                  </div>
                  <div className="text-xs text-gray-500">{item.category}</div>
                </div>
              </label>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-1 text-xs font-bold tracking-wider text-gray-400 uppercase">
            {decade} Specific: {currentStack.title}
          </h3>
          <p className="text-primary-500 mb-3 text-xs font-medium">
            Objective: {currentStack.objective}
          </p>
          <div className="space-y-3">
            {currentStack.items.map((item) => (
              <label
                key={item.id}
                aria-label={item.label}
                className="flex cursor-pointer items-center space-x-3 rounded-lg border border-gray-100 p-3 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-900/40"
              >
                <input
                  type="checkbox"
                  checked={checkedItems.includes(item.id)}
                  onChange={() => toggleItem(item.id)}
                  className="text-primary-500 focus:ring-primary-500 h-5 w-5 rounded border-gray-300 dark:border-gray-600 dark:bg-gray-700"
                />
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    {item.label}
                  </div>
                  <div className="text-xs text-gray-500">{item.category}</div>
                </div>
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8 text-center">
        <Link
          href="/blog/the-age-adjusted-longevity-stack-2026"
          className="text-primary-500 hover:text-primary-600 text-sm font-semibold"
        >
          Read the full 2026 Stack Guide →
        </Link>
      </div>
    </div>
  )
}

export default LongevityStackTool
