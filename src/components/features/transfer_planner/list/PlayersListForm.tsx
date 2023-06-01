import React from "react";
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
import { FilterOptions } from "../interfaces/player";
import { Direction, SelectChangeEvent } from "@mui/material";

enum Filter {
  NAME = "name",
  TEAM = "team",
  ROLE = "role",
}
type Props = {
  setPage: React.Dispatch<React.SetStateAction<number>>;
  page: number;
  numOfPages: number;
  handleSettingPages: (
    callback: React.Dispatch<React.SetStateAction<number>>,
    type: Direction,
    numOfPages: number
  ) => (value: React.SetStateAction<number>) => void;
};

const PlayersListForm = ({
  setPage,
  page,
  numOfPages,
  handleSettingPages,
}: Props) => {
  const dispatch = useDispatch();

  let filterValues: FilterOptions = { name: "", team: "ALL", role: "ALL" };

  const handleSelectOnChange = (
    e: SelectChangeEvent<unknown> | React.ChangeEvent<HTMLInputElement>,
    type: Filter
  ) => {
    const value = e.target.value as string;
    filterValues = { ...filterValues, [type]: value };
    setPage(1);

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
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box
        sx={{ display: "flex", gap: "1rem", width: "100%", alignItems: "end" }}
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
      <PageController
        handleSettingPages={handleSettingPages}
        page={page}
        numOfPages={numOfPages}
      />
    </Box>
  );
};

export default PlayersListForm;
