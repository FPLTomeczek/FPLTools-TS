import { Direction } from "../../../../../shared/ui/Buttons/enums/direction";

export type ListData = {
  handleSetPage: (direction: Direction) => void;
  page: number;
  numOfPages: number;
};
