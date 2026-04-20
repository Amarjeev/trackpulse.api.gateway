import "./config/env.js";
import app from "./app.js";

const PORT = process.env.PORT || 5005;

app.listen(PORT, () => {
  console.log(`🚀 API Gateway running on port ${PORT}`);
});