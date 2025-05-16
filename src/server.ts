import express from "express";
import profileRouter from "./routes/profile.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use("/profile", profileRouter);

app.get("/", (_, res) => {
  res.send("autoPortfolio scraper API running");
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
