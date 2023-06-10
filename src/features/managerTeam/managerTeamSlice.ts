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

interface ManagerTeamState {
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

const initialState: ManagerTeamState = {
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

const managerTeamSlice = createSlice({
  name: "managerTeam",
  initialState,
  reducers: {
    addPicks(state, action) {
      Object.assign(state, {
        ...initialState,
      });
      state.picks = action.payload;
    },
    addManagerHistory(state, action) {
      state.managerHistory = action.payload;
      state.bank = action.payload.current[CURRENT_GW - 2].bank;
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

      if (
        state.initialPicksByGameweeks[state.gameweek].find(
          (initialPick) => initialPick.id === id
        )
      ) {
        state.transfersByGameweeks[state.gameweek] -= 1;

        state.removedPicksByGameweeks[state.gameweek].push({
          ...state.picks[removedPickIndex],
          removedPickIndex,
        });

        state.bank += sellCost || cost;
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

      const retrievedPickByGameweek = state.removedPicksByGameweeks[
        state.gameweek
      ].find((removedPick) => removedPick.position === position) as PlayerPick;

      const blankPick = state.picks.find((pick) => pick.position === position);
      if (blankPick) {
        const index = state.picks.indexOf(blankPick);
        state.picks[index] = { ...retrievedPickByGameweek };
        const removedPicksByGameweeksIndex = state.removedPicksByGameweeks[
          state.gameweek
        ].indexOf(retrievedPickByGameweek);
        state.removedPicksByGameweeks[state.gameweek].splice(
          removedPicksByGameweeksIndex,
          1
        );
        state.bank -=
          retrievedPickByGameweek.sellCost || retrievedPickByGameweek.now_cost;
        state.transfersByGameweeks[state.gameweek] += 1;
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
      } else {
        state.validationError = { isError, message };
      }
    },
    updatePicks(state, action) {
      const gameweek = action.payload;
      state.picks = state.picksByGameweeks[gameweek];
      state.gameweek = gameweek;
    },
    updatePicksByGameweekAndTransfers(state, action) {
      const { picks, gameweek, transfers } = action.payload;
      state.transfersByGameweeks[gameweek] = transfers;
      for (let i = gameweek; i <= LAST_GW; i++) {
        state.picksByGameweeks[i] = picks;
        if (i != LAST_GW) {
          state.transfersByGameweeks[i + 1] =
            state.transfersByGameweeks[i] < 1 ? 1 : 2;
        }
        if (i != gameweek) {
          state.initialPicksByGameweeks[i] = picks;
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
} = managerTeamSlice.actions;

export default managerTeamSlice.reducer;
