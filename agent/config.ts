/**
 * Agent Toolkit Configuration
 *
 * Environment-based configuration for the autonomous agent.
 * Load via dotenv in scripts or set in Railway environment.
 */

export interface UmamiConfig {
    host: string
    websiteId: string
    apiKey: string
}

export interface GitConfig {
    repo: string
    branch: string
}

export interface AgentConfig {
    umami: UmamiConfig
    git: GitConfig
}

/**
 * Load configuration from environment variables
 */
export function loadConfig(): AgentConfig {
    const missing: string[] = []

    const umamiHost = process.env.UMAMI_HOST
    const umamiWebsiteId = process.env.UMAMI_WEBSITE_ID
    const umamiApiKey = process.env.UMAMI_API_KEY
    const gitRepo = process.env.GIT_REPO_URL

    if (!umamiHost) missing.push('UMAMI_HOST')
    if (!umamiWebsiteId) missing.push('UMAMI_WEBSITE_ID')
    if (!umamiApiKey) missing.push('UMAMI_API_KEY')
    if (!gitRepo) missing.push('GIT_REPO_URL')

    if (missing.length > 0) {
        throw new Error(`Missing required environment variables: ${missing.join(', ')}`)
    }

    return {
        umami: {
            host: umamiHost!,
            websiteId: umamiWebsiteId!,
            apiKey: umamiApiKey!,
        },
        git: {
            repo: gitRepo!,
            branch: process.env.GIT_BRANCH || 'main',
        },
    }
}

export default loadConfig
