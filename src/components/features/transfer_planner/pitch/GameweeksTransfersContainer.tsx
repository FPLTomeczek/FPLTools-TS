import { useDraft } from "../../../../app/customHooks";
import { CURRENT_GW, LAST_GW } from "../../../../constants";
import GameweekTransfers from "./GameweekTransfers";
import styled from "styled-components";

const GameweeksTransfersContainer = () => {
  const removedPicksByGameweeks = useDraft("removedPicksByGameweeks");
  const addedPicksByGameweeks = useDraft("addedPicksByGameweeks");

  const gameweeksWithTransfers = [];

  for (let i = CURRENT_GW; i <= LAST_GW; i++) {
    if (
      removedPicksByGameweeks[i].length > 0 &&
      addedPicksByGameweeks[i].length > 0
    ) {
      gameweeksWithTransfers.push(i);
    }
  }

  return (
    <Wrapper>
      {gameweeksWithTransfers.map((gameweek) => {
        return (
          <GameweekTransfers
            key={gameweek}
            removedPicks={removedPicksByGameweeks[gameweek]}
            addedPicks={addedPicksByGameweeks[gameweek]}
            gameweek={gameweek}
          />
        );
      })}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: start;
  padding: 1rem 0;
  flex-wrap: wrap;
  gap: 1rem;
  width: 80vw;
  overflow: visible;
  @media screen and (max-width: 1400px) {
    width: 100%;
    justify-content: center;
  }
`;

export default GameweeksTransfersContainer;
