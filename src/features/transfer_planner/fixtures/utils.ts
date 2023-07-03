import { useAppSelector } from "../../../app/hooks";
import { Fixture } from "./fixtures";

export function setBackgroundColor(difficulty: number) {
  switch (difficulty) {
    case 2:
      return "#b0ff73";
    case 3:
      return "#FFFFFF";
    case 4:
      return "#ff6303";
    case 5:
      return "#ff0000";
    default:
      break;
  }
}

export function useNextFixtures(
  gameweek: number,
  team: string,
  numOfFixtures: number
) {
  return useAppSelector((state) => state.fixtures.fixtureList)
    .filter(
      (fixture) =>
        fixture.event >= gameweek &&
        fixture.event < gameweek + numOfFixtures &&
        (fixture.team_a === team || fixture.team_h === team)
    )
    .sort((a, b) => a.event - b.event);
}

export const findDoubleFixtures = (futureFixtures: Fixture[]) => {
  const fixturesEvents = futureFixtures.map((fixture) => fixture.event);
  const doubleFixturesEvents = fixturesEvents.filter(
    (event, index) => fixturesEvents.indexOf(event) !== index
  );
  return futureFixtures.filter((fixture) =>
    doubleFixturesEvents.includes(fixture.event)
  );
};
