import { useState } from "react";
import {
  filterPlayers,
  paginate,
  sortPlayers,
} from "../../../../shared/helper/filterPlayers";
import { useAppSelector } from "../../../../store/hooks";
import { Player } from "../../../../store_features/players/players";
import { Direction } from "../../../../shared/ui/Buttons/enums/direction";

const useListPages = () => {
  const [page, setPage] = useState(1);

  const players = useAppSelector((state) => state.players.playersList);
  const filters = useAppSelector((state) => state.players.playerFilters);
  const sortOptions = useAppSelector((state) => state.players.sortOptions);

  const {
    pagesData,
    numOfPages,
  }: { pagesData: Array<Array<Player>>; numOfPages: number } = paginate(
    sortPlayers(filterPlayers(players, filters), sortOptions)
  );

  const handleSetPage = (direction: Direction) => {
    switch (direction) {
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
  return {
    pagesData,
    numOfPages,
    page,
    handleSetPage,
  };
};
