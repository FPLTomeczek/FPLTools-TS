import PlayerListItem from "./PlayerListItem";
import {
  SortOptions,
  Player,
} from "../../../../store_features/players/players";
import PlayerListItemsHeader from "./PlayerListItemsHeader";
import { PlayersListItemsStyled } from "./PlayersList.styled";
import { useAppSelector } from "../../../../store/hooks";

type PlayerListItemsProps = {
  pagesData: Array<Array<Player>>;
  page: number;
  handleSortChange: (sortOptions: SortOptions) => void;
};
const PlayerListItems = ({
  pagesData,
  page,
  handleSortChange,
}: PlayerListItemsProps) => {
  const sortOptions = useAppSelector((state) => state.players.sortOptions);

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
