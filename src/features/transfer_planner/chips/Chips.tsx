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
    <ChipsStyled>
      {filteredChips.map((chip, index) => (
        <Chip chip={chip} key={index} />
      ))}
    </ChipsStyled>
  );
};

const ChipsStyled = styled.div`
  display: flex;
  margin-top: 1rem;
  justify-content: space-between;
  gap: 1rem;
  width: 100%;
  box-sizing: border-box;
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
  @media screen and (max-width: 800px) {
    padding: 0 1rem;
    .chip-button {
      padding: 1rem;
    }
  }

  @media screen and (max-width: 480px) {
    .chip-button {
      padding: 0.25rem;
    }
  }
`;

export default Chips;
