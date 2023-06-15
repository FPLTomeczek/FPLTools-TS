import styled from "styled-components";
import PlayerList from "./list/PlayersList";
import Pitch from "./pitch/Pitch";
import GameweeksTransfersContainer from "./gameweeks_transfers/GameweeksTransfersContainer";

const TransferPlanner = ({ isLoading }: { isLoading: boolean }) => {
  return (
    <Wrapper>
      <section className="pitch-container">
        <Pitch isLoading={isLoading} />
      </section>

      <section className="player-list">
        <PlayerList />
      </section>

      <section className="gameweek-transfer-container-m">
        <GameweeksTransfersContainer />
      </section>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: start;
  padding: 2rem 0;
  width: 100%;
  .planner-picks {
    max-width: 800px;
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
  .gameweek-transfer-container-m {
    display: none;
  }

  @media screen and (max-width: 1400px) {
    flex-direction: column;
    .player-list,
    .pitch-container {
      width: 100%;
    }
    .gameweek-transfer-container-planner-picks {
      display: none;
    }
    .gameweek-transfer-container-m {
      display: block;
      width: 100%;
    }
  }
`;

export default TransferPlanner;
