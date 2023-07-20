import { ROLES } from "../../../../../shared/utils/data/rolesData";
import { TEAMS_LIST } from "../../../../../shared/utils/data/teamsData";
import { Filter } from "./enums";
import { FilterProps } from "./types";

export const SelectFilter = ({
  filter,
  filterValues,
  handleChangeEvent,
}: FilterProps) => {
  return (
    <div className="player-list-filter">
      <label htmlFor={`${filter}`}>{filter}</label>
      <select
        id={`${filter}`}
        name={`${filter}`}
        value={filterValues[filter]}
        onChange={(e) => handleChangeEvent(e, filter)}
      >
        <option value="ALL">-</option>
        {filter === Filter.TEAM &&
          TEAMS_LIST.map((team) => (
            <option value={team.name} key={team.name}>
              {team.name}
            </option>
          ))}
        {filter === Filter.ROLE &&
          ROLES.map((role) => (
            <option value={role.role} key={role.role}>
              {role.value}
            </option>
          ))}
      </select>
    </div>
  );
};
