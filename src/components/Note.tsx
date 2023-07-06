import { Paper, Typography } from "@mui/material";

const Note = ({ text }: { text: string }) => {
  return (
    <Paper
      elevation={3}
      sx={{ maxWidth: "50vw", padding: "1rem", marginBottom: "1rem" }}
    >
      <Typography>
        <b>Note: </b>
        {text}
      </Typography>
    </Paper>
  );
};

export default Note;
