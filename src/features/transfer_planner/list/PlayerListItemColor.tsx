import { Player } from "../interfaces/players";
import { PlayerListItemColorStyled } from "./List.styled";
import { TEAMS_LIST } from "./data";

const PlayerListItemColor = ({ player }: { player: Player }) => {
  const foundTeam = TEAMS_LIST.find((team) => team.value === player.team);
  const listItemColor = foundTeam ? Array.from(foundTeam.color) : ["#000000"];

  return <PlayerListItemColorStyled listItemColor={listItemColor} />;
};

export default PlayerListItemColor;
