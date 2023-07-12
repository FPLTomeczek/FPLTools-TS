import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import React, { useState } from "react";
import { styled as MuiStyled } from "@mui/material/styles";
import { PlayerRankingsFiltersStyled } from "./PlayerRankings.styled";
import DialogInputs from "./dialog-inputs/DialogInputs";
import { DialogFilter } from "./enums/playerRankingsEnums";
import PlayerRankingsFilterButtons from "./PlayerRankingsFilterButtons";

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
    backgroundColor: "var(--primary-color)",
    color: "white",
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

  const handleOpenDialog = (dialogFilter: DialogFilter) => {
    setOpen(true);
    setDialogFilter(dialogFilter);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <PlayerRankingsFiltersStyled>
      <PlayerRankingsFilterButtons handleOpenDialog={handleOpenDialog} />
      <DialogStyled
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        sx={{ m: 0 }}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>
          {typeof dialogFilter !== "undefined"
            ? dialogFilter?.charAt(0).toUpperCase() + dialogFilter?.slice(1)
            : "NONE"}
        </DialogTitle>

        <DialogContent>
          <DialogActions>
            <DialogInputs dialogFilter={dialogFilter} />
          </DialogActions>
        </DialogContent>
      </DialogStyled>
    </PlayerRankingsFiltersStyled>
  );
};

export default PlayerRankingsFilters;
