import PlayerListItem from "./PlayerListItem";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { SortOptions, Player } from "../interfaces/players";

type PlayerListItemsProps = {
  pagesData: Array<Array<Player>>;
  page: number;
  sortOptions: SortOptions;
  handleSortChange: (sortOptions: SortOptions) => void;
};
const PlayerListItems = ({
  pagesData,
  page,
  sortOptions,
  handleSortChange,
}: PlayerListItemsProps) => {
  const { type: sortType, value: sortValue } = sortOptions;

  return (
    <div className="player-list-items" data-testid="player-list-items">
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
      {pagesData.length > 0
        ? pagesData[page - 1].map((player) => {
            const { id } = player;
            return <PlayerListItem player={player} key={id} />;
          })
        : null}
    </div>
  );
};

export default PlayerListItems;
