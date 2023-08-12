import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";

import { useAppDispatch } from "./store/hooks";
import {
  fetchPlayers,
  fetchPlayersHistory,
} from "./store_features/players/playersSlice";
import { fetchFixtures } from "./store_features/fixtures/fixturesSlice";
import { fetchTeams } from "./store_features/teams/teamsSlice";
import { fetchGameweeks } from "./store_features/gameweeks/gameweeksSlice";
import AppRoutes from "./Routes";
import { ThemeProvider } from "./shared/theme/ThemeProvider";

function App() {
  const dispatch = useAppDispatch();

  // TODO: FIX THIS
  useEffect(() => {
    dispatch(fetchPlayers());
    dispatch(fetchPlayersHistory());
    dispatch(fetchFixtures());
    dispatch(fetchTeams());
    dispatch(fetchGameweeks());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <ThemeProvider>
        <AppRoutes />
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
