import { CircularProgress } from "@mui/material";

const Loading = () => {
  return (
    <div className="loading-container">
      <CircularProgress sx={{ color: "var(--secondary-color)" }} />
    </div>
  );
};

export default Loading;
