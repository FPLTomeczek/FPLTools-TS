import { chipNames } from "./constants";

export interface Chip {
  name: ChipName;
  time: string;
  event: number;
}

export interface ChipsModalProps {
  modal: { isOpen: boolean; newChipName: string };
  setModal: React.Dispatch<
    React.SetStateAction<{
      isOpen: boolean;
      newChipName: string;
    }>
  >;
}

type ChipName = (typeof chipNames)[number];
