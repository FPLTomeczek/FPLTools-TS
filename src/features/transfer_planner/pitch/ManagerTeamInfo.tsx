import { Alert } from "@mui/material";

import { useAppDispatch } from "../../../store/hooks";
import { validatePicks as picksValidation } from "../validation/picks";
import { Pick } from "../../../store_features/drafts/drafts";
import {
  validatePicks,
  updatePicksByGameweekAndTransfers,
} from "../../../store_features/drafts/draftsSlice";
import { Direction } from "../../../shared/ui/Buttons/enums/direction";
import {
  CURRENT_GW,
  LAST_GW,
  MAX_AVAILABLE_FREE_TRANSFERS,
} from "../../../shared/utils/constants";
import { isEmpty } from "lodash";
import { useDraft } from "../../../store/customHooks";
import DirectionButtonGameweek from "./DirectionButtonGameweek";
import { ManagerTeamInfoStyled } from "./Pitch.styled";
import { Chip } from "../chips/chipsEnums";

const ManagerTeamInfo = () => {
  const { bank, gameweek, picks, validationError, dataByGameweeks } =
    useDraft();

  const currentChip = dataByGameweeks[gameweek]?.chipByGameweek;

  const transfersArray = [];

  for (let i = CURRENT_GW; i <= LAST_GW; i++) {
    transfersArray.push(dataByGameweeks[i]?.transfersByGameweek);
  }

  const cost =
    transfersArray
      .filter((transfers) => transfers < 0)
      .reduce((prev, curr) => (curr += prev), 0) * 4;

  const dispatch = useAppDispatch();

  const validateSaveTeam = (picks: Pick[], bankValue: number) => {
    const { isError, message } = picksValidation(picks, bankValue, gameweek);

    dispatch(validatePicks({ isError, message }));
    if (!isError)
      dispatch(
        updatePicksByGameweekAndTransfers({
          picks,
          gameweek,
          transfers: dataByGameweeks[gameweek].transfersByGameweek,
          initialPicksByGameweek:
            dataByGameweeks[gameweek].initialPicksByGameweek,
        })
      );
  };

  return (
    <ManagerTeamInfoStyled>
      <div className="save-team">
        {validationError.isError ? (
          <Alert severity="error">{validationError.message}</Alert>
        ) : validationError.message !== "" ? (
          <Alert severity="success">{validationError.message}</Alert>
        ) : null}
        <button
          className="btn-primary"
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
            {currentChip === Chip.WILDCARD || currentChip === Chip.FREE_HIT ? (
              <>
                <span>∞</span>
                <br />
              </>
            ) : (
              <>
                <span
                  className={`${
                    dataByGameweeks[gameweek]?.transfersByGameweek < 0
                      ? "error-value"
                      : ""
                  } `}
                >
                  {dataByGameweeks[gameweek]?.transfersByGameweek
                    ? dataByGameweeks[gameweek]?.transfersByGameweek
                    : 0}
                </span>
                /{MAX_AVAILABLE_FREE_TRANSFERS} <br />
              </>
            )}
            Cost: {cost}
          </p>
        </div>
      </div>
    </ManagerTeamInfoStyled>
  );
};

export default ManagerTeamInfo;
