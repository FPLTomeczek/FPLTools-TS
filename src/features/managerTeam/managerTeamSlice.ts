import { createSlice } from "@reduxjs/toolkit";
import { CURRENT_GW } from "../../constants";
import { isEmpty } from "lodash";
import {
  PlayerPick,
  playerBlankTemplate,
  ManagerHistory,
  Transfer,
} from "../../components/features/transfer_planner/interfaces/managerTeam";

const storage = {
  fetchedPlayers: localStorage.getItem("fetchedPlayers"),
  managerHistory: localStorage.getItem("managerHistory"),
  transfersHistory: localStorage.getItem("transfersHistory"),
};

type ValidationError = {
  isError: boolean;
  message: string;
};

interface PicksByGameweeks {
  [gameweek: number]: PlayerPick[];
}

interface ManagerTeamState {
  picks: PlayerPick[];
  picksByGameweeks: PicksByGameweeks;
  initialPicks: PlayerPick[];
  value: number;
  bank: number;
  transfers: number;
  removedPicks: PlayerPick[];
  playerToChange: PlayerPick | Record<string, never>;
  managerHistory: ManagerHistory;
  transfersHistory: Transfer[];
  validationError: ValidationError;
}

const initialState: ManagerTeamState = {
  picks:
    typeof storage.fetchedPlayers === "string"
      ? JSON.parse(storage.fetchedPlayers)
      : [],
  picksByGameweeks: [],
  initialPicks:
    typeof storage.fetchedPlayers === "string"
      ? JSON.parse(storage.fetchedPlayers)
      : [],
  value: 0,
  bank:
    typeof storage.managerHistory === "string"
      ? JSON.parse(storage.managerHistory).current[CURRENT_GW - 2].bank
      : 0,
  transfers:
    typeof storage.managerHistory === "string"
      ? JSON.parse(storage.managerHistory).current[CURRENT_GW - 2]
          .event_transfers > 0
        ? 1
        : 2
      : 1,
  removedPicks: [],
  playerToChange: {},
  managerHistory:
    typeof storage.managerHistory === "string"
      ? JSON.parse(storage.managerHistory)
      : [],
  transfersHistory:
    typeof storage.transfersHistory === "string"
      ? JSON.parse(storage.transfersHistory)
      : [],
  validationError: { isError: false, message: "" },
};

const managerTeamSlice = createSlice({
  name: "managerTeam",
  initialState,
  reducers: {
    addPicks(state, action) {
      state.picks = action.payload;
      state.picksByGameweeks[35] = action.payload;
    },
    addManagerHistory(state, action) {
      state.managerHistory = action.payload;
      state.bank = action.payload.current[CURRENT_GW - 2].bank;
      state.transfers =
        action.payload.current[CURRENT_GW - 2].event_transfers > 0 ? 1 : 2;
    },
    addTransfersHistory(state, action) {
      state.transfersHistory = action.payload;
    },
    removePick(state, action) {
      const { id, position, element_type, sellCost = 0, cost } = action.payload;

      if (!isEmpty(state.playerToChange) && state.playerToChange.id === id) {
        state.playerToChange = {};
      }

      const playerToRemove = state.picks.find(
        (pick) => pick.id === id
      ) as PlayerPick;

      const removedPickIndex = state.picks.indexOf(playerToRemove);

      if (state.initialPicks.find((initialPick) => initialPick.id === id)) {
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
        ...playerBlankTemplate,
        web_name: "Blank",
        element_type,
        position,
        removedPickIndex,
      };
    },
    retrievePick(state, action) {
      const position = action.payload;
      const retrievedPick = state.removedPicks.find(
        (removedPick) => removedPick.position === position
      ) as PlayerPick;

      const blankPick = state.picks.find((pick) => pick.position === position);
      if (blankPick) {
        const index = state.picks.indexOf(blankPick);
        state.picks[index] = { ...retrievedPick };
        const removedPickIndex = state.removedPicks.indexOf(retrievedPick);
        state.removedPicks.splice(removedPickIndex, 1);
        state.bank -= retrievedPick.sellCost;
        state.transfers += 1;
      }
    },
    addPick(state, action) {
      const newPlayer = action.payload;
      const blankPlayerMatch = state.picks.find(
        (pick) =>
          pick.element_type === newPlayer.element_type &&
          pick.web_name == "Blank"
      );
      if (blankPlayerMatch) {
        const position = blankPlayerMatch.position;
        if (typeof blankPlayerMatch.removedPickIndex === "number") {
          state.picks[blankPlayerMatch.removedPickIndex] = {
            ...newPlayer,
            position,
          };
          state.bank -= newPlayer.now_cost;
        }
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
        state.picks[index] = state.playerToChange as PlayerPick;
        state.playerToChange = {};
        return;
      }
      state.playerToChange = state.picks[index];
    },
    validatePicks(state, action) {
      const { isError, message } = action.payload;
      if (isError) {
        Object.assign(state, {
          ...initialState,
          validationError: { isError, message },
        });
      }
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
  validatePicks,
} = managerTeamSlice.actions;

export default managerTeamSlice.reducer;
