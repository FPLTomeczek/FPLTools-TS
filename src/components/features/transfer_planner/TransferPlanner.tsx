import styled from "styled-components";
import PlayerList from "./list/PlayersList";
import { Grid } from "@mui/material";
import Pitch from "./pitch/Pitch";

const TransferPlanner = ({ isLoading }: { isLoading: boolean }) => {
  return (
    <Wrapper>
      <Grid container mt={2}>
        <Grid
          item
          xs={12}
          lg={7}
          mt={12}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "start",
          }}
        >
          <Pitch isLoading={isLoading} />
        </Grid>

        <Grid item xs={12} lg={5}>
          <div className="player-list">
            <PlayerList />
          </div>
        </Grid>
      </Grid>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  .planner-picks {
    width: 100%;
  }
`;

export default TransferPlanner;
