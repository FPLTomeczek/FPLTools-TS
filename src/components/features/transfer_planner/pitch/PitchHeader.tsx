import { Box, Typography, Button, Alert, IconButton } from "@mui/material";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { validatePicks as picksValidation } from "../validation/managerPicksValidations";
import { PlayerPick } from "../interfaces/managerTeam";
import {
  validatePicks,
  updatePicksByGameweekAndTransfers,
  updatePicks,
} from "../../../../features/managerTeam/managerTeamSlice";
import { Direction } from "../enums/transferPlanner";
import { CURRENT_GW, LAST_GW } from "../../../../constants";
import { isEmpty } from "lodash";

const PitchHeader = () => {
  const managerTeam = useAppSelector((state) => state.managerTeam);
  const bank = managerTeam.bank;
  const gameweek = managerTeam.gameweek;
  const transfers = managerTeam.transfersByGameweeks[gameweek];
  const picksByGameweeks = managerTeam.picksByGameweeks;

  const dispatch = useAppDispatch();

  const validateSaveTeam = (picks: PlayerPick[], bankValue: number) => {
    const { isError, message } = picksValidation(picks, bankValue, gameweek);

    dispatch(validatePicks({ isError, message }));
    if (!isError)
      dispatch(
        updatePicksByGameweekAndTransfers({
          picks: managerTeam.picks,
          gameweek,
          transfers,
        })
      );
  };

  const handleSettingGameweeks = (direction: Direction) => {
    if (direction === Direction.PREV) {
      if (gameweek - 1 >= CURRENT_GW) {
        dispatch(updatePicks(gameweek - 1));
      }
    } else if (direction === Direction.NEXT) {
      if (gameweek + 1 <= LAST_GW) {
        dispatch(updatePicks(gameweek + 1));
      }
    }
  };

  return (
    <div>
      <Box sx={{ display: "flex", justifyContent: "center" }} mb={2}>
        {managerTeam.validationError.isError ? (
          <Alert severity="error">{managerTeam.validationError.message}</Alert>
        ) : managerTeam.validationError.message !== "" ? (
          <Alert severity="success">
            {managerTeam.validationError.message}
          </Alert>
        ) : null}
        <Button
          variant="contained"
          size="medium"
          onClick={() => validateSaveTeam(managerTeam.picks, managerTeam.bank)}
          sx={{
            background: "var(--secondary-color)",
            color: "var(--primary-color)",
            fontWeight: "600",
          }}
        >
          Save Team
        </Button>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6" component="h3">
          Bank: {(bank / 10).toFixed(1)} £
        </Typography>
        <Box sx={{ display: "flex" }}>
          <IconButton
            onClick={() => handleSettingGameweeks(Direction.PREV)}
            disabled={isEmpty(picksByGameweeks)}
            sx={{ color: "white" }}
          >
            <ArrowLeftIcon />
          </IconButton>
          <Typography variant="h6" component="h3">
            Gameweek: {gameweek}
          </Typography>
          <IconButton
            onClick={() => handleSettingGameweeks(Direction.NEXT)}
            disabled={isEmpty(picksByGameweeks)}
            sx={{ color: "white" }}
          >
            <ArrowRightIcon />
          </IconButton>
        </Box>
        <Typography variant="h6" component="h3">
          {" "}
          Transfers: {transfers}/2
        </Typography>
      </Box>
    </div>
  );
};

export default PitchHeader;
