import ListButtons from "../buttons/ListButtons";
import { SelectFilter } from "./SelectFilter";
import { InputFilter } from "./InputFilter";
import { ListData } from "../types";
import { Filter } from "./enums";
import { usePlayersListFilters } from "./hooks/usePlayersListFilters";
import { PlayersListFiltersStyled } from "./PlayersListFilters.styled";

const PlayersListFilters = ({ handleSetPage, page, numOfPages }: ListData) => {
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
      <ListButtons
        handleSetPage={handleSetPage}
        page={page}
        numOfPages={numOfPages}
      />
    </PlayersListFiltersStyled>
  );
};

export default PlayersListFilters;
