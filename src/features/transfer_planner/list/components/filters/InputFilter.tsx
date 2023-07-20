import { FilterProps } from "./types";

export const InputFilter = ({
  filter,
  filterValues,
  handleChangeEvent,
}: FilterProps) => {
  return (
    <div className="player-list-filter">
      <label htmlFor={`${filter}`}>{filter}</label>
      <input
        id={`${filter}`}
        name={`${filter}`}
        value={filterValues[filter]}
        placeholder="Salah"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          handleChangeEvent(e, filter)
        }
      />
    </div>
  );
};
