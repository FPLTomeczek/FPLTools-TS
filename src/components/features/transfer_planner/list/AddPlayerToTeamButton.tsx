import { teamsList } from "./data";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useAppSelector, useAppDispatch } from "../../../../app/hooks";
import { addPick } from "../../../../features/managerTeam/managerTeamSlice";
import { Player } from "../interfaces/players";

const AddPlayerToTeamButton = ({ player }: { player: Player }) => {
  const dispatch = useAppDispatch();
  const foundTeam = teamsList.find((team) => team.value === player.team);
  const color = foundTeam ? foundTeam.color : "#000000";
  const managerPicks = useAppSelector((state) => state.managerTeam.picks);

  const availablePositions = [
    ...new Set(
      managerPicks
        .filter((pick) => pick.web_name === "Blank")
        .map((pick) => pick.element_type)
    ),
  ];

  const addPlayerToTeam = () => {
    dispatch(addPick(player));
  };

  return (
    <div className="player-add-button-color">
      {managerPicks.find((pick) => pick.id === player.id) ||
      !availablePositions.includes(player.element_type) ? (
        <button style={{ display: "flex", alignItems: "center" }} disabled>
          <AddCircleIcon sx={{ color: "#88919c" }} />
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
  );
};

export default AddPlayerToTeamButton;
