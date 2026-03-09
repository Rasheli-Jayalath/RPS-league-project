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

      {matches.map((m) => (
        <div key={m.gameId}>
          {m.playerA.name} ({m.playerA.played}) vs {m.playerB.name} ({m.playerB.played})
          {" — Winner: "}
          {m.winner ?? "Draw"}
        </div>
      ))}
    </div>
  );
}