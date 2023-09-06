import { Routes, Route, Navigate } from "react-router-dom";

import DefaultLayout from "./layouts/DefaultLayout";
import TransferPlanner from "./pages/TransferPlanner";
import PlayerRankings from "./pages/PlayerRankings";
import Calendar from "./pages/Calendar";
import Error from "./pages/Error";
import News from "./pages/News";
import SingleNews from "./pages/SingleNews";
import Login from "./pages/Login";
import Register from "./pages/Register";

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
        path="/news"
        element={
          <DefaultLayout>
            <News />
          </DefaultLayout>
        }
      />
      <Route
        path="/news/:id"
        element={
          <DefaultLayout>
            <SingleNews />
          </DefaultLayout>
        }
      />
      <Route
        path="/login"
        element={
          localStorage.getItem("token") ? (
            <Navigate to="/" />
          ) : (
            <DefaultLayout>
              <Login />
            </DefaultLayout>
          )
        }
      />
      <Route
        path="/register"
        element={
          localStorage.getItem("token") ? (
            <Navigate to="/" />
          ) : (
            <DefaultLayout>
              <Register />
            </DefaultLayout>
          )
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
