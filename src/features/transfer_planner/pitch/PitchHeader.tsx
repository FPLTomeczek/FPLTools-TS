import styled from "styled-components";
import ManagerTeamInfo from "./ManagerTeamInfo";
import DraftButtons from "./DraftButtons";

const PitchHeader = () => {
  return (
    <Wrapper>
      <DraftButtons />
      <ManagerTeamInfo />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  @media screen and (max-width: 800px) {
    padding: 0 1rem;
  }
`;

export default PitchHeader;
