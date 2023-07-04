import { useAppSelector } from "../../../app/hooks";
import SingleChip from "./SingleChip";
import { ChipsStyled } from "./Chips.styled";
import { chipNames } from "./constants";
export interface FilteredChip {
  name: string;
  played: boolean;
}

const Chips = () => {
  const chips = useAppSelector((state) => state.drafts.managerHistory.chips);

  const filteredChips: FilteredChip[] = [];

  chipNames.map((chipName) => {
    if (!chips.find((chip) => chip.name === chipName)) {
      filteredChips.push({ name: chipName, played: false });
    } else {
      filteredChips.push({ name: chipName, played: true });
    }
  });

  return (
    <ChipsStyled>
      {filteredChips.map((chip, index) => (
        <SingleChip chip={chip} key={index} />
      ))}
    </ChipsStyled>
  );
};

export default Chips;
