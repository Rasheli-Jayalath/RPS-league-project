import express from "express";
import cors from "cors";

import matchRoutes from "./routes/matches";
import leaderboardRoutes from "./routes/leaderboard";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/matches", matchRoutes); 
app.use("/leaderboard", leaderboardRoutes);

app.get("/", (req, res) => {
  res.send("RPS API Server Running");
});

app.listen(3001, () => {
  console.log("Server running on port 3001");
});