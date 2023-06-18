import PlayerListItem from "./PlayerListItem";
import { SortOptions, Player } from "../interfaces/players";
import PlayerListItemsHeader from "./PlayerListItemsHeader";
import { PlayersListItemsStyled } from "./List.styled";

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
  return (
    <PlayersListItemsStyled data-testid="player-list-items">
      <PlayerListItemsHeader
        sortOptions={sortOptions}
        handleSortChange={handleSortChange}
      />
      <ul>
        {pagesData.length > 0
          ? pagesData[page - 1].map((player) => {
              const { id } = player;
              return <PlayerListItem player={player} key={id} />;
            })
          : null}
      </ul>
    </PlayersListItemsStyled>
  );
};

export default PlayerListItems;
