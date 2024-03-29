import { Player } from "../../../../store_features/players/players";
import { PlayerListItemAddButton } from "./buttons/PlayerListItemAddButton";
import PlayerListItemData from "./PlayerListItemData";
import PlayerListItemColor from "./PlayerListItemColor";

const PlayerListItem = ({ player }: { player: Player }) => {
  return (
    <li className="player-list-header player-list-border">
      <div className="player-add-button-color">
        <PlayerListItemAddButton player={player} />
        <PlayerListItemColor player={player} />
      </div>
      <PlayerListItemData player={player} />
    </li>
  );
};

export default PlayerListItem;
