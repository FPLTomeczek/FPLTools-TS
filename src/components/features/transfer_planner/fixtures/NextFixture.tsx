import { useAppSelector } from "../../../../app/hooks";
import { CURRENT_GW } from "../../../../constants";

const NextFixture = ({ team }: { team: string }) => {
  const nextFixture = useAppSelector(
    (state) => state.fixtures.fixtureList
  ).filter(
    (fixtures) =>
      fixtures.event === CURRENT_GW + 1 &&
      (fixtures.team_a === team || fixtures.team_h === team)
  );

  const nextFixtureText = nextFixture.map((fixture) => {
    const teamText = fixture.team_a === team ? fixture.team_h : fixture.team_a;
    const place = fixture.team_a === team ? "(A)" : "(H)";
    return teamText + place;
  });

  return <p>{nextFixtureText.join(", ")}</p>;
};

export default NextFixture;
