import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { axiosInstance } from "../../shared/utils/axiosConfig";

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
        const deadline = gameweeks.find(
          (gw) => gw.finished === false
        )?.deadline_time;
        state.deadline = deadline ? deadline : "";
      }
    );
  },
});

export default gameweeksSlice.reducer;
