import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useAppDispatch } from "../../../store/hooks";
import { addPick } from "../../../store_features/drafts/draftsSlice";
import { Player } from "../../../store_features/players/players";
import { useDraft } from "../../../store/customHooks";
import { Pick } from "../../../store_features/drafts/drafts";
import { AddPlayerToTeamButtonStyled } from "./List.styled";

const AddPlayerToTeamButton = ({ player }: { player: Player }) => {
  const dispatch = useAppDispatch();
  const managerPicks: Pick[] = useDraft().picks;

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
    <AddPlayerToTeamButtonStyled>
      {managerPicks.find((pick) => pick.id === player.id) ||
      !availablePositions.includes(player.element_type) ? (
        <button
          className="add-button disabled"
          disabled
          aria-label="add player"
        >
          <AddCircleIcon sx={{ color: "var(--disabled-color)" }} />
        </button>
      ) : (
        <button
          className="add-button"
          onClick={addPlayerToTeam}
          aria-label="add player"
        >
          <AddCircleIcon color="success" />
        </button>
      )}
    </AddPlayerToTeamButtonStyled>
  );
};

export default AddPlayerToTeamButton;
