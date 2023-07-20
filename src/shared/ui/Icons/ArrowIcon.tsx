import ArrowPrevIcon from "@mui/icons-material/ArrowBack";
import ArrowNextIcon from "@mui/icons-material/ArrowForward";
import DoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import DoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";

import { Direction } from "../Buttons/enums/direction";

const ArrowIcon = ({ direction }: { direction: Direction }) => {
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

export default ArrowIcon;
