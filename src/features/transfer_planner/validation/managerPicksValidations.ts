import { PlayerPick } from "../interfaces/drafts";
import { splittingPicksByRoles } from "../utils";
import {
  FIRST_ELEVEN_GK,
  FIRST_ELEVEN_DEF_MIN,
  FIRST_ELEVEN_DEF_MAX,
  FIRST_ELEVEN_MID_MIN,
  FIRST_ELEVEN_MID_MAX,
  FIRST_ELEVEN_FWD_MAX,
} from "../../../constants";

type Teams = {
  [key: string]: number;
};

let teamOverpicked = "";
const validatePicksFromOneTeam = (picks: PlayerPick[]) => {
  const playerTeams = picks.map((pick) => pick.team);

  const picksObject = playerTeams.reduce((obj: Teams, team: string) => {
    obj[team] = (obj[team] || 0) + 1;
    return obj;
  }, {} as Teams);

  for (const key in picksObject) {
    if (picksObject[key] > 3) {
      teamOverpicked = key;
      return false;
    }
  }
  return true;
};

const validateFormation = (picks: PlayerPick[]) => {
  const splittedPicks = splittingPicksByRoles(picks.slice(0, 11));
  if (
    !splittedPicks[0] ||
    splittedPicks[0].length !== FIRST_ELEVEN_GK ||
    splittedPicks[1].length < FIRST_ELEVEN_DEF_MIN ||
    splittedPicks[1].length > FIRST_ELEVEN_DEF_MAX ||
    splittedPicks[2].length < FIRST_ELEVEN_MID_MIN ||
    splittedPicks[2].length > FIRST_ELEVEN_MID_MAX ||
    !splittedPicks[3] ||
    splittedPicks[3].length > FIRST_ELEVEN_FWD_MAX
  )
    return false;
  return true;
};

const validatePicksNotBlank = (picks: PlayerPick[]) => {
  return picks.filter((pick) => pick.web_name === "Blank").length === 0
    ? true
    : false;
};

const validateBankValue = (bankValue: number) => {
  return bankValue >= 0 ? true : false;
};

export const validatePicks = (
  picks: PlayerPick[],
  bankValue: number,
  gameweek: number
) => {
  let isError = false;
  let message = `Successfully saved picks for gameweek: ${gameweek}`;
  if (!validatePicksFromOneTeam(picks)) {
    isError = true;
    message = `Too many players from one team: ${teamOverpicked} (MAX 3)`;
  } else if (!validateFormation(picks)) {
    isError = true;
    message = `Invalid Formation, Required Number For Players For Each Role; \nGK: 1\nDEF: 3-5\nMID: 2-5\nFWD: 1-3`;
  } else if (!validatePicksNotBlank(picks)) {
    isError = true;
    message = "You left at least one of the picks Empty";
  } else if (!validateBankValue(bankValue)) {
    isError = true;
    message = "Bank Value under 0.0£";
  }

  return { isError, message };
};
