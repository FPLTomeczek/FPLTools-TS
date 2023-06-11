import React, { useState } from "react";
import {
  Select,
  MenuItem,
  TextField,
  FormControl,
  Box,
  FormLabel,
  Input,
} from "@mui/material";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { filterPlayers } from "../../../../features/players/playersSlice";
import { teamsList, roles } from "./data";
import PageController from "./PageController";
import { FilterOptions } from "../interfaces/players";
import { SelectChangeEvent } from "@mui/material";
import { ListProps } from "../types/list";
import ListButtons from "./ListButtons";

enum Filter {
  NAME = "name",
  TEAM = "team",
  ROLE = "role",
}

const PlayersListForm = ({ setPage, page, numOfPages }: ListProps) => {
  const dispatch = useDispatch();

  const [filterValues, setFilterValues] = useState<FilterOptions>({
    name: "",
    team: "ALL",
    role: "ALL",
  });

  const handleSelectOnChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>,
    type: Filter
  ) => {
    const value = e.target.value as string;
    setPage(1);
    setFilterValues({ ...filterValues, [type]: value });

    switch (type) {
      case "team":
        return dispatch(filterPlayers({ ...filterValues, team: value }));
      case "name":
        return dispatch(filterPlayers({ ...filterValues, name: value }));
      case "role":
        return dispatch(filterPlayers({ ...filterValues, role: value }));
      default:
        break;
    }
  };

  return (
    <Wrapper>
      <Box
        sx={{
          display: "flex",
          gap: "1rem",
          alignItems: "start",
          flexDirection: "column",
        }}
      >
        <input
          id="name"
          name="name"
          placeholder="Enter Player Name"
          value={filterValues.name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleSelectOnChange(e, Filter.NAME)
          }
        />

        <Box sx={{ display: "flex", gap: "1rem" }}>
          <div className="filter-players">
            <label htmlFor="team">Team</label>
            <select
              id="team"
              name="team"
              value={filterValues.team}
              onChange={(e) => handleSelectOnChange(e, Filter.TEAM)}
              data-testid="select-button"
            >
              <option value="ALL">-</option>
              {teamsList.map((team) => (
                <option value={team.value} key={team.value}>
                  {team.value}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-players">
            <label htmlFor="role">Role</label>
            <select
              id="role"
              name="role"
              value={filterValues.role}
              onChange={(e) => handleSelectOnChange(e, Filter.ROLE)}
            >
              <option value="ALL">-</option>
              {roles.map((role) => (
                <option value={role.role} key={role.role}>
                  {role.value}
                </option>
              ))}
            </select>
          </div>
        </Box>
      </Box>
      <ListButtons setPage={setPage} page={page} numOfPages={numOfPages} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: end;
  .filter-players {
    display: flex;
    flex-direction: column;
  }
`;

export default PlayersListForm;
