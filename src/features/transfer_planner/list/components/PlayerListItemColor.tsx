import { Player } from "../../../../store_features/players/players";
import { PlayerListItemColorStyled } from "./PlayersList.styled";
import { TEAMS_LIST } from "../../../../shared/utils/data/teamsData";

const PlayerListItemColor = ({ player }: { player: Player }) => {
  const foundTeam = TEAMS_LIST.find((team) => team.name === player.team);
  const listItemColor = foundTeam ? Array.from(foundTeam.color) : ["#000000"];

  return <PlayerListItemColorStyled listItemColor={listItemColor} />;
};

export default PlayerListItemColor;
