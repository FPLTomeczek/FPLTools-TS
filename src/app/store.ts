import { configureStore, combineReducers } from "@reduxjs/toolkit";
import type { PreloadedState } from "@reduxjs/toolkit";
import draftsReducer from "../store_features/drafts/draftsSlice";
import playersReducer from "../store_features/players/playersSlice";
import fixturesReducer from "../store_features/fixtures/fixturesSlice";
import teamsReducer from "../store_features/teams/teamsSlice";
import gameweeksReducer from "../store_features/gameweeks/gameweeksSlice";

const rootReducer = combineReducers({
  drafts: draftsReducer,
  players: playersReducer,
  fixtures: fixturesReducer,
  teams: teamsReducer,
  gameweeks: gameweeksReducer,
});

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
