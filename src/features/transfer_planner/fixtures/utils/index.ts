import { Fixture } from "../interfaces/fixtures";

export const findDoubleFixtures = (futureFixtures: Fixture[]) => {
  const fixturesEvents = futureFixtures.map((fixture) => fixture.event);
  const doubleFixturesEvents = fixturesEvents.filter(
    (event, index) => fixturesEvents.indexOf(event) !== index
  );
  return futureFixtures.filter((fixture) =>
    doubleFixturesEvents.includes(fixture.event)
  );
};
