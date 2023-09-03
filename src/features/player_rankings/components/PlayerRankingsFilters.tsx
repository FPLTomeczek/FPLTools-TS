import { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { styled as MuiStyled } from "@mui/material/styles";

import { PlayerRankingsFiltersStyled } from "./PlayerRankings.styled";
import DialogInputs from "../../../shared/ui/Dialog/dialog-inputs/DialogInputs";
import { DialogFilter } from "../enums/playerRankingsEnums";
import PlayerRankingsFilterButtons from "./PlayerRankingsFilterButtons";
import { Transition } from "../../../shared/ui/Dialog/Transition";
import { useTheme } from "../../../shared/theme/ThemeProvider";

const DialogStyled = MuiStyled(Dialog)(() => {
  const { darkMode } = useTheme();
  return {
    "@media screen and (max-width: 480px)": {
      "& .MuiDialog-container": {
        alignItems: "end",
      },
    },
    "& .MuiDialog-paper": {
      margin: "0",
      width: "100%",
      backgroundColor: darkMode ? "var(--primary-color)" : "#ffffff",
      color: darkMode ? "#ffffff" : "#000000",
    },
    "& .MuiDialogActions-root": {
      display: "flex",
      flexDirection: "column",
      alignItems: "start",
      justifyContent: "center",
    },
    "& .MuiButton-text": {
      color: darkMode ? "var(--secondary-color)" : "var(--primary-color)",
    },
  };
});

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
        <div
          className="dialog-header"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <DialogTitle>
            {typeof dialogFilter !== "undefined"
              ? dialogFilter?.charAt(0).toUpperCase() + dialogFilter?.slice(1)
              : "NONE"}
          </DialogTitle>
          <DialogActions>
            <Button onClick={handleClose}>Close</Button>
          </DialogActions>
        </div>
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
