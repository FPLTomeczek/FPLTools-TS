import { useThisGameweekData } from "../../../app/customHooks";
import { useAppDispatch } from "../../../app/hooks";
import { setChip } from "../../../store_features/drafts/draftsSlice";
import { FilteredChip } from "./Chips";
import { switchChipName } from "./utils";

const SingleChip = ({
  chip,
  setIsModalOpen,
}: {
  chip: FilteredChip;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const dispatch = useAppDispatch();

  const currentChipName = useThisGameweekData()?.chipByGameweek;

  const chipName = switchChipName(chip.name);

  const handlePlayingChip = (chipName: string | undefined) => {
    if (typeof chipName === "undefined") {
      return;
    }

    currentChipName ? setIsModalOpen(true) : dispatch(setChip({ chipName }));
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
