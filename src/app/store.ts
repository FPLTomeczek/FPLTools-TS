import { configureStore } from "@reduxjs/toolkit";
import draftsReducer from "../store_features/drafts/draftsSlice";
import playersReducer from "../store_features/players/playersSlice";
import fixturesReducer from "../store_features/fixtures/fixturesSlice";

const store = configureStore({
  reducer: {
    drafts: draftsReducer,
    players: playersReducer,
    fixtures: fixturesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
