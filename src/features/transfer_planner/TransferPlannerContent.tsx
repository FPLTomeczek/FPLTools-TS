import PlayerList from "./list/PlayersList";
import Pitch from "./pitch/Pitch";
import GameweeksTransfersContainer from "./gameweeks_transfers/GameweeksTransfersContainer";
import { TransferPlannerStyled } from "./pitch/Pitch.styled";

const TransferPlanner = ({ isLoading }: { isLoading: boolean }) => {
  return (
    <TransferPlannerStyled>
      <section className="pitch-container">
        <Pitch isLoading={isLoading} />
      </section>

      <section className="player-list">
        <PlayerList />
      </section>

      <section className="gameweek-transfer-container-m">
        <GameweeksTransfersContainer />
      </section>
    </TransferPlannerStyled>
  );
};

export default TransferPlanner;
