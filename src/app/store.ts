import { configureStore } from "@reduxjs/toolkit";
import managerTeamReducer from "../features/managerTeam/managerTeamSlice";
import playersReducer from "../features/players/playersSlice";
import fixturesReducer from "../features/fixtures/fixturesSlice";

const store = configureStore({
  reducer: {
    managerTeam: managerTeamReducer,
    players: playersReducer,
    fixtures: fixturesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
