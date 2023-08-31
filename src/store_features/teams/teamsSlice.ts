import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { axiosInstance } from "../../shared/utils/config/axiosConfig";

export type TeamFixture = {
  opponent: string;
  difficulty: number;
  isHome: boolean;
  event: number;
};

interface Team {
  id: number;
  name: string;
  fixtures: TeamFixture[];
}

interface TeamsSlice {
  teamsList: Team[];
}

const initialState: TeamsSlice = {
  teamsList: [],
};

export const fetchTeams = createAsyncThunk("teams/fetchTeams", async () => {
  const response = await axiosInstance.get("/teams");
  return response.data.teams;
});

const teamsSlice = createSlice({
  name: "teams",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(
      fetchTeams.fulfilled,
      (state, action: PayloadAction<Team[]>) => {
        state.teamsList = action.payload;
      }
    );
  },
});

export default teamsSlice.reducer;
