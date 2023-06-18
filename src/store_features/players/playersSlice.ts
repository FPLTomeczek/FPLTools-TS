import {
  createSlice,
  createAsyncThunk,
  isAnyOf,
  PayloadAction,
} from "@reduxjs/toolkit";
import { axiosInstance } from "../../utils";
import {
  Player,
  PlayerHistory,
  FilterOptions,
  SortOptions,
} from "../../features/transfer_planner/interfaces/players";

interface PlayersSlice {
  playersList: Player[];
  playersHistory: PlayerHistory[];
  status: string;
  error: string | null;
  filterOptions: FilterOptions;
  sortOptions: SortOptions;
}

const initialState: PlayersSlice = {
  playersList: [],
  playersHistory: [],
  status: "idle",
  error: null,
  filterOptions: { name: "", team: "ALL", role: "ALL" },
  sortOptions: { type: "price", value: "desc" },
};

export const fetchPlayers = createAsyncThunk(
  "players/fetchPlayers",
  async () => {
    const response = await axiosInstance.get("/players");
    return response.data.players;
  }
);

export const fetchPlayersHistory = createAsyncThunk(
  "players/fetchPlayersHistory",
  async () => {
    const response = await axiosInstance.get("/players-history");
    return response.data.players;
  }
);

const playersSlice = createSlice({
  name: "players",
  initialState,
  reducers: {
    filterPlayers(state, action: PayloadAction<FilterOptions>) {
      state.filterOptions = action.payload;
    },
    sortPlayers(state, action: PayloadAction<SortOptions>) {
      state.sortOptions = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(
        fetchPlayers.fulfilled,
        (state, action: PayloadAction<Player[]>) => {
          state.playersList = action.payload;
        }
      )
      .addCase(
        fetchPlayersHistory.fulfilled,
        (state, action: PayloadAction<PlayerHistory[]>) => {
          state.playersHistory = action.payload;
        }
      )
      .addMatcher(
        isAnyOf(fetchPlayers.fulfilled, fetchPlayersHistory.fulfilled),
        (state) => {
          state.status = "success";
        }
      )
      .addMatcher(
        isAnyOf(fetchPlayers.rejected, fetchPlayersHistory.rejected),
        (state, action) => {
          state.status = "failed";
          if (typeof action.error.message === "string") {
            state.error = action.error.message;
          } else {
            state.error = "undefined error";
          }
        }
      )
      .addMatcher(
        isAnyOf(fetchPlayers.pending, fetchPlayersHistory.pending),
        (state) => {
          state.status = "loading";
        }
      );
  },
});

export const { filterPlayers, sortPlayers } = playersSlice.actions;

export default playersSlice.reducer;
