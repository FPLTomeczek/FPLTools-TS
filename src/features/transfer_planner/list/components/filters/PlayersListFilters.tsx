import { SelectFilter } from "./SelectFilter";
import { InputFilter } from "./InputFilter";
import { Filter } from "./enums";
import { usePlayersListFilters } from "./hooks/usePlayersListFilters";
import { PlayersListFiltersStyled } from "./PlayersListFilters.styled";
import { Direction } from "../../../../../shared/ui/Buttons/enums/direction";

const PlayersListFilters = ({
  handleSetPage,
}: {
  handleSetPage: (direction: Direction) => void;
}) => {
  const { filterValues, handleChangeEvent } =
    usePlayersListFilters(handleSetPage);

  return (
    <PlayersListFiltersStyled>
      <div className="filters-container">
        <div className="input-filters-container">
          <InputFilter
            filter={Filter.NAME}
            filterValues={filterValues}
            handleChangeEvent={handleChangeEvent}
          />
        </div>
        <div className="select-filters-container">
          <SelectFilter
            filter={Filter.TEAM}
            filterValues={filterValues}
            handleChangeEvent={handleChangeEvent}
          />
          <SelectFilter
            filter={Filter.ROLE}
            filterValues={filterValues}
            handleChangeEvent={handleChangeEvent}
          />
        </div>
      </div>
    </PlayersListFiltersStyled>
  );
};

export default PlayersListFilters;
