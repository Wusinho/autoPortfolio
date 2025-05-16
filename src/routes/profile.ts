import { Router } from "express";
import axios from "axios";
import { marked } from "marked";
import * as cheerio from "cheerio";
import { ProfileData } from "../types/Profile";
import dotenv from "dotenv";

const router = Router();
dotenv.config();

router.get("/", async (_, res) => {
  const username = process.env.GITHUB_USERNAME;
  if (!username) throw new Error("Missing Github Username")
  try {
    const rawUrl = `https://raw.githubusercontent.com/${username}/${username}/main/README.md`;
    const { data: markdown } = await axios.get(rawUrl);

    const html = await marked(markdown); 
    const $ = cheerio.load(html);

    const bio = $("p").first().text().trim();

    const languages: string[] = [];
    const stack: string[] = [];

    $(".languages__container img").each((_, el) => {
      const src = $(el).attr("src");
      if (src) languages.push(src);
    });

    $(".tools__container img").each((_, el) => {
      const src = $(el).attr("src");
      if (src) stack.push(src);
    });

    const result: ProfileData = { bio, languages, stack };
    res.json(result);
  } catch (err: any) {
    console.error("Error parsing profile:", err.message);
    res.status(500).json({ error: "Failed to parse profile" });
  }
});

export default router;
