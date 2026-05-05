import redis from "../config/redis.js";
import jwt from "jsonwebtoken";

export const verifyWebToken = async (req, res, next) => {
  try {
    // 2. Extract token
    const token = req?.cookies?.trp_access_token || null;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Access token missing",
      });
    }

    // 3. Verify token
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    if (!decoded) {
      return res.status(401).json({
        success: false,
        message: "Token verification failed",
      });
    }

    const isBlocked = await redis.get(`blacklist:${decoded.id}`);

    if (isBlocked) {
      res.clearCookie("trp_access_token");
      res.clearCookie("trp_refresh_token");
      return res.status(401).json({ message: "User blocked" });
    }

    // 4. Attach user data
    req.headers["x-user-id"] = decoded.id;
    req.headers["x-company-id"] = decoded.companyId;

    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid access token" });
  }
};


/* Verify Mobile Token */
export const verifyMobileToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Authorization token missing",
      });
    }

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
console.log("Decoded Mobile Token:", decoded);
    if (!decoded) {
      return res.status(401).json({
        success: false,
        message: "Token verification failed",
      });
    }

        // 4. Attach user data
    req.headers["x-user-id"] = decoded.id;
    req.headers["x-company-id"] = decoded.companyId;
    req.headers["x-driver-id"] = decoded.driverId;

    next();
  } catch (err) {
    console.error("Mobile Token Error:", err);
    return res.status(401).json({ message: "Invalid mobile token" });
  }
};