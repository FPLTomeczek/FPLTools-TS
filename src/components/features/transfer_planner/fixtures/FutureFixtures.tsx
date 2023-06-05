import { CURRENT_GW } from "../../../../constants";
import { useAppSelector } from "../../../../app/hooks";
import FutureFixture from "./FutureFixture";
import { Box } from "@mui/material";

const FutureFixtures = ({ team }: { team: string }) => {
  const futureFixtures = useAppSelector(
    (state) => state.fixtures.fixtureList
  ).filter(
    (fixture) =>
      fixture.event > CURRENT_GW &&
      fixture.event < CURRENT_GW + 6 &&
      (fixture.team_a === team || fixture.team_h === team)
  );

  return (
    <Box sx={{ display: "flex", fontSize: "0.5rem" }}>
      {futureFixtures.map((fixture, id) => {
        const { event, team_a, team_h, team_a_difficulty, team_h_difficulty } =
          fixture;

        return (
          <FutureFixture
            key={id}
            opponent={team_a === team ? team_h : team_a}
            isHome={team_a === team ? false : true}
            difficulty={team_a === team ? team_a_difficulty : team_h_difficulty}
          />
        );
      })}
    </Box>
  );
};

export default FutureFixtures;
