import { Box, Typography } from "@mui/material";
import React from "react";
import ListButtons from "./ListButtons";

const PageController = ({ handleSettingPages, page, numOfPages }) => {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        gap: "1rem",
        marginRight: "4rem",
      }}
    >
      <Typography variant="h5" width={"fit-content"}>
        {page} / {numOfPages}
      </Typography>
      <ListButtons handleSettingPages={handleSettingPages} />
    </Box>
  );
};

export default PageController;
