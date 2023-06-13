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

const getCurrentDraft = (state: Draft) => {
  return state.managerTeam[state.draftNumber];
};

const draftSlice = createSlice({
  name: "draftTeam",
  initialState,
  reducers: {
    addPicks(state, action) {
      const draft = getCurrentDraft(state);
      Object.assign(state, {
        ...initialState,
      });
      draft.picks = action.payload;
    },
    addManagerHistory(state, action) {
      const draft = getCurrentDraft(state);
      draft.managerHistory = action.payload;
      draft.bank = action.payload.current[CURRENT_GW - 2].bank;
    },
    addTransfersHistory(state, action) {
      const draft = getCurrentDraft(state);
      draft.transfersHistory = action.payload;
    },
    removePick(state, action) {
      const draft = getCurrentDraft(state);
      const { id, position, element_type, sellCost = 0, cost } = action.payload;

      if (!isEmpty(draft.playerToChange) && draft.playerToChange.id === id) {
        draft.playerToChange = {};
      }

      const playerToRemove = draft.picks.find(
        (pick) => pick.id === id
      ) as PlayerPick;

      const removedPickIndex = draft.picks.indexOf(playerToRemove);

      if (
        draft.initialPicksByGameweeks[draft.gameweek].find(
          (initialPick) => initialPick.id === id
        )
      ) {
        draft.transfersByGameweeks[draft.gameweek] -= 1;

        draft.removedPicksByGameweeks[draft.gameweek].push({
          ...draft.picks[removedPickIndex],
          removedPickIndex,
        });
      }

      draft.bank += sellCost !== 0 ? sellCost : cost;

      draft.picks[removedPickIndex] = {
        ...playerBlankTemplate,
        web_name: "Blank",
        element_type,
        position,
        removedPickIndex,
      };
    },
    retrievePick(state, action) {
      const draft = getCurrentDraft(state);
      const position = action.payload;

      const retrievedPickByGameweek = state.managerTeam[
        state.draftNumber
      ].removedPicksByGameweeks[draft.gameweek].find(
        (removedPick) => removedPick.position === position
      ) as PlayerPick;

      const blankPick = draft.picks.find((pick) => pick.position === position);
      if (blankPick) {
        const index = draft.picks.indexOf(blankPick);
        draft.picks[index] = {
          ...retrievedPickByGameweek,
        };
        const removedPicksByGameweeksIndex = state.managerTeam[
          state.draftNumber
        ].removedPicksByGameweeks[draft.gameweek].indexOf(
          retrievedPickByGameweek
        );
        draft.removedPicksByGameweeks[draft.gameweek].splice(
          removedPicksByGameweeksIndex,
          1
        );
        draft.bank -=
          typeof retrievedPickByGameweek.sellCost !== "undefined"
            ? retrievedPickByGameweek.sellCost
            : retrievedPickByGameweek.now_cost;

        draft.transfersByGameweeks[draft.gameweek] += 1;
      }
    },
    addPick(state, action) {
      const draft = getCurrentDraft(state);
      const newPlayer = action.payload;
      const initialPicksIDs = state.managerTeam[
        state.draftNumber
      ].picksByGameweeks[draft.gameweek].map((pick) => pick.id);

      const blankPlayerMatch = draft.picks.find(
        (pick) =>
          pick.element_type === newPlayer.element_type &&
          pick.web_name == "Blank"
      );
      if (blankPlayerMatch) {
        const position = blankPlayerMatch.position;
        if (typeof blankPlayerMatch.removedPickIndex === "number") {
          draft.picks[blankPlayerMatch.removedPickIndex] = {
            ...newPlayer,
            position,
          };
          draft.bank -= newPlayer.now_cost;
          if (initialPicksIDs.includes(newPlayer.id)) {
            draft.transfersByGameweeks[draft.gameweek] += 1;
          }
        }
      }
    },
    makeChange(state, action) {
      const draft = getCurrentDraft(state);
      const id = action.payload;
      const index = draft.picks.map((pick) => pick.id).indexOf(id);

      if (!isEmpty(draft.playerToChange)) {
        const playerToChangeIndex = draft.picks
          .map((pick) => pick.id)
          .indexOf(draft.playerToChange.id);
        draft.picks[playerToChangeIndex] = draft.picks[index];
        draft.picks[index] = state.managerTeam[state.draftNumber]
          .playerToChange as PlayerPick;
        draft.playerToChange = {};
        return;
      }
      draft.playerToChange = draft.picks[index];
    },
    validatePicks(state, action) {
      const draft = getCurrentDraft(state);
      const { isError, message } = action.payload;
      if (isError) {
        Object.assign(draft, {
          ...initialManagerTeamState,
          validationError: { isError, message },
        });
      } else {
        draft.validationError = {
          isError,
          message,
        };
      }
    },
    updatePicks(state, action) {
      const draft = getCurrentDraft(state);
      const gameweek = action.payload;
      draft.picks = draft.picksByGameweeks[gameweek];
      draft.gameweek = gameweek;
      draft.validationError = {
        isError: false,
        message: "",
      };
    },
    updatePicksByGameweekAndTransfers(state, action) {
      const draft = getCurrentDraft(state);
      const { picks, gameweek, transfers } = action.payload;
      draft.transfersByGameweeks[gameweek] = transfers;
      for (let i = gameweek; i <= LAST_GW; i++) {
        draft.picksByGameweeks[i] = picks;
        if (i != LAST_GW) {
          draft.transfersByGameweeks[i + 1] =
            draft.transfersByGameweeks[i] < 1 ? 1 : 2;
        }
        if (i != gameweek) {
          draft.initialPicksByGameweeks[i] = picks;
        }
      }
      localStorage.setItem("drafts", JSON.stringify(state.managerTeam));
    },
    updateDraftNumber(state, action) {
      state.draftNumber = action.payload;
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
  updateDraftNumber,
} = draftSlice.actions;

export default draftSlice.reducer;
