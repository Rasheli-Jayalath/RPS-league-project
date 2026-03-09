import { useState } from "react";
import api from "../api";

type Match = {
  gameId: string;
  time: number;
  playerA: {
    name: string;
    played: string;
  };
  playerB: {
    name: string;
    played: string;
  };
};

export default function PlayerSearch() {
  const [playerName, setPlayerName] = useState("");
  const [matches, setMatches] = useState<Match[]>([]);

  const searchPlayer = async () => {
    try {
    //   const response = await api.get(`/matches/player/${playerName}`);
      const response = await api.get(
            `/matches/player/${encodeURIComponent(playerName)}`
        );
      setMatches(response.data);
    } catch (error) {
      console.error("Error fetching player matches:", error);
    }
  };

  return (
    <div>
      <h2>Search Matches by Player</h2>

      <input
        type="text"
        placeholder="Enter player name"
        value={playerName}
        onChange={(e) => setPlayerName(e.target.value)}
      />

      <button onClick={searchPlayer}>Search</button>

      <div>
        {matches.map((match) => (
          <div key={match.gameId}>
            {match.playerA.name} ({match.playerA.played}) vs{" "}
            {match.playerB.name} ({match.playerB.played})
          </div>
        ))}
      </div>
    </div>
  );
}