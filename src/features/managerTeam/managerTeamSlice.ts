import { createSlice } from "@reduxjs/toolkit";
import { CURRENT_GW } from "../../constants";
import { isEmpty } from "lodash";

const initialState = {
  picks: JSON.parse(localStorage.getItem("fetchedPlayers")) || [],
  initialPicks: JSON.parse(localStorage.getItem("fetchedPlayers")),
  value: 0,
  bank:
    JSON.parse(localStorage.getItem("managerHistory")).current[CURRENT_GW - 1]
      .bank || 0,
  transfers:
    JSON.parse(localStorage.getItem("managerHistory")).current[CURRENT_GW - 1]
      .event_transfers > 0
      ? 1
      : 2 || 1,
  removedPicks: [],
  playerToChange: {},
  playersAvailableToChange: [],
  managerHistory: JSON.parse(localStorage.getItem("managerHistory")) || [],
  transfersHistory: JSON.parse(localStorage.getItem("transfersHistory")) || [],
};

const managerTeamSlice = createSlice({
  name: "managerTeam",
  initialState,
  reducers: {
    addPicks(state, action) {
      state.picks = action.payload;
    },
    addManagerHistory(state, action) {
      state.managerHistory = action.payload;
    },
    addTransfersHistory(state, action) {
      state.transfersHistory = action.payload;
    },
    removePick(state, action) {
      const { id, position, element_type, sellCost = 0, cost } = action.payload;
      const removedPickIndex = state.picks.indexOf(
        state.picks.find((pick) => pick.id === id)
      );
      console.log(removedPickIndex);
      if (!state.removedPicks.find((removedPick) => removedPick.id === id)) {
        state.transfers -= 1;
        state.removedPicks.push({
          ...state.picks[removedPickIndex],
          removedPickIndex,
        });
        state.bank += sellCost;
      } else {
        state.bank += cost;
      }
      state.picks[removedPickIndex] = {
        web_name: "Blank",
        element_type,
        position,
        removedPickIndex,
      };
    },
    retrievePick(state, action) {
      const index = action.payload;
      console.log(index);
      const retrievedPick = state.removedPicks.find(
        (removedPick) => removedPick.removedPickIndex === index
      );
      console.log(retrievedPick);
      state.picks[index] = { ...retrievedPick };
      const removedPickIndex = state.removedPicks.indexOf(retrievedPick);
      state.removedPicks.splice(removedPickIndex, 1);
      state.bank -= retrievedPick.sellCost;
      state.transfers += 1;
    },
    addPick(state, action) {
      const newPlayer = action.payload;
      const blankPlayerMatch = state.picks.find(
        (pick) =>
          pick.element_type === newPlayer.element_type &&
          pick.web_name == "Blank"
      );
      if (blankPlayerMatch) {
        state.picks[blankPlayerMatch.removedPickIndex] = {
          ...newPlayer,
        };
        state.bank -= newPlayer.now_cost;
      }
    },
    makeChange(state, action) {
      const id = action.payload;
      const index = state.picks.map((pick) => pick.id).indexOf(id);

      if (!isEmpty(state.playerToChange)) {
        const playerToChangeIndex = state.picks
          .map((pick) => pick.id)
          .indexOf(state.playerToChange.id);
        state.picks[playerToChangeIndex] = state.picks[index];
        state.picks[index] = state.playerToChange;
        state.playerToChange = {};
        return;
      }
      state.playerToChange = state.picks[index];
    },
  },
});

export const {
  addPicks,
  removePick,
  retrievePick,
  addPick,
  makeChange,
  addManagerHistory,
  addTransfersHistory,
} = managerTeamSlice.actions;

export default managerTeamSlice.reducer;
