import express from "express";
import { getMatches } from "../services/rpsApi";
import { getWinner } from "../utils/getWinner";
import { calculateLeaderboard } from "../utils/calculateLeaderboard";

const router = express.Router();

router.get("/today", async (req, res) => {
  try {
    const matches = await getMatches();

    const today = new Date().toDateString();

    const todayMatches = matches
      .filter((match: any) => new Date(match.time).toDateString() === today)
      .map((match: any) => ({
        ...match,
        winner: getWinner(match),
      }));

    const leaderboard = calculateLeaderboard(todayMatches);

    res.json(leaderboard);
  } catch (error) {
    console.error("TODAY LEADERBOARD ERROR:", error);
    res.status(500).json({ message: "Error fetching today's leaderboard" });
  }
});

export default router;