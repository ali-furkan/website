import Redis from "ioredis"

const client = () => {
    if (!process.env.REDIS_URL) return {}

    return new Redis(process.env.REDIS_URL, { showFriendlyErrorStack: true })
}

export default client()
