import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import React from "react";
import styled from "styled-components";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const PlayerRankingsFilters = () => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <PlayerRankingsFiltersStyled>
      <input type="text" placeholder="Salah" />
      <button onClick={handleClickOpen}>Show: Score %</button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Use Google's location service?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Let Google help apps determine location. This means sending
            anonymous location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleClose}>Agree</Button>
        </DialogActions>
      </Dialog>
      <button>Teams: All</button>
      <button>Positions: All</button>
      <button>Price: All</button>
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
  }
`;

export default PlayerRankingsFilters;
