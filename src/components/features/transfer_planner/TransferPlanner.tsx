import styled from "styled-components";
import PlayerList from "./list/PlayersList";
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
  align-items: start;
  padding: 2rem 0;
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
  .player-list {
    width: 40%;
  }

  @media screen and (max-width: 1400px) {
    flex-direction: column;
    .player-list,
    .pitch-container {
      width: 100%;
    }
  }
`;

export default TransferPlanner;
