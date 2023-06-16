import { createSlice } from "@reduxjs/toolkit";
import { LAST_GW } from "../../constants";
import { isEmpty } from "lodash";
import {
  ManagerHistory,
  PlayerPick,
  playerBlankTemplate,
} from "../../components/features/transfer_planner/interfaces/drafts";
import {
  storage,
  ManagerTeamState,
  initialManagerTeamState,
  setManagerTeam,
} from "./initializers";

interface Draft {
  managerTeam: ManagerTeamState[];
  draftNumber: number;
  initManagerTeam: ManagerTeamState;
  managerHistory: ManagerHistory;
}

const initialState: Draft = {
  managerTeam:
    typeof storage.drafts === "string"
      ? JSON.parse(storage.drafts)
      : [initialManagerTeamState, initialManagerTeamState],
  draftNumber: 0,
  initManagerTeam:
    typeof storage.initDraft === "string"
      ? JSON.parse(storage.initDraft)
      : initialManagerTeamState,
  managerHistory:
    typeof storage.managerHistory === "string"
      ? JSON.parse(storage.managerHistory)
      : { current: [], past: [], chips: [] },
};

const draftSlice = createSlice({
  name: "draftTeam",
  initialState,
  reducers: {
    setData(state, action) {
      const { picks, managerHistory } = action.payload;
      const managerTeam: ManagerTeamState = setManagerTeam(
        picks,
        managerHistory
      );
      localStorage.setItem("initDraft", JSON.stringify(managerTeam));
      localStorage.setItem("managerHistory", JSON.stringify(managerHistory));
      state.managerTeam = [managerTeam, managerTeam];
      state.initManagerTeam = managerTeam;
      state.managerHistory = managerHistory;
    },
    removePick(state, action) {
      const { id, position, element_type, sellCost = 0, cost } = action.payload;
      const draft = state.managerTeam[state.draftNumber];

      if (!isEmpty(draft.playerToChange) && draft.playerToChange.id === id) {
        state.managerTeam[state.draftNumber].playerToChange = {};
      }

      const playerToRemove = draft.picks.find(
        (pick) => pick.id === id
      ) as PlayerPick;

      const removedPickIndex = draft.picks.indexOf(playerToRemove);

      if (
        draft.dataByGameweeks[draft.gameweek].initialPicksByGameweeks.find(
          (initialPick) => initialPick.id === id
        )
      ) {
        if (
          draft.dataByGameweeks[draft.gameweek].chipByGameweeks !== "wildcard"
        ) {
          state.managerTeam[state.draftNumber].dataByGameweeks[
            draft.gameweek
          ].transfersByGameweeks -= 1;
        }

        state.managerTeam[state.draftNumber].dataByGameweeks[
          draft.gameweek
        ].removedPicksByGameweeks.push({
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
      const draft = state.managerTeam[state.draftNumber];

      const retrievedPickByGameweek = state.managerTeam[
        state.draftNumber
      ].dataByGameweeks[draft.gameweek].removedPicksByGameweeks.find(
        (removedPick) => removedPick.position === position
      ) as PlayerPick;

      const blankPickFound = draft.picks.find(
        (pick) => pick.position === position
      );
      if (blankPickFound) {
        const index = draft.picks.indexOf(blankPickFound);
        draft.picks[index] = {
          ...retrievedPickByGameweek,
        };
        const removedPicksByGameweeksIndex = state.managerTeam[
          state.draftNumber
        ].dataByGameweeks[draft.gameweek].removedPicksByGameweeks.indexOf(
          retrievedPickByGameweek
        );
        draft.dataByGameweeks[draft.gameweek].removedPicksByGameweeks.splice(
          removedPicksByGameweeksIndex,
          1
        );

        state.managerTeam[state.draftNumber].bank -=
          typeof retrievedPickByGameweek.sellCost !== "undefined"
            ? retrievedPickByGameweek.sellCost
            : retrievedPickByGameweek.now_cost;

        state.managerTeam[state.draftNumber].dataByGameweeks[
          draft.gameweek
        ].transfersByGameweeks += 1;
      }
    },
    addPick(state, action) {
      const draft = state.managerTeam[state.draftNumber];
      const dataByGameweek =
        state.managerTeam[state.draftNumber].dataByGameweeks[
          state.managerTeam[state.draftNumber].gameweek
        ];

      const newPlayer = action.payload;
      const initialPicksIDs = dataByGameweek.initialPicksByGameweeks.map(
        (pick) => pick.id
      );

      const blankPlayerMatchRole = draft.picks.find(
        (pick) =>
          pick.element_type === newPlayer.element_type &&
          pick.web_name == "Blank"
      );

      if (blankPlayerMatchRole) {
        const position = blankPlayerMatchRole.position;
        if (typeof blankPlayerMatchRole.removedPickIndex === "number") {
          state.managerTeam[state.draftNumber].picks[
            blankPlayerMatchRole.removedPickIndex
          ] = {
            ...newPlayer,
            position,
          };
          if (initialPicksIDs.includes(newPlayer.id)) {
            draftSlice.caseReducers.retrievePick(state, {
              payload: position,
              type: "retrieve_pick",
            });
          } else {
            state.managerTeam[state.draftNumber].bank -= newPlayer.now_cost;
          }
        }
      }
    },
    makeChange(state, action) {
      const draft = state.managerTeam[state.draftNumber];
      const id = action.payload;
      const index = state.managerTeam[state.draftNumber].picks
        .map((pick) => pick.id)
        .indexOf(id);

      if (!isEmpty(draft.playerToChange)) {
        const playerToChangeIndex = draft.picks
          .map((pick) => pick.id)
          .indexOf(draft.playerToChange.id);
        state.managerTeam[state.draftNumber].picks[playerToChangeIndex] =
          draft.picks[index];
        state.managerTeam[state.draftNumber].picks[index] =
          draft.playerToChange as PlayerPick;
        state.managerTeam[state.draftNumber].playerToChange = {};
        return;
      }
      state.managerTeam[state.draftNumber].playerToChange = draft.picks[index];
    },
    validatePicks(state, action) {
      const { isError, message } = action.payload;
      if (isError) {
        Object.assign(state.managerTeam[state.draftNumber], {
          ...state.initManagerTeam,
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
      const dataByGameweek =
        state.managerTeam[state.draftNumber].dataByGameweeks[gameweek];

      state.managerTeam[state.draftNumber].picks =
        dataByGameweek.picksByGameweeks;
      state.managerTeam[state.draftNumber].gameweek = gameweek;
      state.managerTeam[state.draftNumber].validationError = {
        isError: false,
        message: "",
      };
    },
    updatePicksByGameweekAndTransfers(state, action) {
      const { picks, gameweek, transfers, initialPicksByGameweeks } =
        action.payload;

      state.managerTeam[state.draftNumber].dataByGameweeks[
        gameweek
      ].transfersByGameweeks = transfers;

      const addedPlayers = picks.filter(
        (pick: PlayerPick) =>
          !initialPicksByGameweeks.some(
            (initialPick: PlayerPick) => initialPick._id === pick._id
          )
      );

      state.managerTeam[state.draftNumber].dataByGameweeks[
        gameweek
      ].addedPicksByGameweeks = addedPlayers;

      for (let i = gameweek; i <= LAST_GW; i++) {
        state.managerTeam[state.draftNumber].dataByGameweeks[
          i
        ].picksByGameweeks = picks;
        if (i != LAST_GW) {
          state.managerTeam[state.draftNumber].dataByGameweeks[
            i + 1
          ].transfersByGameweeks =
            state.managerTeam[state.draftNumber].dataByGameweeks[i]
              .transfersByGameweeks < 1
              ? 1
              : 2;
        }
        if (i != gameweek) {
          state.managerTeam[state.draftNumber].dataByGameweeks[
            i
          ].initialPicksByGameweeks = picks;
          state.managerTeam[state.draftNumber].dataByGameweeks[
            i
          ].removedPicksByGameweeks = [];
          state.managerTeam[state.draftNumber].dataByGameweeks[
            i
          ].addedPicksByGameweeks = [];
        }
      }
      localStorage.setItem("drafts", JSON.stringify(state.managerTeam));
    },
    updateDraftNumber(state, action) {
      state.draftNumber = action.payload;
    },
    setActiveChip(state, action) {
      state.managerTeam[state.draftNumber].dataByGameweeks[
        state.managerTeam[state.draftNumber].gameweek
      ].chipByGameweeks = action.payload;
    },
  },
});

export const {
  setData,
  removePick,
  retrievePick,
  addPick,
  makeChange,
  validatePicks,
  updatePicks,
  updatePicksByGameweekAndTransfers,
  updateDraftNumber,
  setActiveChip,
} = draftSlice.actions;

export default draftSlice.reducer;
