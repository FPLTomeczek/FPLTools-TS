import { createSlice } from "@reduxjs/toolkit";
import { CURRENT_GW, LAST_GW } from "../../constants";
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
import { Chip } from "../../features/transfer_planner/chips/chipsEnums";

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
        draft.dataByGameweeks[draft.gameweek].initialPicksByGameweek.find(
          (initialPick) => initialPick.id === id
        )
      ) {
        const chip = draft.dataByGameweeks[draft.gameweek].chipByGameweek;
        if (chip !== Chip.WILDCARD && chip !== Chip.FREE_HIT) {
          draft.dataByGameweeks[draft.gameweek].transfersByGameweek -= 1;
        }

        draft.dataByGameweeks[draft.gameweek].removedPicksByGameweek.push({
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
      ].removedPicksByGameweek.find(
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
        const removedPicksByGameweekIndex = draft.dataByGameweeks[
          draft.gameweek
        ].removedPicksByGameweek.indexOf(retrievedPickByGameweek);
        draft.dataByGameweeks[draft.gameweek].removedPicksByGameweek.splice(
          removedPicksByGameweekIndex,
          1
        );

        draft.bank -=
          typeof retrievedPickByGameweek.sellCost !== "undefined"
            ? retrievedPickByGameweek.sellCost
            : retrievedPickByGameweek.now_cost;

        const chip = draft.dataByGameweeks[draft.gameweek].chipByGameweek;
        if (chip !== Chip.WILDCARD && Chip.FREE_HIT) {
          draft.dataByGameweeks[draft.gameweek].transfersByGameweek += 1;
        }
      }
    },
    addPick(state, action) {
      const draft = state.managerTeam[state.draftNumber];
      const dataByGameweeks =
        state.managerTeam[state.draftNumber].dataByGameweeks[
          state.managerTeam[state.draftNumber].gameweek
        ];

      const newPlayer = action.payload;
      const initialPicksIDs = dataByGameweeks.initialPicksByGameweek.map(
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
    updateGameweeks(state, action) {
      const gameweek = action.payload;

      const draft = state.managerTeam[state.draftNumber];
      const dataByGameweeks =
        state.managerTeam[state.draftNumber].dataByGameweeks[gameweek];

      draft.picks = dataByGameweeks.picksByGameweek;
      draft.gameweek = gameweek;
      draft.validationError = {
        isError: false,
        message: "",
      };
    },
    updatePicksByGameweekAndTransfers(state, action) {
      const { picks, gameweek, transfers, initialPicksByGameweek } =
        action.payload;

      const draft = state.managerTeam[state.draftNumber];

      const dataByGameweeks =
        state.managerTeam[state.draftNumber].dataByGameweeks[gameweek];

      dataByGameweeks.transfersByGameweek = transfers;

      const addedPlayers = picks.filter(
        (pick: Pick) =>
          !initialPicksByGameweek.some(
            (initialPick: Pick) => initialPick._id === pick._id
          )
      );

      dataByGameweeks.addedPicksByGameweek = addedPlayers;

      // console.log(
      //   draft.dataByGameweeks[gameweek].picksByGameweek.filter(
      //     (pick) => !picks.includes(pick)
      //   )
      // );

      //update state after freeHit
      if (draft.dataByGameweeks[gameweek].chipByGameweek === Chip.FREE_HIT) {
        draft.dataByGameweeks[gameweek].picksByGameweek = picks;
      }
      // update state after transfer
      else {
        for (let i = gameweek; i <= LAST_GW; i++) {
          draft.dataByGameweeks[i].picksByGameweek = picks;
          if (i != LAST_GW) {
            const chip = draft.dataByGameweeks[i].chipByGameweek;

            draft.dataByGameweeks[i + 1].transfersByGameweek =
              draft.dataByGameweeks[i].transfersByGameweek < 1 ||
              chip === Chip.WILDCARD ||
              chip === Chip.FREE_HIT
                ? 1
                : 2;
          }
          if (i != gameweek) {
            draft.dataByGameweeks[i].initialPicksByGameweek = picks;
            draft.dataByGameweeks[i].removedPicksByGameweek = [];
            draft.dataByGameweeks[i].addedPicksByGameweek = [];
          }
        }
      }
      localStorage.setItem("drafts", JSON.stringify(state.managerTeam));
    },
    updateDraftNumber(state, action) {
      state.draftNumber = action.payload;
    },
    setChip(state, action: { payload: { chipName: string }; type: string }) {
      const draft = state.managerTeam[state.draftNumber];
      const dataByGameweek = draft.dataByGameweeks[draft.gameweek];
      const { chipName } = action.payload;

      if (!chipName) {
        //TODO: transferAmount
        let transferAmount = dataByGameweek.transfersByGameweek;
        //reset state from this GW
        const picks =
          draft.gameweek === CURRENT_GW
            ? state.initManagerTeam.picks
            : draft.dataByGameweeks[draft.gameweek - 1].picksByGameweek;
        for (let i = draft.gameweek; i <= LAST_GW; i++) {
          draft.picks = picks;
          if (i === draft.gameweek + 1) transferAmount === 1;
          draft.dataByGameweeks[i] = {
            picksByGameweek: picks,
            initialPicksByGameweek: picks,
            removedPicksByGameweek: [],
            addedPicksByGameweek: [],
            transfersByGameweek: transferAmount,
            chipByGameweek: "",
          };
          transferAmount = 2;
        }
      } else {
        dataByGameweek.chipByGameweek = chipName;
      }
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
  updateGameweeks,
  updatePicksByGameweekAndTransfers,
  updateDraftNumber,
  setChip,
} = draftSlice.actions;

export default draftSlice.reducer;
