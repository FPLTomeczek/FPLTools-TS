import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { SortOptions } from "../interfaces/players";

const PlayerListItemsHeader = ({
  sortOptions,
  handleSortChange,
}: {
  sortOptions: SortOptions;
  handleSortChange: (sortOptions: SortOptions) => void;
}) => {
  const { type: sortType, value: sortValue } = sortOptions;

  return (
    <div className="player-list-header">
      <div className="player-add-button-color"></div>
      <p className="player-list-name">Name</p>
      <p className="player-list-number">Team</p>
      <p className="player-list-number">Role</p>
      <p
        className="player-list-number"
        id="player-list-points"
        onClick={() =>
          handleSortChange({
            type: "points",
            value: sortValue === "desc" ? "asc" : "desc",
          })
        }
      >
        Pts
        <span>
          {sortType === "points" ? (
            sortValue === "desc" ? (
              <ArrowDropDownIcon />
            ) : (
              <ArrowDropUpIcon />
            )
          ) : null}
        </span>
      </p>
      <p
        className="player-list-number"
        id="player-list-price"
        onClick={() =>
          handleSortChange({
            type: "price",
            value: sortValue === "desc" ? "asc" : "desc",
          })
        }
      >
        £{" "}
        <span>
          {sortType === "price" ? (
            sortValue === "desc" ? (
              <ArrowDropDownIcon />
            ) : (
              <ArrowDropUpIcon />
            )
          ) : null}
        </span>
      </p>
    </div>
  );
};

export default PlayerListItemsHeader;
