import { Pick } from "../../../../store_features/drafts/drafts";
import { TEAMS_LIST } from "../../../../shared/utils/data/teamsData";
import { SingleGameweekTransferStyled } from "./GameweekTransfersSummary.styled";

const SingleGameweekTransfer = ({ pick }: { pick: Pick }) => {
  const shirt = TEAMS_LIST.find((teamItem) => teamItem.name === pick.team)?.img;
  return (
    <SingleGameweekTransferStyled>
      <img src={shirt} alt="pick-shirt" className="pick-shirt" />
      <p>{pick.web_name}</p>
    </SingleGameweekTransferStyled>
  );
};

export default SingleGameweekTransfer;
