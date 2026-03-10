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
      <h2>Match Results for a Given Day</h2>

      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      <button onClick={searchByDate}>Show Matches</button>

      <div>
        {matches.map((match) => (
          <div key={match.gameId}>
            {match.playerA.name} ({match.playerA.played}) vs{" "}
            {match.playerB.name} ({match.playerB.played})
            {" — Winner: "}
            {match.winner ?? "Draw"}
          </div>
        ))}
      </div>
    </div>
  );
}