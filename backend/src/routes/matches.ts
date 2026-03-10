import express from "express";
import { getMatches } from "../services/rpsApi";
import { getWinner } from "../utils/getWinner";

const router = express.Router();

router.get("/latest", async (req, res) => {
  try {
    const matches = await getMatches();

    const latestMatches = [...matches]
      .sort((a: any, b: any) => b.time - a.time)
      .slice(0, 20)
      .map((match: any) => ({
        ...match,
        winner: getWinner(match),
      }));

    res.json(latestMatches);
  } catch (error) {
    console.error("LATEST ROUTE ERROR:", error);
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

router.get("/date/:date", async (req, res) => {
  try {
    const { date } = req.params;

    const selectedDate = new Date(date);
    const startOfDay = new Date(selectedDate);
    const endOfDay = new Date(selectedDate);

    startOfDay.setHours(0, 0, 0, 0);
    endOfDay.setHours(23, 59, 59, 999);

    const matches = await getMatches();

    const filteredMatches = matches
      .filter((match: any) => {
        const matchDate = new Date(match.time);
        return matchDate >= startOfDay && matchDate <= endOfDay;
      })
      .map((match: any) => ({
        ...match,
        winner: getWinner(match),
      }));

    res.json(filteredMatches);
  } catch (error) {
    console.error("DATE ROUTE ERROR:", error);
    res.status(500).json({ message: "Error fetching matches by date" });
  }
});

export default router;