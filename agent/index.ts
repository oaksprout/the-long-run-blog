/**
 * Agent Toolkit
 *
 * Main entry point for the autonomous content publishing agent.
 * Exports all utilities for publishing and analytics.
 */

export { loadConfig, type AgentConfig, type UmamiConfig, type GitConfig } from './config'

export {
    createPost,
    generateSlug,
    listPosts,
    deletePost,
    type PostConfig,
    type PublishResult,
} from './publish'

export {
    AnalyticsClient,
    createAnalyticsClient,
    type Stats,
    type StatsValue,
    type PageMetric,
    type PageviewsData,
    type MetricType,
} from './analytics'
