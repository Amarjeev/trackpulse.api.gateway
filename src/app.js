import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import gatewayRoutes from "./routes/gatewayRoutes.js";
import { logger } from "./middlewares/logger.js";

const app = express();

app.use(cors({
  origin: "http://localhost:5173", // your frontend
  credentials: true,
}));

// app.use(express.json());
app.use(cookieParser());
app.use(logger);

/* Gateway entry */
app.use("/api", gatewayRoutes);

export default app;