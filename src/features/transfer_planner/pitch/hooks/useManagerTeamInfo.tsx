import { CURRENT_GW, LAST_GW } from "../../../../shared/utils/constants";
import { useDraft } from "../../../../store/customHooks";
import { useAppDispatch } from "../../../../store/hooks";
import { Pick } from "../../../../store_features/drafts/drafts";
import {
  updateGameweeks,
  updatePicksByGameweekAndTransfers,
  validatePicks,
} from "../../../../store_features/drafts/draftsSlice";
import { validatePicks as picksValidation } from "../../validation/picks";

export const useManagerTeamInfo = () => {
  const { bank, gameweek, picks, validationError, dataByGameweeks } =
    useDraft();

  const dispatch = useAppDispatch();

  const currentChip = dataByGameweeks[gameweek]?.chipByGameweek;

  const transfersArray = [];
  for (let i = CURRENT_GW; i <= LAST_GW; i++) {
    transfersArray.push(dataByGameweeks[i]?.transfersByGameweek);
  }
  const transferCost =
    transfersArray
      .filter((transfers) => transfers < 0)
      .reduce((prev, curr) => (curr += prev), 0) * 4;

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

  const handleUpdateGameweeks = (gameweekValue: number) => {
    dispatch(updateGameweeks(gameweekValue));
  };

  return {
    validationError,
    picks,
    bank,
    currentChip,
    transferCost,
    dataByGameweeks,
    gameweek,
    validateSaveTeam,
    handleUpdateGameweeks,
  };
};
