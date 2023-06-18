import { CURRENT_GW, LAST_GW } from "../../constants";
import {
  ManagerHistory,
  Pick,
} from "../../features/transfer_planner/interfaces/drafts";

export interface DataByGameweeks {
  [gameweek: number]: {
    picksByGameweeks: Pick[];
    transfersByGameweeks: number;
    initialPicksByGameweeks: Pick[];
    removedPicksByGameweeks: Pick[];
    addedPicksByGameweeks: Pick[];
    chipByGameweeks: string;
  };
}

type ValidationError = {
  isError: boolean;
  message: string;
};

export interface ManagerTeamState {
  picks: Pick[];
  gameweek: number;
  bank: number;
  pickToChange: Pick | Record<string, never>;
  dataByGameweeks: DataByGameweeks;
  validationError: ValidationError;
}

export const storage = {
  drafts: localStorage.getItem("drafts"),
  initDraft: localStorage.getItem("initDraft"),
  managerHistory: localStorage.getItem("managerHistory"),
};

const initializeDataByGameweeks = (
  picks: Pick[],
  managerHistory: ManagerHistory
) => {
  let transferAmount =
    managerHistory.current[CURRENT_GW - 2].event_transfers > 0 ? 1 : 2;

  const dataByGameweeks: DataByGameweeks = [];

  for (let i = CURRENT_GW; i <= LAST_GW; i++) {
    dataByGameweeks[i] = {
      picksByGameweeks: picks,
      initialPicksByGameweeks: picks,
      removedPicksByGameweeks: [],
      addedPicksByGameweeks: [],
      transfersByGameweeks: transferAmount,
      chipByGameweeks: "",
    };
    transferAmount = 2;
  }
  return dataByGameweeks;
};

export const initialManagerTeamState: ManagerTeamState = {
  picks: [],
  gameweek: CURRENT_GW,
  bank: 0,
  pickToChange: {},
  dataByGameweeks: [],
  validationError: { isError: false, message: "" },
};

export function setManagerTeam(picks: Pick[], managerHistory: ManagerHistory) {
  const managerTeam: ManagerTeamState = {
    picks,
    gameweek: CURRENT_GW,
    bank: managerHistory.current[CURRENT_GW - 2].bank,
    pickToChange: {},
    dataByGameweeks: initializeDataByGameweeks(picks, managerHistory),
    validationError: { isError: false, message: "" },
  };

  return managerTeam;
}
