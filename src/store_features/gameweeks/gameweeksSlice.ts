import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { axiosInstance } from "../../shared/utils/config/axiosConfig";

interface Gameweek {
  id: number;
  finished: boolean;
  deadline_time: string;
}

interface GameweeksSlice {
  gameweeksList: Gameweek[];
  deadline: string;
}

const initialState: GameweeksSlice = {
  gameweeksList: [],
  deadline: "",
};

export const fetchGameweeks = createAsyncThunk(
  "gameweeks/fetchGameweeks",
  async () => {
    const response = await axiosInstance.get("/gameweeks");
    return response.data;
  }
);

function getDeadline(gameweeks: Gameweek[]): string {
  for (let i = 0; i < gameweeks.length; i++) {
    if (
      gameweeks[i].finished === false &&
      new Date(gameweeks[i].deadline_time).getTime() > Date.now()
    ) {
      return gameweeks[i].deadline_time;
    }
  }
  return "";
}

const gameweeksSlice = createSlice({
  name: "gameweeks",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(
      fetchGameweeks.fulfilled,
      (state, action: PayloadAction<Gameweek[]>) => {
        const gameweeks = action.payload;
        state.gameweeksList = gameweeks;

        const deadline = getDeadline(gameweeks);
        state.deadline = deadline;
      }
    );
  },
});

export default gameweeksSlice.reducer;
