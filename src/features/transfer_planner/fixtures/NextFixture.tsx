import { useDraft } from "../../../app/customHooks";
import { useAppSelector } from "../../../app/hooks";
import { FIRST_ELEVEN_PLAYERS } from "../../../constants";

const NextFixture = ({
  team,
  sellCost,
  index,
}: {
  team: string;
  sellCost: number;
  index: number;
}) => {
  const gameweek = useDraft("gameweek");

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

  return (
    <p className="player-pick-text" id="player-pick-next-fixture">
      {nextFixtureText.join(", ")}
      {sellCost > 0 ? (
        <span
          className={`${
            index > FIRST_ELEVEN_PLAYERS - 1 ? "bench-price" : ""
          } player-pick-price`}
        >
          {sellCost / 10} £
        </span>
      ) : null}
    </p>
  );
};

export default NextFixture;
