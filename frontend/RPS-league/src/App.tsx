import "./App.css";
import LatestMatches from "./components/LatestMatches";
import PlayerSearch from "./components/PlayerSearch";
import TodayLeaderboard from "./components/TodayLeaderboard";
import HistoricalLeaderboard from "./components/HistoricalLeaderboard";
import MatchesByDate from "./components/MatchesByDate";

function App() {
  return (
    <div className="app-container">
      <h1>RPS League Dashboard</h1>

      <div className="grid-layout">
        <div className="section">
          <LatestMatches />
        </div>

        <div className="two-column">
          <div className="section">
            <PlayerSearch />
          </div>

          <div className="section">
            <MatchesByDate />
          </div>
        </div>

        <div className="two-column">
          <div className="section">
            <TodayLeaderboard />
          </div>

          <div className="section">
            <HistoricalLeaderboard />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;