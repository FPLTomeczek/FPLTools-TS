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
import { useTheme } from "../../theme/ThemeProvider";

const DialogStyled = MuiStyled(Dialog)(() => {
  const { darkMode } = useTheme();
  return {
    "& .MuiPaper-root": {
      backgroundColor: darkMode ? "var(--primary-color)" : "#ffffff",
    },

    "& .MuiListItem-root": {
      display: "flex",
      justifyContent: "center",
    },

    "& a": {
      transition: "color 0.3s ease-out",
      color: darkMode ? "#ffffff" : "#000000",
    },

    "& a:hover": {
      color: "var(--secondary-color)",
    },

    ".list-item-navbar-active": {
      color: darkMode ? "var(--secondary-color-light)" : "#b77601",
    },
  };
});

export const FullScreenDialog = ({
  listItems,
  activePage,
  handleSettingActivePage,
}: {
  listItems: { url: string; name: string }[];
  activePage: string;
  handleSettingActivePage: (name: string) => void;
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
        aria-label="open navbar"
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
                <Button onClick={() => handleSettingActivePage(li.name)}>
                  <Link to={li.url} onClick={handleClose}>
                    <ListItemText
                      primary={li.name}
                      className={`${
                        activePage === li.name ? "list-item-navbar-active" : ""
                      }`}
                    />
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
