import { Direction } from "../../../enums/direction";
import { handleSettingPages } from "./utils";
import { ListData } from "./list";
import ArrowPrevIcon from "@mui/icons-material/ArrowBack";
import ArrowNextIcon from "@mui/icons-material/ArrowForward";
import DoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import DoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";

interface DirectionButtonList {
  direction: Direction;
  callbackProps: ListData;
}

const DirectionButtonList = ({
  direction,
  callbackProps,
}: DirectionButtonList) => {
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
      className="btn-direction"
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

export default DirectionButtonList;
