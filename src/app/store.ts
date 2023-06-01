import { configureStore } from "@reduxjs/toolkit";
import managerTeamReducer from "../features/managerTeam/managerTeamSlice";
import playersReducer from "../features/players/playersSlice";

const store = configureStore({
  reducer: {
    managerTeam: managerTeamReducer,
    players: playersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
