import { useThisGameweekData } from "../../../../store/customHooks";
import { useAppDispatch } from "../../../../store/hooks";
import { setChip } from "../../../../store_features/drafts/draftsSlice";
import { FilteredChip } from "./Chips";
import { switchChipName } from "../utils";

const SingleChip = ({
  chip,
  setModal,
}: {
  chip: FilteredChip;
  setModal: React.Dispatch<
    React.SetStateAction<{
      isOpen: boolean;
      newChipName: string;
    }>
  >;
}) => {
  const dispatch = useAppDispatch();

  const currentChipName = useThisGameweekData()?.chipByGameweek;

  const chipName = switchChipName(chip.name);

  const handlePlayingChip = (chipName: string | undefined) => {
    if (typeof chipName === "undefined") {
      return;
    }

    currentChipName
      ? setModal({ isOpen: true, newChipName: chipName })
      : dispatch(setChip({ chipName }));
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
