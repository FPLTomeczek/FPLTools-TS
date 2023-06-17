import { PlayerPick, Transfer } from "./interfaces/drafts";
import { ensure } from "../../helper/helper";
import { PlayerHistory } from "./interfaces/players";

export function roleToIndex(role: string) {
  switch (role) {
    case "GK":
      return 0;
    case "DEF":
      return 1;
    case "MID":
      return 2;
    case "FWD":
      return 3;
    default:
      break;
  }
}

export const assignPositionsToPlayers = (
  positionObjects: {
    position: number;
    element: number;
  }[],
  playerObjects: PlayerPick[]
) => {
  const ids = positionObjects.map((element) => {
    return element.element;
  });

  const players = playerObjects.map((player) => {
    return { ...player, position: ids.indexOf(player.id) };
  });
  return players;
};

export const calculateSellingCost = (
  players: PlayerPick[],
  transfers: Transfer[],
  playersHistory: PlayerHistory[]
) => {
  const playersSellCost = players.map((player) => {
    const { id } = player;

    let element_in_cost;

    const transfer = transfers.find((transfer) => transfer.element_in === id);
    if (typeof transfer === "undefined") {
      element_in_cost = ensure(
        playersHistory.find((player) => player.id === id)
      ).cost_history[0];
    } else {
      element_in_cost = transfer.element_in_cost;
    }

    const now_cost = ensure(
      players.find((player) => player.id === id)
    ).now_cost;

    const sell_cost =
      now_cost > element_in_cost
        ? Math.floor((now_cost - element_in_cost) / 2 + element_in_cost)
        : now_cost;
    return sell_cost;
  });
  return playersSellCost;
};

export const splittingPicksByRoles = (picks: PlayerPick[]) => {
  const splittedPicks = picks.reduce(
    (accumulator: Array<Array<PlayerPick>>, value: PlayerPick) => {
      const index = roleToIndex(value.element_type);
      if (typeof index !== "undefined") {
        if (accumulator[index] === undefined) {
          accumulator[index] = [value];
        } else {
          accumulator[index] = [...accumulator[index], value];
        }
      }
      return accumulator;
    },
    []
  );
  return splittedPicks;
};
