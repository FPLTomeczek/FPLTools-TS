import { CURRENT_GW, LAST_GW } from "../../../shared/utils/constants";
import { ManagerHistory, Pick } from "../interfaces/drafts";

export interface DataByGameweek {
  picksByGameweek: Pick[];
  transfersByGameweek: number;
  initialPicksByGameweek: Pick[];
  removedPicksByGameweek: Pick[];
  addedPicksByGameweek: Pick[];
  chipByGameweek: string;
}

export type ValidationError = {
  isError: boolean;
  message: string;
};

export interface ManagerTeamState {
  picks: Pick[];
  gameweek: number;
  bank: number;
  pickToChange: Pick | Record<string, never>;
  dataByGameweeks: DataByGameweek[];
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

  const dataByGameweeks: DataByGameweek[] = [];

  for (let i = CURRENT_GW; i <= LAST_GW; i++) {
    dataByGameweeks[i] = {
      picksByGameweek: picks,
      initialPicksByGameweek: picks,
      removedPicksByGameweek: [],
      addedPicksByGameweek: [],
      transfersByGameweek: transferAmount,
      chipByGameweek: "",
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
