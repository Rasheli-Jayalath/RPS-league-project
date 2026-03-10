import { useState } from "react";
import api from "../api";

type LeaderboardEntry = {
  player: string;
  wins: number;
};

export default function HistoricalLeaderboard() {
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [leaders, setLeaders] = useState<LeaderboardEntry[]>([]);

  const fetchLeaderboard = async () => {
    try {
      const response = await api.get(
        `/leaderboard/history?start=${start}&end=${end}`
      );
      setLeaders(response.data);
    } catch (error) {
      console.error("Error fetching historical leaderboard:", error);
    }
  };

  return (
    <div>
      <h2>Historical Leaderboard</h2>

      <input
        type="date"
        value={start}
        onChange={(e) => setStart(e.target.value)}
      />

      <input
        type="date"
        value={end}
        onChange={(e) => setEnd(e.target.value)}
      />

      <button onClick={fetchLeaderboard}>Show Leaderboard</button>

      <div>
        {leaders.map((entry, index) => (
          <div key={entry.player}>
            {index + 1}. {entry.player} — {entry.wins} wins
          </div>
        ))}
      </div>
    </div>
  );
}