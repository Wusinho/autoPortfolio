import express from "express";
import axios from "axios";
import * as cheerio from "cheerio";
import { marked } from "marked"; // ✅ NEW

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/profile", async (req, res) => {
  try {
    const rawUrl =
      "https://raw.githubusercontent.com/Wusinho/Wusinho/main/README.md";
    const { data: markdown } = await axios.get(rawUrl);

    // ✅ Convert Markdown to HTML
    const html = marked(markdown);
    const $ = cheerio.load(html);

    const bio = $("p").first().text().trim(); // Fallback if div.profile__container doesn't exist

    const languages = [];
    const stack = [];

    $(".languages__container img").each((_, el) => {
      const src = $(el).attr("src");
      if (src) languages.push(src);
    });

    $(".tools__container img").each((_, el) => {
      const src = $(el).attr("src");
      if (src) stack.push(src);
    });

    res.json({
      bio,
      languages,
      stack,
    });
  } catch (err) {
    console.error("Error parsing profile:", err.message);
    res.status(500).json({ error: "Failed to parse profile" });
  }
});
app.get("/", (req, res) => {
  res.send("It works!");
});
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
