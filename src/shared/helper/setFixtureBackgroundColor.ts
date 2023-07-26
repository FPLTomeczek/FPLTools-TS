import {
  HIGH_DIFF_COLOR,
  LOW_DIFF_COLOR,
  MEGA_DIFF_COLOR,
  MID_DIFF_COLOR,
} from "../utils/constants";

export function setFixtureBackgroundColor(difficulty: number) {
  switch (difficulty) {
    case 2:
      return LOW_DIFF_COLOR;
    case 3:
      return MID_DIFF_COLOR;
    case 4:
      return HIGH_DIFF_COLOR;
    case 5:
      return MEGA_DIFF_COLOR;
    default:
      break;
  }
}
