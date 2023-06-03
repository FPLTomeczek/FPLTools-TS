import AddCircleIcon from "@mui/icons-material/AddCircle";
import { teamsList } from "./data";
import { addPick } from "../../../../features/managerTeam/managerTeamSlice";
import { Player } from "../interfaces/players";
import { useAppSelector, useAppDispatch } from "../../../../app/hooks";

const PlayerListItem = ({ player }: { player: Player }) => {
  const managerPicks = useAppSelector((state) => state.managerTeam.picks);

  const availablePositions = [
    ...new Set(
      managerPicks
        .filter((pick) => pick.web_name === "Blank")
        .map((pick) => pick.element_type)
    ),
  ];

  const foundTeam = teamsList.find((team) => team.value === player.team);

  const color = foundTeam ? foundTeam.color : "#000000";

  const dispatch = useAppDispatch();

  const addPlayerToTeam = () => {
    dispatch(addPick(player));
  };

  return (
    <div key={player.id} className="player-list-item">
      <div className="player-add-button-color">
        {managerPicks.find((pick) => pick.id === player.id) ||
        !availablePositions.includes(player.element_type) ? (
          <button style={{ display: "flex", alignItems: "center" }} disabled>
            <AddCircleIcon color="disabled" />
          </button>
        ) : (
          <button
            style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
            onClick={addPlayerToTeam}
          >
            <AddCircleIcon color="success" />
          </button>
        )}
        <div
          className="team-color"
          style={{
            background: Array.isArray(color)
              ? `linear-gradient(to right, ${color[0]} 0%, ${color[0]} 50%, ${color[1]} 50%, ${color[1]} 100%)`
              : color,
          }}
        ></div>
      </div>

      <p className="player-list-name">{player.web_name}</p>
      <p className="player-list-number" data-testid="player-team-item">
        {player.team}
      </p>
      <p className="player-list-number">{player.element_type}</p>
      <p className="player-list-number" data-testid="player-points-item">
        {player.total_points}
      </p>
      <p className="player-list-number" data-testid="player-price-item">
        {player.now_cost / 10}
      </p>
    </div>
  );
};

export default PlayerListItem;
