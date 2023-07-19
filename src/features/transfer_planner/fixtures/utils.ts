import { useAppSelector } from "../../../store/hooks";
import { Fixture } from "./fixtures";

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
