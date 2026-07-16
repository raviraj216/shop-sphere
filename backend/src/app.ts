import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import mongoose from "mongoose";
import path from "path";

import userRoutes from "./routes/user.routes";
import authRoutes from "./routes/auth.routes";
import uploadRoutes from "./routes/upload.routes";
import productRoutes from "./routes/product.routes";
import categoryRoutes from "./routes/category.routes";
import cartRoutes from "./routes/cart.routes";
import orderRoutes from "./routes/order.routes";

import { notFound } from "./middleware/not-found";
import { errorHandler } from "./middleware/error-handler";
import { rateLimit } from "./middleware/rate-limit.middleware";
import { transporter } from "./config/mail";
import paymentRoutes from "./routes/payment.routes";
import webhookRoutes from "./routes/webhook.routes";

const app = express();

app.use(cors());

app.use(helmet());

app.use(morgan("dev"));


app.use("/api/v1/webhooks/stripe",
    express.raw({
        type: "application/json"
    })
);

app.use(express.json());

app.use(rateLimit("api", 100, 60));

app.get("/", (req, res) => {
    res.send("Welcome to Shop Sphere API 🚀");
});

app.use("/api/v1/users", userRoutes);

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/upload", uploadRoutes);

app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

app.use("/api/v1/products", productRoutes);
app.use("/api/v1/categories", categoryRoutes);
app.use("/api/v1/cart", cartRoutes);
app.use("/api/v1/orders", orderRoutes);

app.use("/api/v1/payments",paymentRoutes);
app.use( "/api/v1/webhooks", webhookRoutes);


app.get("/api/v1/health", (req, res) => {

    transporter.verify(
        (error) => {
            if (error) {
                console.error(error);
            } else {
                console.log("Mail Server Connected");
            }
        }
    );
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
