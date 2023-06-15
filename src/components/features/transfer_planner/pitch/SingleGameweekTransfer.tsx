import styled from "styled-components";
import { PlayerPick } from "../interfaces/drafts";
import { teamsList } from "../list/data";

const SingleGameweekTransfer = ({ pick }: { pick: PlayerPick }) => {
  const shirt = teamsList.find((teamItem) => teamItem.value === pick.team)?.img;
  return (
    <Wrapper>
      <img src={shirt} alt="player-shirt" className="player-shirt" />
      <p>{pick.web_name}</p>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default SingleGameweekTransfer;