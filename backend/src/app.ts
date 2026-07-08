import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

const app = express();

app.use(cors());

app.use(helmet());

app.use(morgan("dev"));

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Welcome to Shop Sphere API 🚀");
});

app.get("/api/v1/health", (req, res) => {
    return res.status(200).json({
        success: true,
        message: "API is running",
    });
});

export default app;
