import Pick from "./Pick";
import { Pick as IPick } from "../interfaces/drafts";
import { BenchStyled } from "./Pitch.styled";
import { FIRST_ELEVEN_PLAYERS } from "../../../constants";
import { useDraft } from "../../../app/customHooks";
import { Chip } from "../chips/chipsEnums";

const Bench = ({ picks }: { picks: IPick[] }) => {
  let playerStartIndex = FIRST_ELEVEN_PLAYERS;
  const gameweek = useDraft().gameweek;
  const currentChipIsBB =
    useDraft().dataByGameweeks[gameweek].chipByGameweek === Chip.BENCH_BOOST;

  if (picks.length === 0) {
    return null;
  }

  return (
    <BenchStyled BBPlayed={currentChipIsBB}>
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
