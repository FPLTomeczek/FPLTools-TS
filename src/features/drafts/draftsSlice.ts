import { createSlice } from "@reduxjs/toolkit";
import { LAST_GW } from "../../constants";
import { isEmpty } from "lodash";
import {
  ManagerHistory,
  PlayerPick,
  Transfer,
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

      const blankPickFound = state.managerTeam[state.draftNumber].picks.find(
        (pick) => pick.position === position
      );
      if (blankPickFound) {
        const index =
          state.managerTeam[state.draftNumber].picks.indexOf(blankPickFound);
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
      const gameweek = state.managerTeam[state.draftNumber].gameweek;

      const newPlayer = action.payload;
      const initialPicksIDs = state.managerTeam[
        state.draftNumber
      ].initialPicksByGameweeks[gameweek].map((pick) => pick.id);

      const blankPlayerMatchRole = state.managerTeam[
        state.draftNumber
      ].picks.find(
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
            console.log("if");

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
      state.managerTeam[state.draftNumber].picks =
        state.managerTeam[state.draftNumber].picksByGameweeks[gameweek];
      state.managerTeam[state.draftNumber].gameweek = gameweek;
      state.managerTeam[state.draftNumber].validationError = {
        isError: false,
        message: "",
      };
    },
    updatePicksByGameweekAndTransfers(state, action) {
      const { picks, gameweek, transfers, initialPicksByGameweeks } =
        action.payload;
      state.managerTeam[state.draftNumber].transfersByGameweeks[gameweek] =
        transfers;

      const addedPlayers = picks.filter(
        (pick: PlayerPick) =>
          !initialPicksByGameweeks[gameweek].some(
            (initialPick: PlayerPick) => initialPick._id === pick._id
          )
      );

      state.managerTeam[state.draftNumber].addedPicksByGameweeks[gameweek] =
        addedPlayers;

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
          state.managerTeam[state.draftNumber].removedPicksByGameweeks[i] = [];
          state.managerTeam[state.draftNumber].addedPicksByGameweeks[i] = [];
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
  setData,
  removePick,
  retrievePick,
  addPick,
  makeChange,
  validatePicks,
  updatePicks,
  updatePicksByGameweekAndTransfers,
  updateDraftNumber,
} = draftSlice.actions;

export default draftSlice.reducer;
