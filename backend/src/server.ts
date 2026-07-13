import dotenv from "dotenv";

dotenv.config();

import app from "./app";

import { connectDatabase } from "./database/connection";

import { redisClient } from "./config/redis";


const PORT = process.env.PORT || 3000;

async function startServer() {
    
    await connectDatabase();

    await redisClient.connect();

    app.listen(PORT, () => {
        console.log(`🚀 Server running on port ${PORT}`);
    });
}

startServer();

process.on("SIGINT", async () => {

    console.log("Closing Redis...");

    await redisClient.quit();

    process.exit(0);

});

process.on("SIGTERM", async () => {

    console.log("Closing Redis...");

    await redisClient.quit();

    process.exit(0);

});