import { useAppSelector } from "../../../app/hooks";
import SingleChip from "./SingleChip";
import { ChipsStyled } from "./Chips.styled";
export interface FilteredChip {
  name: string;
  played: boolean;
}

const Chips = () => {
  const chips = useAppSelector((state) => state.drafts.managerHistory.chips);

  const defaultValues = ["wildcard", "3xc", "bboost", "freehit"];

  const filteredChips: FilteredChip[] = [];

  defaultValues.map((defaultChip) => {
    if (!chips.find((chip) => chip.name === defaultChip)) {
      filteredChips.push({ name: defaultChip, played: false });
    } else {
      filteredChips.push({ name: defaultChip, played: true });
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
