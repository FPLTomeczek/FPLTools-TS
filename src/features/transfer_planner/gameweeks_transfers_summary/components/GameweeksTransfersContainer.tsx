import { useDraft } from "../../../../store/customHooks";
import { CURRENT_GW, LAST_GW } from "../../../../shared/utils/constants";
import GameweekTransfers from "./GameweekTransfers";
import { GameweeksTransfersContainerStyled } from "../../pitch/Pitch.styled";

const GameweeksTransfersContainer = () => {
  const dataByGameweeks = useDraft().dataByGameweeks;

  const gameweeksWithTransfers = [];

  for (let i = CURRENT_GW; i <= LAST_GW; i++) {
    if (
      dataByGameweeks[i]?.removedPicksByGameweek.length > 0 &&
      dataByGameweeks[i]?.addedPicksByGameweek.length > 0
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
            removedPicks={dataByGameweeks[gameweek].removedPicksByGameweek}
            addedPicks={dataByGameweeks[gameweek].addedPicksByGameweek}
            gameweek={gameweek}
          />
        );
      })}
    </GameweeksTransfersContainerStyled>
  );
};

export default GameweeksTransfersContainer;
