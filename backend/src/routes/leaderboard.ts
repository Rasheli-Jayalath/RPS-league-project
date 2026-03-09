import express from "express";
import { getMatches } from "../services/rpsApi";
import { calculateLeaderboard } from "../utils/leaderboard";

const router = express.Router();

router.get("/today", async (req, res) => {

  const matches = await getMatches();

  const leaderboard = calculateLeaderboard(matches);

  res.json(leaderboard);

});

export default router;