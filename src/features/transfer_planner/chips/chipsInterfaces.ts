import { chipNames } from "./constants";

export interface Chip {
  name: ChipName;
  time: string;
  event: number;
}

type ChipName = (typeof chipNames)[number];
