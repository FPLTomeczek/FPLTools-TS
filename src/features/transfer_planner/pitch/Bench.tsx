import PlayerPick from "./PlayerPick";
import { PlayerPick as IPlayerPick } from "../interfaces/drafts";
import { BenchStyled } from "./Pitch.styled";
import { FIRST_ELEVEN_PLAYERS } from "../../../constants";

const Bench = ({ picks }: { picks: IPlayerPick[] }) => {
  let playerStartIndex = FIRST_ELEVEN_PLAYERS;

  if (picks.length === 0) {
    return null;
  }

  return (
    <BenchStyled>
      {picks.map((player) => {
        return (
          <PlayerPick
            key={player.position}
            player={player}
            index={playerStartIndex++}
          />
        );
      })}
    </BenchStyled>
  );
};

export default Bench;
