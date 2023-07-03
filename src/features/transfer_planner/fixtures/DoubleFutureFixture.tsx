import { Fixture } from "./fixtures";
import { FixtureItem } from "./Fixtures.styled";

const DoubleFutureFixture = ({
  duplicatesFixtures,
  team,
}: {
  duplicatesFixtures: Fixture[];
  team: string;
}) => {
  return (
    <div>
      {duplicatesFixtures.map((fixture, index) => {
        const isHome = fixture.team_a === team ? true : false;
        return (
          <FixtureItem
            key={index}
            isHome={isHome}
            difficulty={
              isHome ? fixture.team_a_difficulty : fixture.team_h_difficulty
            }
          >
            {isHome ? fixture.team_h : fixture.team_a}
          </FixtureItem>
        );
      })}
    </div>
  );
};

export default DoubleFutureFixture;
