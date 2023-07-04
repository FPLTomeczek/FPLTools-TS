import { useDraft } from "../../../app/customHooks";
import { useAppDispatch } from "../../../app/hooks";
import { setChip } from "../../../store_features/drafts/draftsSlice";
import { FilteredChip } from "./Chips";
import { switchChipName } from "./utils";

const SingleChip = ({ chip }: { chip: FilteredChip }) => {
  const dispatch = useAppDispatch();

  const gameweek = useDraft().gameweek;
  const currentChipName = useDraft().dataByGameweeks[gameweek]?.chipByGameweek;

  const chipName = switchChipName(chip.name);

  const handlePlayingChip = (chipName: string | undefined) => {
    let activateChip;
    currentChipName === chipName
      ? (activateChip = false)
      : (activateChip = true);

    dispatch(setChip({ chipName, activate: activateChip }));
  };
  return (
    <button
      disabled={chip.played}
      className={`chip-button ${
        chip.played ? "chip-unavailable" : "chip-available"
      } ${currentChipName === chipName ? "chip-active" : ""}`}
      onClick={() => handlePlayingChip(chipName)}
    >
      {chipName}
    </button>
  );
};

export default SingleChip;
