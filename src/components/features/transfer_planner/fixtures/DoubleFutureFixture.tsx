import { Fixture } from "../interfaces/fixture";
import { Box } from "@mui/material";
import { setBackgroundColor } from "./utils";

const DoubleFutureFixture = ({
  duplicatesFixtures,
  team,
}: {
  duplicatesFixtures: Fixture[];
  team: string;
}) => {
  return (
    <Box>
      {duplicatesFixtures.map((fixture, index) => {
        const isHome = fixture.team_a === team ? true : false;
        const bgColor = isHome
          ? setBackgroundColor(fixture.team_a_difficulty)
          : setBackgroundColor(fixture.team_h_difficulty);
        return (
          <p
            key={index}
            style={{
              textTransform: isHome ? "none" : "lowercase",
              backgroundColor: bgColor,
              fontWeight: "700",
              width: "20px",
              boxSizing: "border-box",
              textAlign: "center",
              padding: "0.25rem 0",
              maxHeight: "16px",
              margin: "0",
            }}
          >
            {isHome ? fixture.team_h : fixture.team_a}
          </p>
        );
      })}
    </Box>
  );
};

export default DoubleFutureFixture;
