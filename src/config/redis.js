import { Redis } from "@upstash/redis";

if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
    throw new Error("❌ Upstash Redis environment variables missing");
}

const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

// 🔥 Connection check (test request)
(async () => {
    try {
        await redis.set("health:check", "ok", { ex: 10 });
        const result = await redis.get("health:check");

        if (result === "ok") {
            console.log("✅ Upstash Redis connected successfully");
        } else {
            console.error("⚠️ Redis check failed: unexpected response");
        }
    } catch (err) {
        console.error("❌ Redis connection failed:", err.message);
    }
})();


export default redis;