import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import React, { useContext, useState } from "react";
import { styled as MuiStyled } from "@mui/material/styles";
import { PlayerRankingsContext } from "./context/PlayerRankingsContext";
import { PlayerRankingsFiltersStyled } from "./PlayerRankings.styled";
import DialogInputs from "./dialog-inputs/DialogInputs";
import { DialogFilter } from "./enums/playerRankingsEnums";

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

  "& .MuiDialogActions-root": {
    display: "flex",
    flexDirection: "column",
    alignItems: "start",
  },
}));

const PlayerRankingsFilters = () => {
  const [open, setOpen] = useState(false);
  const [dialogFilter, setDialogFilter] = useState<DialogFilter | undefined>(
    undefined
  );
  const { playersRankingsFilters, filterPlayerRankings } = useContext(
    PlayerRankingsContext
  );

  const handleClickOpen = (dialogFilter: DialogFilter) => {
    setOpen(true);
    setDialogFilter(dialogFilter);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <PlayerRankingsFiltersStyled>
      <input
        type="text"
        placeholder="Salah"
        onChange={(e) =>
          filterPlayerRankings({
            ...playersRankingsFilters,
            name: e.target.value,
          })
        }
      />
      <button onClick={() => handleClickOpen(DialogFilter.PROBABILITY)}>
        Show: {playersRankingsFilters.probability}%
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
            <DialogInputs dialogFilter={dialogFilter} />
          </DialogActions>
        </DialogContent>
      </DialogStyled>
      <button onClick={() => handleClickOpen(DialogFilter.TEAM)}>
        Teams: {playersRankingsFilters.team}
      </button>
      <button onClick={() => handleClickOpen(DialogFilter.ROLE)}>
        Roles: {playersRankingsFilters.role}
      </button>
      <button onClick={() => handleClickOpen(DialogFilter.PRICE)}>
        Price: {playersRankingsFilters.price}
      </button>
    </PlayerRankingsFiltersStyled>
  );
};

export default PlayerRankingsFilters;
