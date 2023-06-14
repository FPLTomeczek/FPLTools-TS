import { CURRENT_GW, LAST_GW } from "../../constants";
import {
  ManagerHistory,
  PlayerPick,
  Transfer,
} from "../../components/features/transfer_planner/interfaces/drafts";

export interface PicksByGameweeks {
  [gameweek: number]: PlayerPick[];
}

export interface TransfersByGameweeks {
  [gameweek: number]: number;
}

export interface RemovedPicksByGameweeks {
  [gameweek: number]: PlayerPick[];
}

export interface InitialPicksByGameweeks {
  [gameweek: number]: PlayerPick[];
}

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
  bank: number;
  removedPicksByGameweeks: RemovedPicksByGameweeks;
  playerToChange: PlayerPick | Record<string, never>;
  managerHistory: ManagerHistory;
  transfersHistory: Transfer[];
  validationError: ValidationError;
}

export const storage = {
  drafts: localStorage.getItem("drafts"),
  initDraft: localStorage.getItem("initDraft"),
};

const initializePicksByGameweeks = (picks: PlayerPick[]) => {
  const picksByGameweeks: PicksByGameweeks = [];
  for (let i = CURRENT_GW; i <= LAST_GW; i++) {
    picksByGameweeks[i] = picks;
  }
  return picksByGameweeks;
};

const initializeTransfersByGameweeks = (managerHistory: ManagerHistory) => {
  const transfersByGameweeks: TransfersByGameweeks = [];

  transfersByGameweeks[CURRENT_GW] =
    managerHistory.current[CURRENT_GW - 2].event_transfers > 0 ? 1 : 2;

  for (let i = CURRENT_GW; i < LAST_GW; i++) {
    transfersByGameweeks[i + 1] = transfersByGameweeks[i] < 1 ? 1 : 2;
  }

  return transfersByGameweeks;
};

const initializeRemovedPicksByGameweeks = () => {
  const removedPicksByGameweeks: RemovedPicksByGameweeks = [];
  for (let i = CURRENT_GW; i <= LAST_GW; i++) {
    removedPicksByGameweeks[i] = [];
  }
  return removedPicksByGameweeks;
};

export const initialManagerTeamState: ManagerTeamState = {
  picks: [],
  picksByGameweeks: [],
  transfersByGameweeks: [],
  initialPicksByGameweeks: [],
  gameweek: CURRENT_GW,
  bank: 0,
  removedPicksByGameweeks: initializeRemovedPicksByGameweeks(),
  playerToChange: {},
  managerHistory: { current: [], past: [], chips: [] },
  transfersHistory: [],
  validationError: { isError: false, message: "" },
};

export function setManagerTeam(
  picks: PlayerPick[],
  managerHistory: ManagerHistory,
  transfersHistory: Transfer[]
) {
  const managerTeam: ManagerTeamState = {
    picks,
    picksByGameweeks: initializePicksByGameweeks(picks),
    transfersByGameweeks: initializeTransfersByGameweeks(managerHistory),
    initialPicksByGameweeks: initializePicksByGameweeks(picks),
    gameweek: CURRENT_GW,
    bank: managerHistory.current[CURRENT_GW - 2].bank,
    removedPicksByGameweeks: initializeRemovedPicksByGameweeks(),
    playerToChange: {},
    managerHistory,
    transfersHistory,
    validationError: { isError: false, message: "" },
  };

  return managerTeam;
}
