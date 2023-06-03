import { Box, Typography } from "@mui/material";
import ListButtons from "./ListButtons";
import { ListProps } from "../types/list";

const PageController = ({ setPage, page, numOfPages }: ListProps) => {
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
      <ListButtons setPage={setPage} numOfPages={numOfPages} />
    </Box>
  );
};

export default PageController;
