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

router.get("/history", async (req, res) => {
  try {
    const { start, end } = req.query;

    if (!start || !end) {
      return res.status(400).json({
        message: "Start date and end date are required",
      });
    }

    const startDate = new Date(start as string);
    const endDate = new Date(end as string);

    endDate.setHours(23, 59, 59, 999);

    const matches = await getMatches();

    const filteredMatches = matches
      .filter((match: any) => {
        const matchDate = new Date(match.time);
        return matchDate >= startDate && matchDate <= endDate;
      })
      .map((match: any) => ({
        ...match,
        winner: getWinner(match),
      }));

    const leaderboard = calculateLeaderboard(filteredMatches);

    res.json(leaderboard);
  } catch (error) {
    console.error("HISTORICAL LEADERBOARD ERROR:", error);
    res.status(500).json({ message: "Error fetching historical leaderboard" });
  }
});

export default router;