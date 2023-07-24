import { Direction } from "../../../../shared/ui/Buttons/enums/direction";
import { MAX_AVAILABLE_FREE_TRANSFERS } from "../../../../shared/utils/constants";
import { isEmpty } from "lodash";
import { ManagerTeamInfoStyled } from "./Pitch.styled";
import { Chip } from "../../chips/enums/chipsEnums";
import { DirectionButton } from "../../../../shared/ui/Buttons/DirectionButton";
import ArrowIcon from "../../../../shared/ui/Icons/ArrowIcon";
import { useManagerTeamInfo } from "../hooks/useManagerTeamInfo";
import { AlertWrapper } from "../../../../shared/ui/Alerts/AlertWrapper";
import { Button } from "../../../../shared/ui/Buttons/Button";

const ManagerTeamInfo = () => {
  const {
    validationError,
    picks,
    bank,
    currentChip,
    transferCost,
    dataByGameweeks,
    gameweek,
    validateSaveTeam,
    handleUpdateGameweeks,
  } = useManagerTeamInfo();

  return (
    <ManagerTeamInfoStyled>
      <div className="save-team">
        <AlertWrapper validationError={validationError} />
        <Button onClick={() => validateSaveTeam(picks, bank)}>Save Team</Button>
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
          <DirectionButton
            disabled={isEmpty(picks)}
            aria-label="prev gameweek"
            onClick={() => handleUpdateGameweeks(gameweek - 1)}
          >
            <ArrowIcon direction={Direction.PREV} />
          </DirectionButton>
          <p>GW: {gameweek}</p>
          <DirectionButton
            disabled={isEmpty(picks)}
            aria-label="next gameweek"
            onClick={() => handleUpdateGameweeks(gameweek + 1)}
          >
            <ArrowIcon direction={Direction.NEXT} />
          </DirectionButton>
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
            Cost: {transferCost}
          </p>
        </div>
      </div>
    </ManagerTeamInfoStyled>
  );
};

export default ManagerTeamInfo;
