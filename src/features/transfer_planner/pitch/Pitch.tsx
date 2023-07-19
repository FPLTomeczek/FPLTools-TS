import FirstEleven from "./FirstEleven";
import Bench from "./Bench";
import { useDraft } from "../../../store/customHooks";
import PitchHeader from "./PitchHeader";
import Chips from "../chips/components/Chips";
import { PitchStyled } from "./Pitch.styled";
import Loading from "../../../shared/ui/Loading/Loading";

const Pitch = ({ isLoading }: { isLoading: boolean }) => {
  const picks = useDraft().picks;

  if (isLoading) {
    return <Loading />;
  }

  return (
    <PitchStyled>
      <PitchHeader />
      <FirstEleven picks={picks.slice(0, 11)} />
      <Bench picks={picks.slice(11, 15)} />
      {/* TODO: remove chips */}
      <Chips />
    </PitchStyled>
  );
};

export default Pitch;
