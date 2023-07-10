import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Input,
  InputLabel,
  Slide,
  Slider,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import React, { useState } from "react";
import styled from "styled-components";
import { styled as MuiStyled } from "@mui/material/styles";
import { useAppSelector } from "../../app/hooks";
import { TEAMS_LIST, ROLES } from "../transfer_planner/list/data";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DialogStyled = MuiStyled(Dialog)(() => ({
  "& .MuiDialog-container": {
    alignItems: "end",
  },
  "& .MuiDialog-paper": {
    margin: "0",
    width: "100%",
  },

  "& .MuiDialogContent-root": {
    // width: "fit-content",
  },

  "& .MuiDialogActions-root": {
    display: "flex",
    flexDirection: "column",
    alignItems: "start",
  },
}));

const Inputs = ({ type }: { type: string }) => {
  const [price, setPrice] = useState(100);

  const handlePriceChange = (event: Event, newValue: number | number[]) => {
    setPrice(newValue as number);
  };

  if (type === "probability") {
    return (
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "end" }}>
        <Box sx={{ display: "flex", gap: "0.5rem" }}>
          <InputLabel>Chance of Scoring</InputLabel>
          <Input type="radio" name="probabilities" />
        </Box>
        <Box sx={{ display: "flex", margin: "0", gap: "0.5rem" }}>
          <InputLabel>Chance of Assist</InputLabel>
          <Input type="radio" name="probabilities" />
        </Box>
      </Box>
    );
  } else if (type === "teams") {
    return (
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "end" }}>
        {TEAMS_LIST.map((team) => {
          return (
            <Box sx={{ display: "flex", margin: "0", gap: "0.5rem" }}>
              <InputLabel>{team.name}</InputLabel>
              <Input type="radio" name="teams" />
            </Box>
          );
        })}
      </Box>
    );
  } else if (type === "roles") {
    return (
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "end" }}>
        {ROLES.map((role) => {
          return (
            <Box sx={{ display: "flex", margin: "0", gap: "0.5rem" }}>
              <InputLabel>{role.value}</InputLabel>
              <Input type="radio" name="roles" />
            </Box>
          );
        })}
      </Box>
    );
  } else if (type === "price") {
    return (
      <Slider
        aria-label="Player price"
        defaultValue={50}
        value={price}
        onChange={handlePriceChange}
      />
    );
  }
  return <div>No data found</div>;
};

const PlayerRankingsFilters = () => {
  const players = useAppSelector((state) => state.players.playersList);

  const [open, setOpen] = useState(false);
  const [inputType, setInputType] = useState("");

  const handleClickOpen = (type: string) => {
    setOpen(true);
    setInputType(type);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <PlayerRankingsFiltersStyled>
      <input type="text" placeholder="Salah" />
      <button onClick={() => handleClickOpen("probability")}>
        Show: Score %
      </button>
      <DialogStyled
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        sx={{ m: 0 }}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Select Metric"}</DialogTitle>

        <DialogContent>
          <DialogActions>
            <Inputs type={inputType} />
          </DialogActions>
        </DialogContent>
      </DialogStyled>
      <button onClick={() => handleClickOpen("teams")}>Teams: All</button>
      <button onClick={() => handleClickOpen("roles")}>Roles: All</button>
      <button onClick={() => handleClickOpen("price")}>Price: All</button>
    </PlayerRankingsFiltersStyled>
  );
};

const PlayerRankingsFiltersStyled = styled.div`
  display: flex;
  gap: 0.25rem;
  overflow-x: auto;
  padding-bottom: 1rem;
  & > * {
    padding: 0.25rem 0.5rem;
    min-width: 100px;
    white-space: nowrap;
    background-color: black;
    flex-shrink: 0;
    color: white;
  }
`;

export default PlayerRankingsFilters;
