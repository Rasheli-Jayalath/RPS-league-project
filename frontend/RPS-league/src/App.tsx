import LatestMatches from "./components/LatestMatches";
import PlayerSearch from "./components/PlayerSearch";
import TodayLeaderboard from "./components/TodayLeaderboard";
import HistoricalLeaderboard from "./components/HistoricalLeaderboard";
import MatchesByDate from "./components/MatchesByDate";

function App() {
  return (
    <div>
      <h1>RPS League Dashboard</h1>
      <LatestMatches />
      <PlayerSearch />
      <TodayLeaderboard />
      <HistoricalLeaderboard />
      <MatchesByDate />
    </div>
  );
}

export default App;