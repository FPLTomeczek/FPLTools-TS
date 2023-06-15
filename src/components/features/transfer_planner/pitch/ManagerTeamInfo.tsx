import { Alert } from "@mui/material";
import { useAppDispatch } from "../../../../app/hooks";
import { validatePicks as picksValidation } from "../validation/managerPicksValidations";
import { PlayerPick } from "../interfaces/drafts";
import {
  validatePicks,
  updatePicksByGameweekAndTransfers,
  updatePicks,
} from "../../../../features/drafts/draftsSlice";
import { Direction } from "../enums/transferPlanner";
import {
  CURRENT_GW,
  LAST_GW,
  MAX_AVAILABLE_FREE_TRANSFERS,
} from "../../../../constants";
import { isEmpty } from "lodash";
import styled from "styled-components";
import { useDraft } from "../../../../app/customHooks";

const ManagerTeamInfo = () => {
  const bank = useDraft("bank");
  const gameweek = useDraft("gameweek");
  const transfers = useDraft("transfersByGameweeks");
  const picks = useDraft("picks");
  const picksByGameweeks = useDraft("picksByGameweeks");
  const validationError = useDraft("validationError");
  const initialPicksByGameweeks = useDraft("initialPicksByGameweeks");

  const dispatch = useAppDispatch();

  const validateSaveTeam = (picks: PlayerPick[], bankValue: number) => {
    const { isError, message } = picksValidation(picks, bankValue, gameweek);

    dispatch(validatePicks({ isError, message }));
    if (!isError)
      dispatch(
        updatePicksByGameweekAndTransfers({
          picks,
          gameweek,
          transfers: transfers[gameweek],
          initialPicksByGameweeks,
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
        {validationError.isError ? (
          <Alert severity="error">{validationError.message}</Alert>
        ) : validationError.message !== "" ? (
          <Alert severity="success">{validationError.message}</Alert>
        ) : null}
        <button
          className="primary-button"
          onClick={() => validateSaveTeam(picks, bank)}
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
          <span className={`${transfers[gameweek] < 0 ? "error-value" : ""} `}>
            {transfers[gameweek] ? transfers[gameweek] : 0}
          </span>
          /{MAX_AVAILABLE_FREE_TRANSFERS}
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
    margin-top: 1rem;
  }
  .gameweek-container {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
  }
  .pitch-header-info {
    display: flex;
    justify-content: space-between;
    margin-top: 1rem;
  }
  .pitch-header-info > * {
    flex: 1;
    max-width: 100%;
  }
  .pitch-header-info > p,
  .gameweek-container {
    font-size: clamp(0.75rem, calc(0.45rem + 1.25vw), 1rem);
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
  @media screen and (max-width: 600px) {
    .gameweek-container {
      flex: 2;
    }
  }
`;

export default ManagerTeamInfo;