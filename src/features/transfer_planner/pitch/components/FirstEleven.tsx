import Pick from "./Pick";
import { FirstElevenStyled } from "./Pitch.styled";
import { splittingPicksByRoles } from "../../utils/utils";
import { Pick as IPick } from "../../../../store_features/drafts/interfaces/drafts";
import pitch_img from "../../../../shared/assets/images/FOOTBALL_FIELD_portrait.webp";

const FirstEleven = ({ picks }: { picks: IPick[] }) => {
  const picksByRole = splittingPicksByRoles(picks);

  let pickIndex = 0;

  return (
    <FirstElevenStyled imageURL={pitch_img}>
      <div className="pitch" data-testid="pitch">
        {picksByRole.map((picks, ind) => {
          return (
            <div key={ind} className="picks-row">
              {picks.map((pick) => {
                return (
                  <Pick key={pick.position} pick={pick} index={pickIndex++} />
                );
              })}
            </div>
          );
        })}
      </div>
    </FirstElevenStyled>
  );
};

export default FirstEleven;
