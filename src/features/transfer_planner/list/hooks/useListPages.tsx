import { useState } from "react";
import {
  filterPlayers,
  paginate,
  sortPlayers,
} from "../../../../shared/helper/filterPlayers";
import { sortPlayers as sortPlayersSlice } from "../../../../store_features/players/playersSlice";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import {
  Player,
  SortOptions,
} from "../../../../store_features/players/players";
import { Direction } from "../../../../shared/ui/Buttons/enums/direction";

export const useListPages = () => {
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

  const dispatch = useAppDispatch();

  const handleSortChange = (sortOptions: SortOptions) => {
    dispatch(sortPlayersSlice({ ...sortOptions }));
  };

  const handleSetPage = (direction: Direction) => {
    switch (direction) {
      case Direction.FIRST:
        setPage(1);
        break;
      case Direction.PREV:
        setPage((prev) => {
          if (prev > 1) {
            return prev - 1;
          }
          return prev;
        });
        break;
      case Direction.NEXT:
        setPage((prev) => {
          if (prev < numOfPages) {
            return prev + 1;
          }
          return prev;
        });
        break;
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
    handleSortChange,
  };
};
