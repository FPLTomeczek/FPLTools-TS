import { CURRENT_GW } from "../../../../constants";
import { Box, Typography, Button } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { validatePicks as picksValidation } from "../validation/managerPicksValidations";
import { PlayerPick } from "../interfaces/managerTeam";
import { validatePicks } from "../../../../features/managerTeam/managerTeamSlice";

const PitchHeader = () => {
  const managerTeam = useAppSelector((state) => state.managerTeam);
  const bank = managerTeam.bank;
  const transfers = managerTeam.transfers;

  const dispatch = useAppDispatch();

  const validateSaveTeam = (picks: PlayerPick[], bankValue: number) => {
    const { isError, message } = picksValidation(picks, bankValue);
    dispatch(validatePicks({ isError, message }));
  };

  return (
    <div>
      <Box sx={{ display: "flex", justifyContent: "center" }} mb={2}>
        <Button
          variant="contained"
          size="medium"
          onClick={() => validateSaveTeam(managerTeam.picks, managerTeam.bank)}
        >
          Save Team
        </Button>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6" component="h3">
          Gameweek: {CURRENT_GW + 1}
        </Typography>
        <Typography variant="h6" component="h3">
          Bank: {(bank / 10).toFixed(1)} £
        </Typography>
        <Typography variant="h6" component="h3">
          {" "}
          Transfers: {transfers}/2
        </Typography>
      </Box>
    </div>
  );
};

export default PitchHeader;
