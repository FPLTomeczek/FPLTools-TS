import Pick from "./Pick";
import { FirstElevenStyled } from "./Pitch.styled";
import { splittingPicksByRoles } from "../utils";
import { Pick as IPick } from "../interfaces/drafts";
import pitch_img from "../../../assets/FOOTBALL_FIELD_portrait.jpg";

const FirstEleven = ({ picks }: { picks: IPick[] }) => {
  const picksByRole = splittingPicksByRoles(picks);

  let playerIndex = 0;

  return (
    <FirstElevenStyled imageURL={pitch_img}>
      <div className="pitch" data-testid="pitch">
        {picksByRole.map((players, ind) => {
          return (
            <div key={ind} className="picks-row">
              {players.map((player) => {
                return (
                  <Pick
                    key={player.position}
                    player={player}
                    index={playerIndex++}
                  />
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
