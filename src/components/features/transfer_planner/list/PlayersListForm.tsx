import React, { useState } from "react";
import {
  Select,
  MenuItem,
  TextField,
  FormControl,
  Box,
  FormLabel,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { filterPlayers } from "../../../../features/players/playersSlice";
import { teamsList, roles } from "./data";
import PageController from "./PageController";
import { FilterOptions } from "../interfaces/players";
import { SelectChangeEvent } from "@mui/material";
import { ListProps } from "../types/list";

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
    e: SelectChangeEvent<unknown> | React.ChangeEvent<HTMLInputElement>,
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
    <Box sx={{ display: "flex", alignItems: "end" }}>
      <Box
        sx={{
          display: "flex",
          gap: "1rem",
          width: "100%",
          alignItems: "start",
          flexDirection: "column",
        }}
      >
        <FormControl>
          <TextField
            id="name"
            name="name"
            label="Name"
            value={filterValues.name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleSelectOnChange(e, Filter.NAME)
            }
          ></TextField>
        </FormControl>
        <Box sx={{ display: "flex", gap: "1rem" }}>
          <FormControl>
            <FormLabel>Team</FormLabel>
            <Select
              id="team"
              name="team"
              label="Team"
              value={filterValues.team}
              onChange={(e: SelectChangeEvent<unknown>) =>
                handleSelectOnChange(e, Filter.TEAM)
              }
              data-testid="select-button"
            >
              <MenuItem value="ALL">-</MenuItem>
              {teamsList.map((team) => (
                <MenuItem value={team.value} key={team.value}>
                  {team.value}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel>Role</FormLabel>
            <Select
              id="role"
              name="role"
              label="Role"
              value={filterValues.role}
              onChange={(e: SelectChangeEvent<unknown>) =>
                handleSelectOnChange(e, Filter.ROLE)
              }
            >
              <MenuItem value="ALL">-</MenuItem>
              {roles.map((role) => (
                <MenuItem value={role.role} key={role.role}>
                  {role.value}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Box>
      <PageController setPage={setPage} page={page} numOfPages={numOfPages} />
    </Box>
  );
};

export default PlayersListForm;
