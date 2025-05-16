import express from "express";
import profileRouter from "./routes/profile.js";
import pinnedRouter from "./routes/pinned.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use("/profile", profileRouter);
app.use("/pinned", pinnedRouter);

app.get("/", (_, res) => {
  res.send("autoPortfolio scraper API running");
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
