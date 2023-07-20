import { useDispatch } from "react-redux";
import { Filter } from "../enums";
import { Direction } from "../../../../../../shared/ui/Buttons/enums/direction";
import { useState } from "react";
import { PlayerFilters } from "../../../../../../store_features/players/players";
import { filterPlayers } from "../../../../../../store_features/players/playersSlice";

export const usePlayersListFilters = (
  handleSetPage: (direction: Direction) => void
) => {
  const dispatch = useDispatch();

  const [filterValues, setFilterValues] = useState<PlayerFilters>({
    name: "",
    team: "ALL",
    role: "ALL",
  });

  const handleChangeEvent = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>,
    type: Filter
  ) => {
    const value = e.target.value as string;
    handleSetPage(Direction.FIRST);
    setFilterValues({ ...filterValues, [type]: value });

    switch (type) {
      case Filter.TEAM:
        return dispatch(filterPlayers({ ...filterValues, team: value }));
      case Filter.NAME:
        return dispatch(filterPlayers({ ...filterValues, name: value }));
      case Filter.ROLE:
        return dispatch(filterPlayers({ ...filterValues, role: value }));
      default:
        break;
    }
  };

  return {
    filterValues,
    handleChangeEvent,
  };
};
