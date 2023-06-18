import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { filterPlayers } from "../../../store_features/players/playersSlice";
import { TEAMS_LIST, ROLES } from "./data";
import { FilterOptions } from "../interfaces/players";
import { ListData } from "../interfaces/list";
import ListButtons from "../buttons/ListButtons";
import { PlayersListFiltersStyled } from "./List.styled";

enum Filter {
  NAME = "name",
  TEAM = "team",
  ROLE = "role",
}

const PlayersListFilters = ({ setPage, page, numOfPages }: ListData) => {
  const dispatch = useDispatch();

  const [filterValues, setFilterValues] = useState<FilterOptions>({
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
    setPage(1);
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

  return (
    <PlayersListFiltersStyled>
      <div className="filters-container">
        <input
          id="name"
          name="name"
          placeholder="Enter Player Name"
          value={filterValues.name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleChangeEvent(e, Filter.NAME)
          }
        />

        <div className="select-filters-container">
          <div className="select-filter">
            <label htmlFor="team">Team</label>
            <select
              id="team"
              name="team"
              value={filterValues.team}
              onChange={(e) => handleChangeEvent(e, Filter.TEAM)}
              data-testid="select-button"
            >
              <option value="ALL">-</option>
              {TEAMS_LIST.map((team) => (
                <option value={team.value} key={team.value}>
                  {team.value}
                </option>
              ))}
            </select>
          </div>

          <div className="select-filter">
            <label htmlFor="role">Role</label>
            <select
              id="role"
              name="role"
              value={filterValues.role}
              onChange={(e) => handleChangeEvent(e, Filter.ROLE)}
            >
              <option value="ALL">-</option>
              {ROLES.map((role) => (
                <option value={role.role} key={role.role}>
                  {role.value}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <ListButtons setPage={setPage} page={page} numOfPages={numOfPages} />
    </PlayersListFiltersStyled>
  );
};

export default PlayersListFilters;
