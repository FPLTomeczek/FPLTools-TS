import { ensure } from "../../../../shared/helper/ensure";
import {
  Pick,
  Transfer,
} from "../../../../store_features/drafts/interfaces/drafts";
import { PlayerHistory } from "../../../../store_features/players/players";

export const assignPositionsToPlayers: (
  positionObjects: {
    position: number;
    element: number;
  }[],
  playerObjects: Pick[]
) => Pick[] = (positionObjects, playerObjects) => {
  const ids = positionObjects.map((element) => {
    return element.element;
  });

  const players = playerObjects.map((player) => {
    return { ...player, position: ids.indexOf(player.id) };
  });
  return players;
};

export const calculateSellingCost = (
  players: Pick[],
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
