import FirstEleven from "./FirstEleven";
import Bench from "./Bench";
import { useDraft } from "../../../app/customHooks";
import PitchHeader from "./PitchHeader";
import GameweeksTransfersContainer from "../gameweeks_transfers/GameweeksTransfersContainer";
import Chips from "../chips/Chips";
import { PitchStyled } from "./Pitch.styled";
import Loading from "../../../components/Loading";

const Pitch = ({ isLoading }: { isLoading: boolean }) => {
  const picks = useDraft().picks;

  function getPlannerPicksContainer() {
    return (
      <div className="planner-picks">
        <PitchHeader />
        <FirstEleven picks={picks.slice(0, 11)} />
        <Bench picks={picks.slice(11, 15)} />
        <Chips />
        <div className="gameweek-transfer-container-planner-picks">
          <GameweeksTransfersContainer />
        </div>
      </div>
    );
  }

  return (
    <PitchStyled>
      {isLoading ? <Loading /> : getPlannerPicksContainer()}
    </PitchStyled>
  );
};

export default Pitch;
