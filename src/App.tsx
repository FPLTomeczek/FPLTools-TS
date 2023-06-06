import MainPage from "./pages/MainPage";
import { useEffect } from "react";
import { useAppDispatch } from "./app/hooks";
import {
  fetchPlayers,
  fetchPlayersHistory,
} from "./features/players/playersSlice";
import { fetchFixtures } from "./features/fixtures/fixturesSlice";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchPlayers());
    dispatch(fetchPlayersHistory());
    dispatch(fetchFixtures());
  }, []);

  return (
    <>
      <MainPage />
    </>
  );
}

export default App;
