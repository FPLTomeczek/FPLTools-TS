import { createSlice } from "@reduxjs/toolkit";
import { CURRENT_GW, LAST_GW } from "../../constants";
import { isEmpty } from "lodash";
import {
  PlayerPick,
  playerBlankTemplate,
  ManagerHistory,
  Transfer,
} from "../../components/features/transfer_planner/interfaces/managerTeam";
import {
  PicksByGameweeks,
  TransfersByGameweeks,
  InitialPicksByGameweeks,
  RemovedPicksByGameweeks,
  storage,
  initializeInitialPicksByGameweeks,
  initializePicksByGameweeks,
  initializeRemovedPicksByGameweeks,
  initializeTransfersByGameweeks,
} from "./initializers";

type ValidationError = {
  isError: boolean;
  message: string;
};

export interface ManagerTeamState {
  picks: PlayerPick[];
  picksByGameweeks: PicksByGameweeks;
  transfersByGameweeks: TransfersByGameweeks;
  initialPicksByGameweeks: InitialPicksByGameweeks;
  gameweek: number;
  value: number;
  bank: number;
  removedPicksByGameweeks: RemovedPicksByGameweeks;
  playerToChange: PlayerPick | Record<string, never>;
  managerHistory: ManagerHistory;
  transfersHistory: Transfer[];
  validationError: ValidationError;
}

interface Draft {
  managerTeam: ManagerTeamState[];
  draftNumber: number;
}

const initialManagerTeamState: ManagerTeamState = {
  picks:
    typeof storage.fetchedPlayers === "string"
      ? JSON.parse(storage.fetchedPlayers)
      : [],
  picksByGameweeks: initializePicksByGameweeks(),
  transfersByGameweeks: initializeTransfersByGameweeks(),
  initialPicksByGameweeks: initializeInitialPicksByGameweeks(),
  gameweek: CURRENT_GW,
  value: 0,
  bank:
    typeof storage.managerHistory === "string"
      ? JSON.parse(storage.managerHistory).current[CURRENT_GW - 2].bank
      : 0,
  removedPicksByGameweeks: initializeRemovedPicksByGameweeks(),
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

const initialState: Draft = {
  managerTeam: [initialManagerTeamState, initialManagerTeamState],
  draftNumber: 0,
};

const draftSlice = createSlice({
  name: "draftTeam",
  initialState,
  reducers: {
    addPicks(state, action) {
      Object.assign(state, {
        ...initialState,
      });
      state.managerTeam[state.draftNumber].picks = action.payload;
    },
    addManagerHistory(state, action) {
      state.managerTeam[state.draftNumber].managerHistory = action.payload;
      state.managerTeam[state.draftNumber].bank =
        action.payload.current[CURRENT_GW - 2].bank;
    },
    addTransfersHistory(state, action) {
      state.managerTeam[state.draftNumber].transfersHistory = action.payload;
    },
    removePick(state, action) {
      const { id, position, element_type, sellCost = 0, cost } = action.payload;

      if (
        !isEmpty(state.managerTeam[state.draftNumber].playerToChange) &&
        state.managerTeam[state.draftNumber].playerToChange.id === id
      ) {
        state.managerTeam[state.draftNumber].playerToChange = {};
      }

      const playerToRemove = state.managerTeam[state.draftNumber].picks.find(
        (pick) => pick.id === id
      ) as PlayerPick;

      const removedPickIndex =
        state.managerTeam[state.draftNumber].picks.indexOf(playerToRemove);

      if (
        state.managerTeam[state.draftNumber].initialPicksByGameweeks[
          state.managerTeam[state.draftNumber].gameweek
        ].find((initialPick) => initialPick.id === id)
      ) {
        state.managerTeam[state.draftNumber].transfersByGameweeks[
          state.managerTeam[state.draftNumber].gameweek
        ] -= 1;

        state.managerTeam[state.draftNumber].removedPicksByGameweeks[
          state.managerTeam[state.draftNumber].gameweek
        ].push({
          ...state.managerTeam[state.draftNumber].picks[removedPickIndex],
          removedPickIndex,
        });
      }

      state.managerTeam[state.draftNumber].bank +=
        sellCost !== 0 ? sellCost : cost;

      state.managerTeam[state.draftNumber].picks[removedPickIndex] = {
        ...playerBlankTemplate,
        web_name: "Blank",
        element_type,
        position,
        removedPickIndex,
      };
    },
    retrievePick(state, action) {
      const position = action.payload;

      const retrievedPickByGameweek = state.managerTeam[
        state.draftNumber
      ].removedPicksByGameweeks[
        state.managerTeam[state.draftNumber].gameweek
      ].find((removedPick) => removedPick.position === position) as PlayerPick;

      const blankPick = state.managerTeam[state.draftNumber].picks.find(
        (pick) => pick.position === position
      );
      if (blankPick) {
        const index =
          state.managerTeam[state.draftNumber].picks.indexOf(blankPick);
        state.managerTeam[state.draftNumber].picks[index] = {
          ...retrievedPickByGameweek,
        };
        const removedPicksByGameweeksIndex = state.managerTeam[
          state.draftNumber
        ].removedPicksByGameweeks[
          state.managerTeam[state.draftNumber].gameweek
        ].indexOf(retrievedPickByGameweek);
        state.managerTeam[state.draftNumber].removedPicksByGameweeks[
          state.managerTeam[state.draftNumber].gameweek
        ].splice(removedPicksByGameweeksIndex, 1);
        state.managerTeam[state.draftNumber].bank -=
          typeof retrievedPickByGameweek.sellCost !== "undefined"
            ? retrievedPickByGameweek.sellCost
            : retrievedPickByGameweek.now_cost;

        state.managerTeam[state.draftNumber].transfersByGameweeks[
          state.managerTeam[state.draftNumber].gameweek
        ] += 1;
      }
    },
    addPick(state, action) {
      const newPlayer = action.payload;
      const initialPicksIDs = state.managerTeam[
        state.draftNumber
      ].picksByGameweeks[state.managerTeam[state.draftNumber].gameweek].map(
        (pick) => pick.id
      );

      const blankPlayerMatch = state.managerTeam[state.draftNumber].picks.find(
        (pick) =>
          pick.element_type === newPlayer.element_type &&
          pick.web_name == "Blank"
      );
      if (blankPlayerMatch) {
        const position = blankPlayerMatch.position;
        if (typeof blankPlayerMatch.removedPickIndex === "number") {
          state.managerTeam[state.draftNumber].picks[
            blankPlayerMatch.removedPickIndex
          ] = {
            ...newPlayer,
            position,
          };
          state.managerTeam[state.draftNumber].bank -= newPlayer.now_cost;
          if (initialPicksIDs.includes(newPlayer.id)) {
            state.managerTeam[state.draftNumber].transfersByGameweeks[
              state.managerTeam[state.draftNumber].gameweek
            ] += 1;
          }
        }
      }
    },
    makeChange(state, action) {
      const id = action.payload;
      const index = state.managerTeam[state.draftNumber].picks
        .map((pick) => pick.id)
        .indexOf(id);

      if (!isEmpty(state.managerTeam[state.draftNumber].playerToChange)) {
        const playerToChangeIndex = state.managerTeam[state.draftNumber].picks
          .map((pick) => pick.id)
          .indexOf(state.managerTeam[state.draftNumber].playerToChange.id);
        state.managerTeam[state.draftNumber].picks[playerToChangeIndex] =
          state.managerTeam[state.draftNumber].picks[index];
        state.managerTeam[state.draftNumber].picks[index] = state.managerTeam[
          state.draftNumber
        ].playerToChange as PlayerPick;
        state.managerTeam[state.draftNumber].playerToChange = {};
        return;
      }
      state.managerTeam[state.draftNumber].playerToChange =
        state.managerTeam[state.draftNumber].picks[index];
    },
    validatePicks(state, action) {
      const { isError, message } = action.payload;
      if (isError) {
        Object.assign(state.managerTeam[state.draftNumber], {
          ...initialManagerTeamState,
          validationError: { isError, message },
        });
      } else {
        state.managerTeam[state.draftNumber].validationError = {
          isError,
          message,
        };
      }
    },
    updatePicks(state, action) {
      const gameweek = action.payload;
      state.managerTeam[state.draftNumber].picks =
        state.managerTeam[state.draftNumber].picksByGameweeks[gameweek];
      state.managerTeam[state.draftNumber].gameweek = gameweek;
      state.managerTeam[state.draftNumber].validationError = {
        isError: false,
        message: "",
      };
    },
    updatePicksByGameweekAndTransfers(state, action) {
      const { picks, gameweek, transfers } = action.payload;
      state.managerTeam[state.draftNumber].transfersByGameweeks[gameweek] =
        transfers;
      for (let i = gameweek; i <= LAST_GW; i++) {
        state.managerTeam[state.draftNumber].picksByGameweeks[i] = picks;
        if (i != LAST_GW) {
          state.managerTeam[state.draftNumber].transfersByGameweeks[i + 1] =
            state.managerTeam[state.draftNumber].transfersByGameweeks[i] < 1
              ? 1
              : 2;
        }
        if (i != gameweek) {
          state.managerTeam[state.draftNumber].initialPicksByGameweeks[i] =
            picks;
        }
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
  updatePicks,
  updatePicksByGameweekAndTransfers,
} = draftSlice.actions;

export default draftSlice.reducer;
