import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import {
  verifyWebToken,
  verifyMobileToken,
} from "../middlewares/authMiddleware.js";

const router = express.Router();

/* 🔥 GLOBAL DEBUG (before proxy) */
// router.use((req, res, next) => {
//   console.log("\n🔥 GATEWAY HIT");
//   console.log("URL:", req.originalUrl);
//   console.log("METHOD:", req.method);
//   console.log("BODY:", req.body);
//   next();
// });

/* AUTH SERVICE */
router.use(
  "/auth",
  createProxyMiddleware({
    target: process.env.AUTH_SERVICE,
    changeOrigin: true,
    pathRewrite: {
      "^/auth": "",
    },
  }),
);

/* FLEET SERVICE (protected) */
router.use(
  "/fleet",
  verifyWebToken,
  createProxyMiddleware({
    target: process.env.FLEET_SERVICE,
    changeOrigin: true,
    pathRewrite: { "^/fleet": "" },

    onProxyReq: (proxyReq, req) => {
      // Forward user info
      if (req?.user) {
        proxyReq.setHeader("x-user-id", req.user?.id);
        proxyReq.setHeader("x-company-id", req?.user?.companyId);
      }
    },
  }),
);

/* MOBILE SERVICE */

/* AUTH SERVICE */
router.use(
  "/authentication/mobile",
  createProxyMiddleware({
    target: process.env.MOBILE_SERVICE,
    changeOrigin: true,
    pathRewrite: {
      "^/authentication/mobile": "",
    },
  }),
);

router.use(
  "/mobile",
  verifyMobileToken,
  createProxyMiddleware({
    target: process.env.MOBILE_SERVICE,
    changeOrigin: true,
    pathRewrite: { "^/mobile": "" },

    onProxyReq: (proxyReq, req) => {
      // Forward user info
      if (req?.user) {
        proxyReq.setHeader("x-user-id", req.user?.id);
        proxyReq.setHeader("x-driver-id", req?.user?.driverId);
        proxyReq.setHeader("x-company-id", req?.user?.companyId);
      }
    },
  }),
);


export default router;
