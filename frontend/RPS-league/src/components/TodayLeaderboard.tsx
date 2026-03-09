import { useEffect, useState } from "react";
import api from "../api";

type LeaderboardEntry = {
  player: string;
  wins: number;
};

export default function TodayLeaderboard() {
  const [leaders, setLeaders] = useState<LeaderboardEntry[]>([]);

  useEffect(() => {
    api.get("/leaderboard/today")
      .then((res) => setLeaders(res.data))
      .catch((err) => console.error("Error fetching leaderboard:", err));
  }, []);

  return (
    <div>
      <h2>Today's Leaderboard</h2>

      {leaders.map((entry, index) => (
        <div key={entry.player}>
          {index + 1}. {entry.player} — {entry.wins} wins
        </div>
      ))}
    </div>
  );
}