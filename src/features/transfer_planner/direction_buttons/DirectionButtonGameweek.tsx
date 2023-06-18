import { Direction } from "../enums/transferPlanner";
import { useDraft } from "../../../app/customHooks";
import { CURRENT_GW, LAST_GW } from "../../../constants";
import { useAppDispatch } from "../../../app/hooks";
import { updatePicks } from "../../../store_features/drafts/draftsSlice";
import ArrowPrevIcon from "@mui/icons-material/ArrowBack";
import ArrowNextIcon from "@mui/icons-material/ArrowForward";

interface DirectionButtonPage {
  direction: Direction;
  disabled: boolean;
}

const DirectionButtonGameweek = ({
  direction,
  disabled,
}: DirectionButtonPage) => {
  const gameweek = useDraft().gameweek;

  const dispatch = useAppDispatch();

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
    <button
      className="direction-button"
      onClick={() => handleSettingGameweeks(direction)}
      disabled={disabled}
    >
      {direction === Direction.PREV ? <ArrowPrevIcon /> : <ArrowNextIcon />}
    </button>
  );
};

export default DirectionButtonGameweek;
