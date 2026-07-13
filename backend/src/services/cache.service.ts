import { redisClient } from "../config/redis";

export class CacheService {

    async get<T>(
        key: string
    ): Promise<T | null> {

        const data =
            await redisClient.get(key);

        if (!data) {

            return null;

        }

        return JSON.parse(data) as T;

    }

    async set(
        key: string,
        value: unknown,
        ttl = 600
    ) {

        await redisClient.set(
            key,
            JSON.stringify(value),
            {
                EX: ttl
            }
        );

    }

    async delete(
        key: string
    ) {

        await redisClient.del(key);

    }

    async exists(
        key: string
    ): Promise<boolean> {

        return (
            await redisClient.exists(key)
        ) === 1;

    }

    async expire(
        key: string,
        ttl: number
    ) {

        await redisClient.expire(
            key,
            ttl
        );

    }

    async clear() {

        await redisClient.flushDb();

    }

    async clearByPattern(
        pattern: string
    ) {

        const keys =
            await redisClient.keys(pattern);

        if (keys.length > 0) {

            await redisClient.del(keys);

        }

    }

}