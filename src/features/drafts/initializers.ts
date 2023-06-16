import { CURRENT_GW, LAST_GW } from "../../constants";
import {
  ManagerHistory,
  PlayerPick,
} from "../../components/features/transfer_planner/interfaces/drafts";

export interface DataByGameweeks {
  [gameweek: number]: {
    picksByGameweeks: PlayerPick[];
    transfersByGameweeks: number;
    initialPicksByGameweeks: PlayerPick[];
    removedPicksByGameweeks: PlayerPick[];
    addedPicksByGameweeks: PlayerPick[];
    chipByGameweeks: string;
  };
}

type ValidationError = {
  isError: boolean;
  message: string;
};

export interface ManagerTeamState {
  picks: PlayerPick[];
  gameweek: number;
  bank: number;
  playerToChange: PlayerPick | Record<string, never>;
  dataByGameweeks: DataByGameweeks;
  validationError: ValidationError;
}

export const storage = {
  drafts: localStorage.getItem("drafts"),
  initDraft: localStorage.getItem("initDraft"),
  managerHistory: localStorage.getItem("managerHistory"),
};

const initializeDataByGameweeks = (
  picks: PlayerPick[],
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
  playerToChange: {},
  dataByGameweeks: [],
  validationError: { isError: false, message: "" },
};

export function setManagerTeam(
  picks: PlayerPick[],
  managerHistory: ManagerHistory
) {
  const managerTeam: ManagerTeamState = {
    picks,
    gameweek: CURRENT_GW,
    bank: managerHistory.current[CURRENT_GW - 2].bank,
    playerToChange: {},
    dataByGameweeks: initializeDataByGameweeks(picks, managerHistory),
    validationError: { isError: false, message: "" },
  };

  return managerTeam;
}
