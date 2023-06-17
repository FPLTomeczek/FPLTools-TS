import TransferPlanner from "./pages/TransferPlanner";
import { useEffect } from "react";
import { useAppDispatch } from "./app/hooks";
import {
  fetchPlayers,
  fetchPlayersHistory,
} from "./store_features/players/playersSlice";
import { fetchFixtures } from "./store_features/fixtures/fixturesSlice";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchPlayers());
    dispatch(fetchPlayersHistory());
    dispatch(fetchFixtures());
  }, []);

  return (
    <>
      <TransferPlanner />
    </>
  );
}

export default App;
