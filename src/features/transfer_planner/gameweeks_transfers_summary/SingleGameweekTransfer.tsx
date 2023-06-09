import { Pick } from "../../../interfaces/drafts";
import { TEAMS_LIST } from "../../../data";
import { SingleGameweekTransferStyled } from "./GameweekTransfersSummary.styled";

const SingleGameweekTransfer = ({ pick }: { pick: Pick }) => {
  const shirt = TEAMS_LIST.find((teamItem) => teamItem.name === pick.team)?.img;
  return (
    <SingleGameweekTransferStyled>
      <img src={shirt} alt="player-shirt" className="player-shirt" />
      <p>{pick.web_name}</p>
    </SingleGameweekTransferStyled>
  );
};

export default SingleGameweekTransfer;
