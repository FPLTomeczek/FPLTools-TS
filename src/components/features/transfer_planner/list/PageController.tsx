import { Box, Typography } from "@mui/material";
import ListButtons from "./ListButtons";
import { ListProps } from "../types/list";

const PageController = ({ setPage, page, numOfPages }: ListProps) => {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        alignItems: "end",
        gap: "1rem",
      }}
    >
      <Typography variant="h5" width={"fit-content"}>
        Page {page} / {numOfPages}
      </Typography>
      <ListButtons setPage={setPage} numOfPages={numOfPages} />
    </Box>
  );
};

export default PageController;
