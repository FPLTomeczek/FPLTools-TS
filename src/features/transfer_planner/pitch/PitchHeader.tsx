import ManagerTeamInfo from "./ManagerTeamInfo";
import DraftPicker from "./DraftPicker";
import { PitchHeaderStyled } from "./Pitch.styled";

const PitchHeader = () => {
  return (
    <PitchHeaderStyled>
      <DraftPicker />
      <ManagerTeamInfo />
    </PitchHeaderStyled>
  );
};

export default PitchHeader;
