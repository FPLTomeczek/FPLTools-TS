import { LAST_GW } from "../../../../constants";
import { useAppSelector } from "../../../../app/hooks";
import { useDraft } from "../../../../app/customHooks";
import FutureFixture from "./FutureFixture";
import { Fixture } from "../interfaces/fixture";
import DoubleFutureFixture from "./DoubleFutureFixture";
import styled from "styled-components";

const FutureFixtures = ({ team }: { team: string }) => {
  const gameweek = useDraft("gameweek");

  const futureFixtures = useAppSelector((state) => state.fixtures.fixtureList)
    .filter(
      (fixture) =>
        fixture.event >= gameweek &&
        fixture.event < gameweek + 5 &&
        (fixture.team_a === team || fixture.team_h === team)
    )
    .sort((a, b) => a.event - b.event);

  const findDuplicateFixtures = (arr: Fixture[]) => {
    const duplicates = arr.map((fixture) => fixture.event);
    const duplicatesEvents = duplicates.filter(
      (event, index) => duplicates.indexOf(event) !== index
    );
    return arr.filter((fixture) => duplicatesEvents.includes(fixture.event));
  };

  const maxGW = gameweek + 5 > LAST_GW ? LAST_GW : gameweek + 4;

  const GWArray: number[] = [];
  for (let i = gameweek; i <= maxGW; i++) {
    GWArray.push(i);
  }

  const duplicatesFixtures = findDuplicateFixtures(futureFixtures);
  // const blankEvents = GWArray.filter(
  //   (event) => !futureFixtures.map((fixture) => fixture.event).includes(event)
  // );

  let doubleEvent = 0;

  return (
    <Wrapper>
      <div className="fixtures">
        {futureFixtures.map((fixture, id) => {
          const {
            event,
            team_a,
            team_h,
            team_a_difficulty,
            team_h_difficulty,
          } = fixture;

          if (duplicatesFixtures.indexOf(fixture) !== -1) {
            doubleEvent++;
            if (doubleEvent === 2) {
              doubleEvent = 0;
              return (
                <DoubleFutureFixture
                  key={event}
                  duplicatesFixtures={duplicatesFixtures.filter(
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
              <FutureFixture
                key={id}
                opponent={team_a === team ? team_h : team_a}
                isHome={team_a === team ? false : true}
                difficulty={
                  team_a === team ? team_a_difficulty : team_h_difficulty
                }
              />
            );
          }
        })}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .fixtures {
    display: flex;
    font-size: 0.5rem;
    width: 100px;
  }
  @media screen and (max-width: 480px) {
    .fixtures {
      max-width: 100px;
      width: auto;
    }
  }
`;

export default FutureFixtures;
