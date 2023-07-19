import { useState } from "react";

import { useAppSelector } from "../../../store/hooks";
import SingleChip from "./SingleChip";
import { ChipsStyled } from "./Chips.styled";
import { chipNames } from "./constants";
import ChipsModal from "./ChipsModalWrapper";
export interface FilteredChip {
  name: string;
  played: boolean;
}

const Chips = () => {
  const [modal, setModal] = useState({ isOpen: false, newChipName: "" });
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
        <SingleChip chip={chip} key={index} setModal={setModal} />
      ))}
      <ChipsModal modal={modal} setModal={setModal} />
    </ChipsStyled>
  );
};

export default Chips;
