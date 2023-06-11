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
import styled from "styled-components";

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
    <Wrapper>
      <div className="save-team">
        {managerTeam.validationError.isError ? (
          <Alert severity="error">{managerTeam.validationError.message}</Alert>
        ) : managerTeam.validationError.message !== "" ? (
          <Alert severity="success">
            {managerTeam.validationError.message}
          </Alert>
        ) : null}
        <button
          className="primary-button"
          onClick={() => validateSaveTeam(managerTeam.picks, managerTeam.bank)}
        >
          Save Team
        </button>
      </div>

      <div className="pitch-header-info">
        <p>
          Bank:{" "}
          <span className={`${bank < 0 ? "error-value" : ""} `}>
            {(bank / 10).toFixed(1)}
          </span>{" "}
          £
        </p>
        <div className="gameweek-container">
          <button
            className="direction-button"
            onClick={() => handleSettingGameweeks(Direction.PREV)}
            disabled={isEmpty(picksByGameweeks)}
          >
            <i className="fa-solid fa-arrow-left"></i>
          </button>
          <p>Gameweek: {gameweek}</p>
          <button
            className="direction-button"
            onClick={() => handleSettingGameweeks(Direction.NEXT)}
            disabled={isEmpty(picksByGameweeks)}
          >
            <i className="fa-solid fa-arrow-right"></i>
          </button>
        </div>
        <p id="transfers-info">
          {" "}
          Transfers:{" "}
          <span className={`${transfers < 0 ? "error-value" : ""} `}>
            {transfers}
          </span>
          /2
        </p>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .save-team {
    display: flex;
    justify-content: center;
    gap: 4px;
  }
  .gameweek-container {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
  }
  .pitch-header-info {
    display: flex;
    justify-content: space-between;
  }
  .pitch-header-info > * {
    flex: 1;
    max-width: 100%;
    font-size: 1.3rem;
  }
  i {
    font-size: 1rem;
  }
  #transfers-info {
    text-align: right;
  }
  .error-value {
    color: #ff0f0f;
  }
`;

export default PitchHeader;
