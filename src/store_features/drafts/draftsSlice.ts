import { createSlice } from "@reduxjs/toolkit";
import { LAST_GW } from "../../constants";
import { isEmpty } from "lodash";
import {
  ManagerHistory,
  Pick,
  playerBlankTemplate,
} from "../../features/transfer_planner/interfaces/drafts";
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

      if (draft.pickToChange.id === id) {
        draft.pickToChange = {};
      }

      const pickToRemove = draft.picks.find((pick) => pick.id === id) as Pick;

      const removedPickIndex = draft.picks.indexOf(pickToRemove);

      if (
        draft.dataByGameweeks[draft.gameweek].initialPicksByGameweeks.find(
          (initialPick) => initialPick.id === id
        )
      ) {
        if (
          draft.dataByGameweeks[draft.gameweek].chipByGameweeks !== "wildcard"
        ) {
          draft.dataByGameweeks[draft.gameweek].transfersByGameweeks -= 1;
        }

        draft.dataByGameweeks[draft.gameweek].removedPicksByGameweeks.push({
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
      const position = action.payload;
      const draft = state.managerTeam[state.draftNumber];

      const retrievedPickByGameweek = draft.dataByGameweeks[
        draft.gameweek
      ].removedPicksByGameweeks.find(
        (removedPick) => removedPick.position === position
      ) as Pick;

      const blankPickFound = draft.picks.find(
        (pick) => pick.position === position
      );
      if (blankPickFound) {
        const index = draft.picks.indexOf(blankPickFound);
        draft.picks[index] = {
          ...retrievedPickByGameweek,
        };
        const removedPicksByGameweeksIndex = draft.dataByGameweeks[
          draft.gameweek
        ].removedPicksByGameweeks.indexOf(retrievedPickByGameweek);
        draft.dataByGameweeks[draft.gameweek].removedPicksByGameweeks.splice(
          removedPicksByGameweeksIndex,
          1
        );

        draft.bank -=
          typeof retrievedPickByGameweek.sellCost !== "undefined"
            ? retrievedPickByGameweek.sellCost
            : retrievedPickByGameweek.now_cost;

        draft.dataByGameweeks[draft.gameweek].transfersByGameweeks += 1;
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
          draft.picks[blankPlayerMatchRole.removedPickIndex] = {
            ...newPlayer,
            position,
          };
          if (initialPicksIDs.includes(newPlayer.id)) {
            draftSlice.caseReducers.retrievePick(state, {
              payload: position,
              type: "retrieve_pick",
            });
          } else {
            draft.bank -= newPlayer.now_cost;
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

      if (!isEmpty(draft.pickToChange)) {
        const pickToChangeIndex = draft.picks
          .map((pick) => pick.id)
          .indexOf(draft.pickToChange.id);
        draft.picks[pickToChangeIndex] = draft.picks[index];
        draft.picks[index] = draft.pickToChange as Pick;
        draft.pickToChange = {};
        return;
      }
      draft.pickToChange = draft.picks[index];
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

      const draft = state.managerTeam[state.draftNumber];
      const dataByGameweek =
        state.managerTeam[state.draftNumber].dataByGameweeks[gameweek];

      draft.picks = dataByGameweek.picksByGameweeks;
      draft.gameweek = gameweek;
      draft.validationError = {
        isError: false,
        message: "",
      };
    },
    updatePicksByGameweekAndTransfers(state, action) {
      const { picks, gameweek, transfers, initialPicksByGameweeks } =
        action.payload;

      const draft = state.managerTeam[state.draftNumber];

      const dataByGameweek =
        state.managerTeam[state.draftNumber].dataByGameweeks[gameweek];

      dataByGameweek.transfersByGameweeks = transfers;

      const addedPlayers = picks.filter(
        (pick: Pick) =>
          !initialPicksByGameweeks.some(
            (initialPick: Pick) => initialPick._id === pick._id
          )
      );

      dataByGameweek.addedPicksByGameweeks = addedPlayers;

      // console.log(
      //   draft.dataByGameweeks[gameweek].picksByGameweeks.filter(
      //     (pick) => !picks.includes(pick)
      //   )
      // );

      const arr = dataByGameweek.picksByGameweeks;
      console.log(arr);
      console.log(picks);

      // update state after transfer
      for (let i = gameweek; i <= LAST_GW; i++) {
        draft.dataByGameweeks[i].picksByGameweeks = picks;
        if (i != LAST_GW) {
          draft.dataByGameweeks[i + 1].transfersByGameweeks =
            draft.dataByGameweeks[i].transfersByGameweeks < 1 ? 1 : 2;
        }
        if (i != gameweek) {
          draft.dataByGameweeks[i].initialPicksByGameweeks = picks;
          draft.dataByGameweeks[i].removedPicksByGameweeks = [];
          draft.dataByGameweeks[i].addedPicksByGameweeks = [];
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
