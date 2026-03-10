import { useEffect, useState } from "react";
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

export default function LatestMatches() {
  const [matches, setMatches] = useState<Match[]>([]);

  useEffect(() => {
    api.get("/matches/latest")
      .then((res) => setMatches(res.data))
      .catch((err) => console.error("Error fetching matches:", err));
  }, []);

  return (
    <div>
      <h2>Latest Matches</h2>
      <p className="section-subtitle">
        Most recent Rock-Paper-Scissors battles and winners.
      </p>

      {matches.length === 0 ? (
        <p className="empty-message">No matches available.</p>
      ) : (
        matches.map((m) => (
          <div className="match-item" key={m.gameId}>
            <strong>{m.playerA.name}</strong> ({m.playerA.played}) vs{" "}
            <strong>{m.playerB.name}</strong> ({m.playerB.played})
            {" — Winner: "}
            <strong>{m.winner ?? "Draw"}</strong>
          </div>
        ))
      )}
    </div>
  );
}