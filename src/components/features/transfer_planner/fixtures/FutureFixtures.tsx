import { LAST_GW } from "../../../../constants";
import { useAppSelector } from "../../../../app/hooks";
import FutureFixture from "./FutureFixture";
import { Box } from "@mui/material";
import { Fixture } from "../interfaces/fixture";
import DoubleFutureFixture from "./DoubleFutureFixture";

const FutureFixtures = ({ team }: { team: string }) => {
  const gameweek = useAppSelector((state) => state.managerTeam.gameweek);

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
    <Box sx={{ display: "flex", fontSize: "0.5rem", width: "100px" }}>
      {futureFixtures.map((fixture, id) => {
        const { event, team_a, team_h, team_a_difficulty, team_h_difficulty } =
          fixture;

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
    </Box>
  );
};

export default FutureFixtures;
