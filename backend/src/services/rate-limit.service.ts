import { redisClient } from "../config/redis";

export class RateLimitService {

    async check(  key: string, limit: number,  windowInSeconds: number ) {

        const current = await redisClient.incr(key);

        if (current === 1) {

            await redisClient.expire(

                key,

                windowInSeconds

            );

        }

        const ttl = await redisClient.ttl(key);

        return {

            allowed:

                current <= limit,

            remaining:

                Math.max(

                    0,

                    limit - current

                ),

            resetIn: ttl,

            current

        };

    }

}