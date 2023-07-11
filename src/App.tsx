import TransferPlanner from "./pages/TransferPlanner";
import PlayerRankings from "./pages/PlayerRankings";
import { useEffect } from "react";
import { useAppDispatch } from "./app/hooks";
import {
  fetchPlayers,
  fetchPlayersHistory,
} from "./store_features/players/playersSlice";
import { fetchFixtures } from "./store_features/fixtures/fixturesSlice";
import { fetchTeams } from "./store_features/teams/teamsSlice";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Error from "./pages/Error";
import Navbar from "./components/Navbar";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchPlayers());
    dispatch(fetchPlayersHistory());
    dispatch(fetchFixtures());
    dispatch(fetchTeams());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<TransferPlanner />} />
        <Route path="/player-rankings" element={<PlayerRankings />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
