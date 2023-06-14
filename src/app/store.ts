import { configureStore } from "@reduxjs/toolkit";
import draftsReducer from "../features/drafts/draftsSlice";
import playersReducer from "../features/players/playersSlice";
import fixturesReducer from "../features/fixtures/fixturesSlice";

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
