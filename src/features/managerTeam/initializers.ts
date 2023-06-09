import { CURRENT_GW, LAST_GW } from "../../constants";
import { PlayerPick } from "../../components/features/transfer_planner/interfaces/managerTeam";

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

export const storage = {
  fetchedPlayers: localStorage.getItem("fetchedPlayers"),
  managerHistory: localStorage.getItem("managerHistory"),
  transfersHistory: localStorage.getItem("transfersHistory"),
};

export const initializePicksByGameweeks = () => {
  const picksByGameweeks: PicksByGameweeks = [];
  for (let i = CURRENT_GW; i <= LAST_GW; i++) {
    if (typeof storage.fetchedPlayers === "string") {
      picksByGameweeks[i] = JSON.parse(storage.fetchedPlayers);
    } else {
      return [];
    }
  }
  return picksByGameweeks;
};

export const initializeTransfersByGameweeks = () => {
  const transfersByGameweeks: TransfersByGameweeks = [];

  transfersByGameweeks[CURRENT_GW] =
    typeof storage.managerHistory === "string"
      ? JSON.parse(storage.managerHistory).current[CURRENT_GW - 2]
          .event_transfers > 0
        ? 1
        : 2
      : 1;

  for (let i = CURRENT_GW; i < LAST_GW; i++) {
    transfersByGameweeks[i + 1] = transfersByGameweeks[i] < 1 ? 1 : 2;
  }

  return transfersByGameweeks;
};

export const initializeRemovedPicksByGameweeks = () => {
  const removedPicksByGameweeks: RemovedPicksByGameweeks = [];
  for (let i = CURRENT_GW; i <= LAST_GW; i++) {
    removedPicksByGameweeks[i] = [];
  }
  return removedPicksByGameweeks;
};

export const initializeInitialPicksByGameweeks = () => {
  const initialPicksByGameweeks: InitialPicksByGameweeks = [];

  for (let i = CURRENT_GW; i <= LAST_GW; i++) {
    initialPicksByGameweeks[i] =
      typeof storage.fetchedPlayers === "string"
        ? JSON.parse(storage.fetchedPlayers)
        : [];
  }

  return initialPicksByGameweeks;
};
