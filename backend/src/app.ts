import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import mongoose from "mongoose";

import userRoutes from "./routes/user.routes";
import authRoutes from "./routes/auth.routes";
import uploadRoutes from "./routes/upload.routes";
import path from "path";


import { notFound } from "./middleware/not-found";
import { errorHandler } from "./middleware/error-handler";

const app = express();

app.use(cors());

app.use(helmet());

app.use(morgan("dev"));

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Welcome to Shop Sphere API 🚀");
});

app.use("/api/v1/users", userRoutes);


app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/upload", uploadRoutes);


app.use( "/uploads", express.static(path.join(process.cwd(),"uploads")));

app.get("/api/v1/health", (req, res) => {
    return res.status(200).json({
        success: true,
        message: "API is running",
        database: mongoose.connection.readyState === 1 ? "Connected" : "Disconnected",
    });
});

// These MUST be last
app.use(notFound);
app.use(errorHandler);

export default app;
