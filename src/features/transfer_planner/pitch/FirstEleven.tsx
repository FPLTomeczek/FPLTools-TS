import PlayerPick from "./PlayerPick";
import { FirstElevenStyled } from "./Pitch.styled";
import { splittingPicksByRoles } from "../utils";
import { PlayerPick as IPlayerPick } from "../interfaces/drafts";
import pitch_img from "../../../assets/FOOTBALL_FIELD_portrait.jpg";

const FirstEleven = ({ picks }: { picks: IPlayerPick[] }) => {
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
                  <PlayerPick
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
