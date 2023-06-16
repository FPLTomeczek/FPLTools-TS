import { FilteredChip } from "./Chips";

const SingleChip = ({ chip }: { chip: FilteredChip }) => {
  const switchName = (name: string) => {
    switch (name) {
      case "wildcard":
        return "Wildcard";
      case "3xc":
        return "Triple Captain";
      case "bboost":
        return "Bench Boost";
      case "freehit":
        return "Free Hit";
      default:
        break;
    }
  };

  const chipName = switchName(chip.name);

  return (
    <button
      disabled={chip.played}
      className={`chip-button ${
        chip.played ? "chip-unavailable" : "chip-available"
      }`}
    >
      {chipName}
    </button>
  );
};

export default SingleChip;
