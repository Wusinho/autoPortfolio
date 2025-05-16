import { Router, Request, Response } from "express";
import { fetchPinnedProfile } from "../services/githubService.js";
import dotenv from "dotenv";

dotenv.config();

const router = Router();

router.get("/", async (_req: Request, res: Response): Promise<void> => {
  const token = process.env.GITHUB_TOKEN;
  const username = process.env.GITHUB_USERNAME;

  if (!token || !username) {
    res.status(400).json({ error: "Missing GITHUB_TOKEN or GITHUB_USER" });
    return;
  }

  try {
    const user = await fetchPinnedProfile(username, token);
    res.json(user); // ✅ no return
  } catch (err: any) {
    console.error("GitHub GraphQL error:", err.message);
    res.status(500).json({ error: "Failed to fetch profile" });
  }
});

export default router;

