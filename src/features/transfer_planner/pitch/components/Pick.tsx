import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import ArrowCircleLeftRoundedIcon from "@mui/icons-material/ArrowCircleLeftRounded";

import { TEAMS_LIST } from "../../../../shared/utils/data/teamsData";
import { Pick as IPick } from "../../../../store_features/drafts/drafts";
import FutureFixtures from "../../fixtures/components/FutureFixtures";
import NextFixture from "../../fixtures/components/NextFixture";
import { PickStyled } from "./Pitch.styled";
import { PickShirt } from "./PickShirt";
import { PickActionButton } from "./PickActionButton";
import { usePickActions } from "../hooks/usePickActions";

const Pick = ({ pick, index }: { pick: IPick; index: number }) => {
  const { web_name: name, sellCost, now_cost: cost, team } = pick;
  const { handleRemovePick, handleRetrievePick, handleMakeChange } =
    usePickActions(pick);

  const shirt = TEAMS_LIST.find((teamItem) => teamItem.name === team)?.img;

  return (
    <PickStyled>
      <div>
        {name !== "Blank" ? (
          <div className="manipulate-pick-buttons">
            <PickActionButton onClick={handleMakeChange}>
              <ChangeCircleIcon color="warning" />
            </PickActionButton>

            <PickActionButton onClick={handleRemovePick}>
              <CancelIcon color="error" />
            </PickActionButton>
          </div>
        ) : (
          <PickActionButton onClick={handleRetrievePick}>
            <ArrowCircleLeftRoundedIcon color="action" />
          </PickActionButton>
        )}
      </div>
      <PickShirt src={shirt} pick={pick} />
      <NextFixture
        team={team}
        sellCost={typeof sellCost === "undefined" ? cost : sellCost}
        index={index}
      />
      <FutureFixtures team={team} />
      <p className="pick-text" data-testid={`pick-name-${index}`}>
        {name}
      </p>
    </PickStyled>
  );
};

export default Pick;
