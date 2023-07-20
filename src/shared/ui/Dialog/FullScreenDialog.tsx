import {
  AppBar,
  Button,
  Dialog,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Toolbar,
} from "@mui/material";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";
import { styled as MuiStyled } from "@mui/material/styles";

import { Transition } from "./Transition";

const DialogStyled = MuiStyled(Dialog)(() => ({
  "& .MuiPaper-root": {
    backgroundColor: "var(--primary-color)",
  },

  "& .MuiListItem-root": {
    display: "flex",
    justifyContent: "center",
    color: "#ffffff",
  },
}));

export const FullScreenDialog = ({
  listItems,
}: {
  listItems: { url: string; name: string }[];
}) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <Button
        variant="contained"
        onClick={handleClickOpen}
        sx={{ backgroundColor: "var(--secondary-color)" }}
      >
        <FormatListBulletedIcon sx={{ color: "black" }} />
      </Button>
      <DialogStyled
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar
          sx={{
            position: "relative",
          }}
        >
          <Toolbar sx={{ backgroundColor: "var(--secondary-color)" }}>
            <IconButton edge="start" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <List>
          {listItems.map((li) => {
            return (
              <ListItem key={li.name}>
                <Button>
                  <Link to={li.url} onClick={handleClose}>
                    <ListItemText primary={li.name} />
                  </Link>
                </Button>
              </ListItem>
            );
          })}
        </List>
      </DialogStyled>
    </div>
  );
};
