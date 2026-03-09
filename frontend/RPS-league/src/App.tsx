import LatestMatches from "./components/LatestMatches";
import PlayerSearch from "./components/PlayerSearch";
import TodayLeaderboard from "./components/TodayLeaderboard";

function App() {
  return (
    <div>
      <h1>RPS League Dashboard</h1>
      <LatestMatches />
      <PlayerSearch />
      <TodayLeaderboard />
    </div>
  );
}

export default App;