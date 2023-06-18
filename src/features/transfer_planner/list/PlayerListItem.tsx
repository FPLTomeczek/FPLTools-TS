import { Player } from "../interfaces/players";
import AddPlayerToTeamButton from "./PlayerListItemButton";
import PlayerListItemData from "./PlayerListItemData";
import PlayerTeamColor from "./PlayerListItemColor";

const PlayerListItemButton = ({ player }: { player: Player }) => {
  return (
    <li key={player.id} className="player-list-item">
      <div className="player-add-button-color">
        <AddPlayerToTeamButton player={player} />
        <PlayerTeamColor player={player} />
      </div>
      <PlayerListItemData player={player} />
    </li>
  );
};

export default PlayerListItemButton;
