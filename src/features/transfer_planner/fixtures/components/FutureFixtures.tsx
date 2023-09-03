import { NEXT_FUTURE_FIXTURES } from "../../../../shared/utils/constants";
import { useDraft } from "../../../../store/customHooks";
import SingleFutureFixture from "./SingleFutureFixture";
import DoubleFutureFixture from "./DoubleFutureFixture";
import { FutureFixturesStyled } from "./Fixtures.styled";
import { findDoubleFixtures } from "../utils";
import { useNextFixtures } from "../hooks/useNextFixtures";

const FutureFixtures = ({ team }: { team: string }) => {
  const gameweek = useDraft().gameweek;

  const next5FutureFixtures = useNextFixtures(
    gameweek,
    team,
    NEXT_FUTURE_FIXTURES
  );

  const doubleFixtures = findDoubleFixtures(next5FutureFixtures);

  let doubleEventCounter = 0;

  return (
    <FutureFixturesStyled>
      {next5FutureFixtures.map((fixture, id) => {
        const { event, team_a, team_h, team_a_difficulty, team_h_difficulty } =
          fixture;

        console.log(fixture);

        if (doubleFixtures.includes(fixture)) {
          doubleEventCounter++;
          if (doubleEventCounter === 2) {
            doubleEventCounter = 0;
            return (
              <DoubleFutureFixture
                key={event}
                duplicatesFixtures={doubleFixtures.filter(
                  (fixture) => fixture.event === event
                )}
                team={team}
              />
            );
          } else {
            return null;
          }
        } else {
          return (
            <SingleFutureFixture
              key={id}
              opponent={team_a === team ? team_h : team_a}
              isHome={team_a !== team}
              difficulty={
                team_a === team ? team_a_difficulty : team_h_difficulty
              }
            />
          );
        }
      })}
    </FutureFixturesStyled>
  );
};

export default FutureFixtures;
