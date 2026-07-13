import { createClient } from "redis";

console.log("REDIS_URL xxxx: 🔴", process.env.REDIS_URL);
export const redisClient = createClient({

    url: process.env.REDIS_URL

});

redisClient.on("connect", () => {

    console.log("🟢 Redis Connected");

});

redisClient.on("error", (error) => {

    console.error(" Redis Error:", error);

});

redisClient.on("reconnecting", () => {

    console.log("🟡 Redis Reconnecting...");

});