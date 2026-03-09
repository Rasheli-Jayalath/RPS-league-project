import express from "express";
import { getMatches } from "../services/rpsApi";

const router = express.Router();

router.get("/latest", async (req, res) => {
  try {
    const matches = await getMatches();

    const latestMatches = [...matches]
      .sort((a: any, b: any) => b.time - a.time)
      .slice(0, 20);

    res.json(latestMatches);
  } catch (error) {
    res.status(500).json({ message: "Error fetching matches" });
  }
});

router.get("/player/:name", async (req, res) => {
  try {
    const { name } = req.params;
    const matches = await getMatches();

    const playerMatches = matches.filter((match: any) => {
      return (
        match.playerA?.name?.toLowerCase().includes(name.toLowerCase()) ||
        match.playerB?.name?.toLowerCase().includes(name.toLowerCase())
      );
    });

    res.json(playerMatches);
  } catch (error) {
    console.error("PLAYER ROUTE ERROR:", error);
    res.status(500).json({ message: "Error fetching player matches" });
  }
});

export default router;