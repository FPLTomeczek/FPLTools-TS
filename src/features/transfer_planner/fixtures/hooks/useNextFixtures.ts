import { useAppSelector } from "../../../../store/hooks";

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
