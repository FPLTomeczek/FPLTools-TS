import { Player } from "../interfaces/players";
import AddPlayerToTeamButton from "./AddPlayerToTeamButton";
import PlayerListItemInfo from "./PlayerListItemInfo";

const PlayerListItem = ({ player }: { player: Player }) => {
  return (
    <li key={player.id} className="player-list-item">
      <AddPlayerToTeamButton player={player} />
      <PlayerListItemInfo player={player} />
    </li>
  );
};

export default PlayerListItem;
