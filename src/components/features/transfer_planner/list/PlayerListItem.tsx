import { Player } from "../interfaces/players";
import AddPlayerToTeamButton from "./AddPlayerToTeamButton";
import PlayerListItemInfo from "./PlayerListItemInfo";

const PlayerListItem = ({ player }: { player: Player }) => {
  return (
    <div key={player.id} className="player-list-item">
      <AddPlayerToTeamButton player={player} />
      <PlayerListItemInfo player={player} />
    </div>
  );
};

export default PlayerListItem;
