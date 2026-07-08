import dotenv from "dotenv";

dotenv.config();

import app from "./app";

import { connectDatabase } from "./database/connection";

const PORT = process.env.PORT || 3000;

async function startServer() {
    await connectDatabase();

    app.listen(PORT, () => {
        console.log(`🚀 Server running on port ${PORT}`);
    });
}

startServer();
