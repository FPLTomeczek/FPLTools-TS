import FirstEleven from "./FirstEleven";
import Bench from "./Bench";
import { Box } from "@mui/material";
import { CircularProgress } from "@mui/material";
import { useDraft } from "../../../app/customHooks";
import PitchHeader from "./PitchHeader";
import GameweeksTransfersContainer from "../gameweeks_transfers/GameweeksTransfersContainer";
import Chips from "../chips/Chips";
const Pitch = ({ isLoading }: { isLoading: boolean }) => {
  const picks = useDraft("picks");

  function getPlannerPicksContainer() {
    return (
      <div className="planner-picks">
        <PitchHeader />
        <FirstEleven picks={picks.slice(0, 11)} />
        <Bench picks={picks.slice(11, 15)} />
        <Chips />
        <div className="gameweek-transfer-container-planner-picks">
          <GameweeksTransfersContainer />
        </div>
      </div>
    );
  }

  return (
    <Box sx={{ display: "flex", gap: "2rem", alignItems: "center" }}>
      {isLoading ? (
        <CircularProgress sx={{ color: "var(--secondary-color)" }} />
      ) : (
        getPlannerPicksContainer()
      )}
    </Box>
  );
};

export default Pitch;
