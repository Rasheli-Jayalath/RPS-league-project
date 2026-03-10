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
        `/leaderboard/history?start=${encodeURIComponent(start)}&end=${encodeURIComponent(end)}`
      );
      setLeaders(response.data);
    } catch (error) {
      console.error("Error fetching historical leaderboard:", error);
    }
  };

  return (
    <div>
      <h2>Historical Leaderboard</h2>
      <p className="section-subtitle">
        Select a date range to rank players by wins.
      </p>

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
        {leaders.length === 0 ? (
          <p className="empty-message">Choose a date range to see results.</p>
        ) : (
          leaders.slice(0, 20).map((entry, index) => (
            <div className="leaderboard-item" key={entry.player}>
              <strong>#{index + 1}</strong> {entry.player} — {entry.wins} wins
            </div>
          ))
        )}
      </div>
    </div>
  );
}