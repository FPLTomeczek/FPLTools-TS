import { Pick } from "../../../store_features/drafts/interfaces/drafts";

function roleToIndex(role: string) {
  switch (role) {
    case "GK":
      return 0;
    case "DEF":
      return 1;
    case "MID":
      return 2;
    case "FWD":
      return 3;
    default:
      break;
  }
}

export const splittingPicksByRoles = (picks: Pick[]) => {
  const splittedPicks = picks.reduce(
    (accumulator: Array<Array<Pick>>, value: Pick) => {
      const index = roleToIndex(value.element_type);
      if (typeof index !== "undefined") {
        if (accumulator[index] === undefined) {
          accumulator[index] = [value];
        } else {
          accumulator[index] = [...accumulator[index], value];
        }
      }
      return accumulator;
    },
    []
  );
  return splittedPicks;
};
