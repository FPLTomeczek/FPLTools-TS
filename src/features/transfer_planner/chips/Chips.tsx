import { useAppSelector } from "../../../app/hooks";
import SingleChip from "./SingleChip";
import { ChipsStyled } from "./Chips.styled";
import { chipNames } from "./constants";
import ChipsModal from "./ChipsModal";
import { useState } from "react";
export interface FilteredChip {
  name: string;
  played: boolean;
}

const Chips = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
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
        <SingleChip chip={chip} key={index} setIsModalOpen={setIsModalOpen} />
      ))}
      <ChipsModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </ChipsStyled>
  );
};

export default Chips;
