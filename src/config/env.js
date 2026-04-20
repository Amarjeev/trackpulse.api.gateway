import dotenv from "dotenv";

dotenv.config();

// Fail fast
if (!process.env.AUTH_SERVICE) {
  throw new Error("AUTH_SERVICE missing in .env");
}

if (!process.env.FLEET_SERVICE) {
  throw new Error("FLEET_SERVICE missing in .env");
}