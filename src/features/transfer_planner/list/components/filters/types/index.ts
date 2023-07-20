import { PlayerFilters } from "../../../../../../store_features/players/players";
import { Filter } from "../enums";

export type FilterProps = {
  filter: Filter;
  filterValues: PlayerFilters;
  handleChangeEvent: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>,
    type: Filter
  ) =>
    | {
        payload: PlayerFilters;
        type: "players/filterPlayers";
      }
    | undefined;
};
