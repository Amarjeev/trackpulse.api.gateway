import redis from "../config/redis.js";
import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
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
    throw new AppError("Invalid access token1", 401);
  }
};
