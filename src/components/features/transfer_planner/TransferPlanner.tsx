import styled from "styled-components";
import PlayerList from "./list/PlayersList";
import { Grid } from "@mui/material";
import Pitch from "./pitch/Pitch";

const TransferPlanner = ({ isLoading }: { isLoading: boolean }) => {
  return (
    <Wrapper>
      <div className="pitch-container">
        <Pitch isLoading={isLoading} />
      </div>

      <div className="player-list">
        <PlayerList />
      </div>
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
  .pitch-container {
    display: flex;
    justify-content: center;
    align-items: start;
    width: 60%;
  }
  @media screen and (max-width: 1400px) {
    flex-direction: column;
  }
`;

export default TransferPlanner;
