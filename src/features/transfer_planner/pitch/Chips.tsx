import { useAppSelector } from "../../../app/hooks";
import Chip from "./SingleChip";
import styled from "styled-components";

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
    <Wrapper>
      {filteredChips.map((chip, index) => (
        <Chip chip={chip} key={index} />
      ))}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  margin-top: 1rem;
  justify-content: space-between;
  gap: 1rem;
  .chip-button {
    padding: 2rem;
    width: 100%;
    cursor: pointer;
  }
  .chip-available {
    background-color: var(--secondary-color);
  }
  .chip-unavailable {
    cursor: default;
    background-color: var(--disabled-color);
  }
`;

export default Chips;
