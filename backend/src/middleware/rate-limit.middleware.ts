import { Request, Response, NextFunction } from "express";

import { RateLimitService } from "../services/rate-limit.service";

const service =  new RateLimitService();

export function rateLimit(

    prefix: string,

    limit: number,

    window: number

) {

    return async (

        req: Request,

        res: Response,

        next: NextFunction

    ) => {

        const identifier = req.ip || "unknown";

        const result = await service.check( `rate-limit:${prefix}:${identifier}`,  limit,  window );

        if (!result.allowed) {

            return res.status(429).json({

                success: false,

                message:
                    "Too many requests",

                retryAfter:
                    result.resetIn

            });

        }

        res.setHeader(

            "X-RateLimit-Limit",

            limit

        );

        res.setHeader(

            "X-RateLimit-Remaining",

            result.remaining

        );

        res.setHeader(

            "X-RateLimit-Reset",

            result.resetIn

        );

        next();

    };

}