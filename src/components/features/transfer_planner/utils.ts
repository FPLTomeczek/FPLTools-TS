import { axiosInstance } from "../../../utils";

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

export const assignPositionsToPlayers = (positionObjects, playerObjects) => {
  const ids = positionObjects.map((element) => {
    return element.element;
  });

  const players = playerObjects.map((player) => {
    return { ...player, position: ids.indexOf(player.id) };
  });
  return players;
};

export const calculateSellingCost = (players, transfers) => {
  const playersSellCost = players.map((player) => {
    const { id } = player;
    const transfer = transfers.find((transfer) => transfer.element_in === id);
    const element_in_cost = transfer.element_in_cost;
    const now_cost = players.find((player) => player.id === id).now_cost;
    const sell_cost =
      now_cost > element_in_cost
        ? Math.floor((now_cost - element_in_cost) / 2 + element_in_cost)
        : now_cost;
    return sell_cost;
  });
  return playersSellCost;
};
