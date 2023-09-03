import { useAppSelector } from "../../../../store/hooks";
import { Fixture } from "../interfaces/fixtures";

export function useNextFixtures(
  gameweek: number,
  team: string,
  numOfFixtures: number
) {
  const gameweeks = Array.from(
    { length: numOfFixtures },
    (_, i) => gameweek + i
  );
  const fixtures = useAppSelector((state) => state.fixtures.fixtureList);
  const fixturesList: Fixture[] = [];

  gameweeks.forEach((gw) => {
    const fixture = fixtures.find(
      (fixture) =>
        fixture.event == gw &&
        (fixture.team_a === team || fixture.team_h === team)
    );
    if (fixture) {
      fixturesList.push(fixture);
    } else {
      fixturesList.push({
        event: gw,
        team_a: "",
        team_h: "",
        team_a_difficulty: 5,
        team_h_difficulty: 5,
      });
    }
  });

  return fixturesList.sort((a, b) => a.event - b.event);
}
