import FirstEleven from "./FirstEleven";
import Bench from "./Bench";
import PitchHeader from "./PitchHeader";
import { Box } from "@mui/material";
import { CircularProgress } from "@mui/material";
import { useDraft } from "../../../../app/customHooks";
import DraftButtons from "./DraftButtons";
import { useAppSelector } from "../../../../app/hooks";
const Pitch = ({ isLoading }: { isLoading: boolean }) => {
  const picks = useAppSelector(
    (state) => state.drafts.managerTeam[state.drafts.draftNumber].picks
  );

  function getPlannerPicksContainer() {
    return (
      <div className="planner-picks">
        <DraftButtons />
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
