import { useState } from "react";
import api from "../api";

type Match = {
  gameId: string;
  time: number;
  winner: string | null;
  playerA: {
    name: string;
    played: string;
  };
  playerB: {
    name: string;
    played: string;
  };
};

export default function MatchesByDate() {
  const [date, setDate] = useState("");
  const [matches, setMatches] = useState<Match[]>([]);

  const searchByDate = async () => {
    try {
      const response = await api.get(
        `/matches/date/${encodeURIComponent(date)}`
      );
      setMatches(response.data);
    } catch (error) {
      console.error("Error fetching matches by date:", error);
    }
  };

  return (
    <div>
      <h2>Matches by Date</h2>
      <p className="section-subtitle">
        View all match results for a selected day.
      </p>

      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <button onClick={searchByDate}>Show Matches</button>

      <div>
        {matches.length === 0 ? (
          <p className="empty-message">Select a date to view matches.</p>
        ) : (
          matches.map((match) => (
            <div className="match-item" key={match.gameId}>
              <strong>{match.playerA.name}</strong> ({match.playerA.played}) vs{" "}
              <strong>{match.playerB.name}</strong> ({match.playerB.played})
              {" — Winner: "}
              <strong>{match.winner ?? "Draw"}</strong>
            </div>
          ))
        )}
      </div>
    </div>
  );
}