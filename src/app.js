import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import gatewayRoutes from "./routes/gatewayRoutes.js";
import { logger } from "./middlewares/logger.js";

const app = express();

// app.use(cors({
//   origin: process.env.CLIENT_URL,
//   methods: ["GET", "POST", "PUT", "DELETE"],
//   credentials: true,
// }));

const allowedOrigins = [process.env.CLIENT_URL];

// app.use(
//   cors({
//     origin: function (origin, callback) {

//       // Allow mobile apps / Postman / no-origin requests
//       if (!origin) return callback(null, true);

//       if (allowedOrigins.includes(origin)) {
//         return callback(null, true);
//       }

//       return callback(new Error("CORS blocked"));
//     },

//     methods: ["GET", "POST", "PUT", "DELETE"],

//     credentials: true,
//   })
// );

// app.use(express.json());
app.use(cookieParser());
app.use(logger);

/* Gateway entry */
app.use("/api", gatewayRoutes);

export default app;