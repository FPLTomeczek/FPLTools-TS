import ManagerTeamInfo from "./ManagerTeamInfo";
import DraftButtons from "./DraftButtons";
import { PitchHeaderStyled } from "./Pitch.styled";

const PitchHeader = () => {
  return (
    <PitchHeaderStyled>
      <DraftButtons />
      <ManagerTeamInfo />
    </PitchHeaderStyled>
  );
};

export default PitchHeader;
