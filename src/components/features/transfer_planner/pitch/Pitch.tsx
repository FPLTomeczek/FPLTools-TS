import FirstEleven from "./FirstEleven";
import Bench from "./Bench";
import PitchHeader from "./PitchHeader";
import { Box } from "@mui/material";
import { useAppSelector } from "../../../../app/hooks";
import { CircularProgress } from "@mui/material";
import { useState } from "react";
import { CURRENT_GW } from "../../../../constants";
const Pitch = ({ isLoading }: { isLoading: boolean }) => {
  const managerTeam = useAppSelector((state) => state.managerTeam);
  const picks = managerTeam.picks;

  function getPlannerPicksContainer() {
    return (
      <div className="planner-picks">
        <PitchHeader />
        <FirstEleven picks={picks.slice(0, 11)} />
        <Bench picks={picks.slice(11, 15)} />
      </div>
    );
  }

  return (
    <Box sx={{ display: "flex", gap: "2rem", alignItems: "center" }}>
      {isLoading ? <CircularProgress /> : getPlannerPicksContainer()}
    </Box>
  );
};

export default Pitch;
