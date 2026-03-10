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
      <p className="section-subtitle">
        Top players ranked by total wins today.
      </p>

      {leaders.length === 0 ? (
        <p className="empty-message">No leaderboard data available.</p>
      ) : (
        leaders.slice(0, 20).map((entry, index) => (
          <div className="leaderboard-item" key={entry.player}>
            <strong>#{index + 1}</strong> {entry.player} — {entry.wins} wins
          </div>
        ))
      )}
    </div>
  );
}