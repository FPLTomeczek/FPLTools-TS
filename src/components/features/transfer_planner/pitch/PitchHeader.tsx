import { Box, Typography, Button, Alert, IconButton } from "@mui/material";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { validatePicks as picksValidation } from "../validation/managerPicksValidations";
import { PlayerPick } from "../interfaces/managerTeam";
import {
  validatePicks,
  updatePicksByGameweek,
  updatePicks,
} from "../../../../features/managerTeam/managerTeamSlice";
import { Direction } from "../enums/transferPlanner";
import { CURRENT_GW, LAST_GW } from "../../../../constants";

const PitchHeader = ({
  gameweek,
  setGameweek,
}: {
  gameweek: number;
  setGameweek: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const managerTeam = useAppSelector((state) => state.managerTeam);
  const bank = managerTeam.bank;
  const transfers = managerTeam.transfers;

  const dispatch = useAppDispatch();

  const validateSaveTeam = (picks: PlayerPick[], bankValue: number) => {
    const { isError, message } = picksValidation(picks, bankValue);
    dispatch(validatePicks({ isError, message }));
    if (!isError)
      dispatch(updatePicksByGameweek({ picks: managerTeam.picks, gameweek }));
  };

  const handleSettingGameweeks = (direction: Direction) => {
    if (direction === Direction.PREV) {
      setGameweek((prev) => {
        if (gameweek - 1 >= CURRENT_GW) {
          dispatch(updatePicks(gameweek - 1));
          return prev - 1;
        }
        return prev;
      });
    } else if (direction === Direction.NEXT) {
      setGameweek((next) => {
        if (gameweek + 1 <= LAST_GW) {
          dispatch(updatePicks(gameweek + 1));

          return next + 1;
        }
        return next;
      });
    }
  };

  return (
    <div>
      <Box sx={{ display: "flex", justifyContent: "center" }} mb={2}>
        {managerTeam.validationError.isError ? (
          <Alert severity="error">{managerTeam.validationError.message}</Alert>
        ) : null}
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
          Bank: {(bank / 10).toFixed(1)} £
        </Typography>
        <Box sx={{ display: "flex" }}>
          <IconButton onClick={() => handleSettingGameweeks(Direction.PREV)}>
            <ArrowLeftIcon />
          </IconButton>
          <Typography variant="h6" component="h3">
            Gameweek: {gameweek}
          </Typography>
          <IconButton onClick={() => handleSettingGameweeks(Direction.NEXT)}>
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
