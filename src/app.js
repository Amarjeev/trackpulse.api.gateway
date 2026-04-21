import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import gatewayRoutes from "./routes/gatewayRoutes.js";
import { logger } from "./middlewares/logger.js";

const app = express();

app.use(cors({
  origin: process.env.CLIENT_URL, // your frontend
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

// app.use(express.json());
app.use(cookieParser());
app.use(logger);

/* Gateway entry */
app.use("/api", gatewayRoutes);

export default app;