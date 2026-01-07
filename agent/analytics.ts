/**
 * Umami Analytics Client
 *
 * Provides functions for the AI agent to query analytics data
 * from a self-hosted Umami instance.
 *
 * API Reference: https://umami.is/docs/api
 */

import type { UmamiConfig } from './config'

// ============================================
// Type Definitions
// ============================================

export interface StatsValue {
    value: number
    prev: number
}

export interface Stats {
    pageviews: StatsValue
    visitors: StatsValue
    visits: StatsValue
    bounces: StatsValue
    totaltime: StatsValue
}

export interface PageMetric {
    x: string // URL path
    y: number // View count
}

export interface TimeSeriesPoint {
    x: string // Date string
    y: number
}

export interface PageviewsData {
    pageviews: TimeSeriesPoint[]
    sessions: TimeSeriesPoint[]
}

export type MetricType = 'url' | 'referrer' | 'browser' | 'os' | 'device' | 'country' | 'event'

// ============================================
// Analytics Client
// ============================================

export class AnalyticsClient {
    private host: string
    private websiteId: string
    private apiKey: string

    constructor(config: UmamiConfig) {
        this.host = config.host.replace(/\/$/, '') // Remove trailing slash
        this.websiteId = config.websiteId
        this.apiKey = config.apiKey
    }

    /**
     * Make an authenticated API request to Umami
     */
    private async request<T>(endpoint: string, params?: Record<string, string>): Promise<T> {
        const url = new URL(`${this.host}/api/websites/${this.websiteId}${endpoint}`)

        if (params) {
            Object.entries(params).forEach(([key, value]) => {
                url.searchParams.set(key, value)
            })
        }

        const response = await fetch(url.toString(), {
            headers: {
                Authorization: `Bearer ${this.apiKey}`,
                'Content-Type': 'application/json',
            },
        })

        if (!response.ok) {
            throw new Error(`Umami API error: ${response.status} ${response.statusText}`)
        }

        return response.json()
    }

    /**
     * Get time range parameters in milliseconds
     */
    private getTimeParams(startAt: Date, endAt: Date): Record<string, string> {
        return {
            startAt: startAt.getTime().toString(),
            endAt: endAt.getTime().toString(),
        }
    }

    // ============================================
    // Public API Methods
    // ============================================

    /**
     * Get overall website statistics
     *
     * Returns pageviews, visitors, visits, bounces, and total time
     * with current and previous period values for comparison.
     */
    async getStats(startAt: Date, endAt: Date): Promise<Stats> {
        return this.request<Stats>('/stats', this.getTimeParams(startAt, endAt))
    }

    /**
     * Get top pages by views
     *
     * @param startAt - Start of time range
     * @param endAt - End of time range
     * @param limit - Maximum number of results (default: 10)
     */
    async getTopPages(startAt: Date, endAt: Date, limit: number = 10): Promise<PageMetric[]> {
        const data = await this.request<PageMetric[]>('/metrics', {
            ...this.getTimeParams(startAt, endAt),
            type: 'url',
        })
        return data.slice(0, limit)
    }

    /**
     * Get metrics by type
     *
     * @param type - Metric type: url, referrer, browser, os, device, country, event
     */
    async getMetrics(startAt: Date, endAt: Date, type: MetricType): Promise<PageMetric[]> {
        return this.request<PageMetric[]>('/metrics', {
            ...this.getTimeParams(startAt, endAt),
            type,
        })
    }

    /**
     * Get pageviews time series data
     *
     * Returns daily pageviews and sessions for charting.
     */
    async getPageviews(startAt: Date, endAt: Date, unit: 'day' | 'hour' = 'day'): Promise<PageviewsData> {
        return this.request<PageviewsData>('/pageviews', {
            ...this.getTimeParams(startAt, endAt),
            unit,
        })
    }

    /**
     * Get referrer sources
     *
     * Shows where traffic is coming from.
     */
    async getReferrers(startAt: Date, endAt: Date): Promise<PageMetric[]> {
        return this.getMetrics(startAt, endAt, 'referrer')
    }

    // ============================================
    // Convenience Methods
    // ============================================

    /**
     * Get stats for the last N days
     */
    async getStatsLastDays(days: number = 30): Promise<Stats> {
        const endAt = new Date()
        const startAt = new Date()
        startAt.setDate(startAt.getDate() - days)
        return this.getStats(startAt, endAt)
    }

    /**
     * Get top pages for the last N days
     */
    async getTopPagesLastDays(days: number = 30, limit: number = 10): Promise<PageMetric[]> {
        const endAt = new Date()
        const startAt = new Date()
        startAt.setDate(startAt.getDate() - days)
        return this.getTopPages(startAt, endAt, limit)
    }

    /**
     * Get a performance summary suitable for AI agent analysis
     */
    async getPerformanceSummary(days: number = 30): Promise<{
        stats: Stats
        topPages: PageMetric[]
        referrers: PageMetric[]
        period: { start: string; end: string }
    }> {
        const endAt = new Date()
        const startAt = new Date()
        startAt.setDate(startAt.getDate() - days)

        const [stats, topPages, referrers] = await Promise.all([
            this.getStats(startAt, endAt),
            this.getTopPages(startAt, endAt, 10),
            this.getReferrers(startAt, endAt),
        ])

        return {
            stats,
            topPages,
            referrers: referrers.slice(0, 10),
            period: {
                start: startAt.toISOString().split('T')[0],
                end: endAt.toISOString().split('T')[0],
            },
        }
    }
}

/**
 * Create a pre-configured analytics client from environment
 */
export function createAnalyticsClient(config: UmamiConfig): AnalyticsClient {
    return new AnalyticsClient(config)
}

export default AnalyticsClient
