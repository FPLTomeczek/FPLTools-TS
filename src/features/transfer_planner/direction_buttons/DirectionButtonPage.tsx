import { Direction } from "../enums/transferPlanner";
import { handleSettingPages } from "../list/utils";
import { ListData } from "../interfaces/list";
import ArrowPrevIcon from "@mui/icons-material/ArrowBack";
import ArrowNextIcon from "@mui/icons-material/ArrowForward";
import DoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import DoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";

interface DirectionButtonPage {
  direction: Direction;
  callbackProps: ListData;
}

const DirectionButtonPage = ({
  direction,
  callbackProps,
}: DirectionButtonPage) => {
  const arrowIcon = (direction: Direction) => {
    switch (direction) {
      case Direction.FIRST:
        return <DoubleArrowLeftIcon />;
      case Direction.PREV:
        return <ArrowPrevIcon />;
      case Direction.NEXT:
        return <ArrowNextIcon />;
      case Direction.LAST:
        return <DoubleArrowRightIcon />;
    }
  };

  return (
    <button
      className="direction-button"
      onClick={() =>
        handleSettingPages(
          callbackProps.setPage,
          direction,
          callbackProps.numOfPages
        )
      }
      aria-label={`${direction} page`}
    >
      {arrowIcon(direction)}
    </button>
  );
};

export default DirectionButtonPage;
