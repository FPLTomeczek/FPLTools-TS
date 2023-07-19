import { Direction } from "../ui/Buttons/enums/direction";
import {
  Player,
  PlayerFilters,
  PlayerRankingsFilters,
  SortOptions,
} from "../../store_features/players/players";

export const filterPlayers = <T extends PlayerFilters>(
  players: Player[],
  filters: T
) => {
  return players
    .filter((player) => {
      if (filters.team === "ALL") {
        return true;
      }
      return player.team === filters.team;
    })
    .filter((player) => {
      if (filters.name === "") {
        return true;
      }
      return player.web_name
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]|/g, "")
        .replace(/\u0142/g, "l")
        .includes(
          filters.name
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]|/g, "")
            .replace(/\u0142/g, "l")
        );
    })
    .filter((player) => {
      if (filters.role === "ALL") {
        return true;
      }
      return player.element_type === filters.role;
    })
    .filter((player) => {
      if ("price" in filters && "probability" in filters) {
        const playerFilters = filters as PlayerRankingsFilters;
        return player.now_cost <= playerFilters.price;
      }
      return true;
    });
};

export const sortPlayers = (players: Player[], sortOptions: SortOptions) => {
  return players.sort((playerA, playerB) => {
    if (sortOptions.type === "points") {
      return sortOptions.value === "desc"
        ? playerB.total_points - playerA.total_points
        : playerA.total_points - playerB.total_points;
    } else if (sortOptions.type === "price") {
      return sortOptions.value === "desc"
        ? playerB.now_cost - playerA.now_cost
        : playerA.now_cost - playerB.now_cost;
    } else {
      return 0;
    }
  });
};

export const paginate = (list: Player[]) => {
  const divider = 20;
  const numOfPages =
    list.length % divider === 0
      ? list.length / divider
      : Math.ceil(list.length / divider);

  const pagesData = [];

  for (let i = 0; i < numOfPages; i++) {
    pagesData.push(list.slice(i * divider, divider * (i + 1)));
  }

  return { pagesData, numOfPages };
};

export const handleSettingPages = (
  setPage: React.Dispatch<React.SetStateAction<number>>,
  type: Direction,
  numOfPages: number
) => {
  switch (type) {
    case Direction.FIRST:
      return setPage(1);
    case Direction.PREV:
      return setPage((prev) => {
        if (prev > 1) {
          return prev - 1;
        }
        return prev;
      });
    case Direction.NEXT:
      return setPage((prev) => {
        if (prev < numOfPages) {
          return prev + 1;
        }
        return prev;
      });
    case Direction.LAST:
      return setPage(numOfPages);
    default:
      break;
  }
};
