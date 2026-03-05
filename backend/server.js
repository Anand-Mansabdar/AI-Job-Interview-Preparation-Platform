require("dotenv").config();
const app = require("./src/app");
const connectDB = require("./src/config/db");
const invokeGeminiAi = require("./src/services/ai.service");

connectDB();

invokeGeminiAi();

app.listen(3000, () => {
  console.log(`Server running on http://localhost:3000`);
});
