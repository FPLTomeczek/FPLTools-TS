import Pick from "./Pick";
import { Pick as IPick } from "../../../../store_features/drafts/interfaces/drafts";
import { BenchStyled } from "./Pitch.styled";
import { FIRST_ELEVEN_PLAYERS } from "../../../../shared/utils/constants";
import { useThisGameweekData } from "../../../../store/customHooks";
import { Chip } from "../../chips/enums/chipsEnums";

const Bench = ({
  picks,
  isLoading,
}: {
  picks: IPick[];
  isLoading: boolean;
}) => {
  const currentChipIsBB =
    useThisGameweekData()?.chipByGameweek === Chip.BENCH_BOOST;
  let pickStartIndex = FIRST_ELEVEN_PLAYERS;

  if (picks.length === 0 || isLoading) return null;

  return (
    <BenchStyled BBPlayed={currentChipIsBB} data-testid="bench">
      {picks.map((pick) => {
        return (
          <Pick key={pick.position} pick={pick} index={pickStartIndex++} />
        );
      })}
    </BenchStyled>
  );
};

export default Bench;
