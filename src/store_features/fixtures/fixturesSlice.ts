import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

import { axiosInstance } from "../../shared/utils/config/axiosConfig";
import { Fixture } from "../../features/transfer_planner/fixtures/interfaces/fixtures";

export const fetchFixtures = createAsyncThunk(
  "fixtures/fetchFixtures",
  async () => {
    const response = await axiosInstance.get("/fixtures");
    return response.data;
  }
);

interface FixturesSlice {
  fixtureList: Fixture[];
  isError: boolean;
  isLoading: boolean;
}

const initialState: FixturesSlice = {
  fixtureList: [],
  isError: false,
  isLoading: false,
};

const fixturesSlice = createSlice({
  name: "fixtures",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(
        fetchFixtures.fulfilled,
        (state, action: PayloadAction<Fixture[]>) => {
          state.fixtureList = action.payload;
        }
      )
      .addCase(fetchFixtures.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchFixtures.rejected, (state) => {
        state.isError = true;
      });
  },
});

export default fixturesSlice.reducer;
