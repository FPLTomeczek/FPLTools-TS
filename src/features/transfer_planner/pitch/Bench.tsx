import Pick from "./Pick";
import { Pick as IPick } from "../interfaces/drafts";
import { BenchStyled } from "./Pitch.styled";
import { FIRST_ELEVEN_PLAYERS } from "../../../constants";

const Bench = ({ picks }: { picks: IPick[] }) => {
  let playerStartIndex = FIRST_ELEVEN_PLAYERS;

  if (picks.length === 0) {
    return null;
  }

  return (
    <BenchStyled>
      {picks.map((player) => {
        return (
          <Pick
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
