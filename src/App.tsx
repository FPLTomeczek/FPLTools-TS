import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import TransferPlanner from "./pages/TransferPlanner";
import PlayerRankings from "./pages/PlayerRankings";
import { useAppDispatch } from "./store/hooks";
import {
  fetchPlayers,
  fetchPlayersHistory,
} from "./store_features/players/playersSlice";
import { fetchFixtures } from "./store_features/fixtures/fixturesSlice";
import { fetchTeams } from "./store_features/teams/teamsSlice";
import Error from "./pages/Error";
import Navbar from "./layouts/components/Navbar";
import Calendar from "./pages/Calendar";
import { fetchGameweeks } from "./store_features/gameweeks/gameweeksSlice";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchPlayers());
    dispatch(fetchPlayersHistory());
    dispatch(fetchFixtures());
    dispatch(fetchTeams());
    dispatch(fetchGameweeks());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<TransferPlanner />} />
        <Route path="/player-rankings" element={<PlayerRankings />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
