import MainPage from "./pages/MainPage";
import { useEffect } from "react";
import { useAppDispatch } from "./app/hooks";
import {
  fetchPlayers,
  fetchPlayersHistory,
} from "./features/players/playersSlice";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchPlayers());
    dispatch(fetchPlayersHistory());
  }, []);

  return (
    <>
      <MainPage />
    </>
  );
}

export default App;
