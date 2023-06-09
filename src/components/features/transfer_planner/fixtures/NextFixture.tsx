import { useAppSelector } from "../../../../app/hooks";

const NextFixture = ({ team }: { team: string }) => {
  const gameweek = useAppSelector((state) => state.managerTeam.gameweek);
  const nextFixture = useAppSelector(
    (state) => state.fixtures.fixtureList
  ).filter(
    (fixtures) =>
      fixtures.event === gameweek &&
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
