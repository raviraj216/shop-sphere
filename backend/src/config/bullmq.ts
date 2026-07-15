import { Queue } from "bullmq";

export const emailQueue = new Queue(
    "email",
    {
        connection: {
            host: process.env.REDIS_HOST,
            port: Number(process.env.REDIS_PORT)
        }
    }
);

export const orderQueue = new Queue(
    "order",
    {
        connection: {
            host: process.env.REDIS_HOST,
            port: Number(process.env.REDIS_PORT)
        }
    }
);