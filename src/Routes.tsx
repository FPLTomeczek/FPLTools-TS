import { Routes, Route } from "react-router-dom";

import DefaultLayout from "./layouts/DefaultLayout";
import TransferPlanner from "./pages/TransferPlanner";
import PlayerRankings from "./pages/PlayerRankings";
import Calendar from "./pages/Calendar";
import Error from "./pages/Error";

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <DefaultLayout>
            <TransferPlanner />
          </DefaultLayout>
        }
      />
      <Route
        path="/player-rankings"
        element={
          <DefaultLayout>
            <PlayerRankings />
          </DefaultLayout>
        }
      />
      <Route
        path="/calendar"
        element={
          <DefaultLayout>
            <Calendar />
          </DefaultLayout>
        }
      />
      <Route
        path="*"
        element={
          <DefaultLayout>
            <Error />
          </DefaultLayout>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
