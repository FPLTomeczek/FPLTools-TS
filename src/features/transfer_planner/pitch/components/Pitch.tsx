import FirstEleven from "./FirstEleven";
import Bench from "./Bench";
import { useDraft } from "../../../../store/customHooks";
import PitchHeader from "./PitchHeader";
import Chips from "../../chips/components/Chips";
import { PitchStyled } from "./Pitch.styled";

const Pitch = ({ isLoading }: { isLoading: boolean }) => {
  const picks = useDraft().picks;

  return (
    <PitchStyled>
      <PitchHeader />
      <FirstEleven picks={picks.slice(0, 11)} isLoading={isLoading} />
      <Bench picks={picks.slice(11, 15)} isLoading={isLoading} />
      <Chips />
    </PitchStyled>
  );
};

export default Pitch;
