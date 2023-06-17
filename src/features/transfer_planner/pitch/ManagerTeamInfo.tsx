import { Alert } from "@mui/material";
import { useAppDispatch } from "../../../app/hooks";
import { validatePicks as picksValidation } from "../validation/managerPicksValidations";
import { PlayerPick } from "../interfaces/drafts";
import {
  validatePicks,
  updatePicksByGameweekAndTransfers,
} from "../../../store_features/drafts/draftsSlice";
import { Direction } from "../enums/transferPlanner";
import {
  CURRENT_GW,
  LAST_GW,
  MAX_AVAILABLE_FREE_TRANSFERS,
} from "../../../constants";
import { isEmpty } from "lodash";
import styled from "styled-components";
import { useDraft } from "../../../app/customHooks";
import DirectionButtonGameweek from "../buttons/DirectionButtonGameweek";

const ManagerTeamInfo = () => {
  const bank = useDraft("bank");
  const gameweek = useDraft("gameweek");
  const picks = useDraft("picks");
  const validationError = useDraft("validationError");
  const dataByGameweeks = useDraft("dataByGameweeks");

  const transfersArray = [];

  for (let i = CURRENT_GW; i <= LAST_GW; i++) {
    transfersArray.push(dataByGameweeks[i]?.transfersByGameweeks);
  }

  const cost =
    transfersArray
      .filter((transfers) => transfers < 0)
      .reduce((prev, curr) => (curr += prev), 0) * 4;

  const dispatch = useAppDispatch();

  const validateSaveTeam = (picks: PlayerPick[], bankValue: number) => {
    const { isError, message } = picksValidation(picks, bankValue, gameweek);

    dispatch(validatePicks({ isError, message }));
    if (!isError)
      dispatch(
        updatePicksByGameweekAndTransfers({
          picks,
          gameweek,
          transfers: dataByGameweeks[gameweek].transfersByGameweeks,
          initialPicksByGameweeks:
            dataByGameweeks[gameweek].initialPicksByGameweeks,
        })
      );
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
        <div className="info-container">
          <p>
            Bank:{" "}
            <span className={`${bank < 0 ? "error-value" : ""} `}>
              {(bank / 10).toFixed(1)}
            </span>{" "}
            £
          </p>
        </div>
        <div className="gameweek-container">
          <DirectionButtonGameweek
            direction={Direction.PREV}
            disabled={isEmpty(picks)}
          />
          <p>Gameweek: {gameweek}</p>
          <DirectionButtonGameweek
            direction={Direction.NEXT}
            disabled={isEmpty(picks)}
          />
        </div>
        <div className="info-container" id="transfers-info">
          <p>
            Transfers:{" "}
            <span
              className={`${
                dataByGameweeks[gameweek]?.transfersByGameweeks < 0
                  ? "error-value"
                  : ""
              } `}
            >
              {dataByGameweeks[gameweek]?.transfersByGameweeks
                ? dataByGameweeks[gameweek]?.transfersByGameweeks
                : 0}
            </span>
            /{MAX_AVAILABLE_FREE_TRANSFERS} <br />
            Cost: {cost}
          </p>
        </div>
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
  .info-container > p,
  .gameweek-container {
    font-size: clamp(0.75rem, calc(0.45rem + 1.25vw), 1rem);
  }
  .info-container {
    display: flex;
    justify-content: start;
    align-items: center;
  }
  i {
    font-size: 1rem;
  }
  #transfers-info {
    justify-content: end;
  }
  #transfers-info > p {
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
