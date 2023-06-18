import { Player } from "../interfaces/players";
import { TEAMS_LIST } from "./data";

const PlayerListItemColor = ({ player }: { player: Player }) => {
  const foundTeam = TEAMS_LIST.find((team) => team.value === player.team);
  const color = foundTeam ? foundTeam.color : "#000000";

  return (
    <div
      className="team-color"
      style={{
        background: Array.isArray(color)
          ? `linear-gradient(to right, ${color[0]} 0%, ${color[0]} 50%, ${color[1]} 50%, ${color[1]} 100%)`
          : color,
      }}
    ></div>
  );
};

export default PlayerListItemColor;
