import { useDraft } from "../../../app/customHooks";
import { CURRENT_GW, LAST_GW } from "../../../constants";
import GameweekTransfers from "./GameweekTransfers";
import { GameweeksTransfersContainerStyled } from "../pitch/Pitch.styled";

const GameweeksTransfersContainer = () => {
  const dataByGameweeks = useDraft().dataByGameweeks;

  const gameweeksWithTransfers = [];

  for (let i = CURRENT_GW; i <= LAST_GW; i++) {
    if (
      dataByGameweeks[i]?.removedPicksByGameweeks.length > 0 &&
      dataByGameweeks[i]?.addedPicksByGameweeks.length > 0
    ) {
      gameweeksWithTransfers.push(i);
    }
  }

  return (
    <GameweeksTransfersContainerStyled>
      {gameweeksWithTransfers.map((gameweek) => {
        return (
          <GameweekTransfers
            key={gameweek}
            removedPicks={dataByGameweeks[gameweek].removedPicksByGameweeks}
            addedPicks={dataByGameweeks[gameweek].addedPicksByGameweeks}
            gameweek={gameweek}
          />
        );
      })}
    </GameweeksTransfersContainerStyled>
  );
};

export default GameweeksTransfersContainer;
