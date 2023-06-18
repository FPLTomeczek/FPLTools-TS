import { useAppDispatch } from "../../../app/hooks";
import { FilteredChip } from "./Chips";
import { switchChipName } from "./utils";

const SingleChip = ({ chip }: { chip: FilteredChip }) => {
  const dispatch = useAppDispatch();

  const handlePlayingChip = (chip: FilteredChip) => {
    dispatch;
  };

  const chipName = switchChipName(chip.name);

  return (
    <button
      disabled={chip.played}
      className={`chip-button ${
        chip.played ? "chip-unavailable" : "chip-available"
      }`}
      onClick={() => handlePlayingChip(chip)}
    >
      {chipName}
    </button>
  );
};

export default SingleChip;
