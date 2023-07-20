import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Player } from "../../../../../store_features/players/players";
import { PlayerListItemAddButtonStyled } from "../PlayersList.styled";
import usePlayersAvailability from "../../hooks/usePlayersAvailability";

export const PlayerListItemAddButton = ({ player }: { player: Player }) => {
  const { isPlayerAvailable, addPlayerToTeam } = usePlayersAvailability(player);

  return (
    <PlayerListItemAddButtonStyled>
      <button
        className={`add-button ${isPlayerAvailable ? "" : "disabled"}`}
        disabled={!isPlayerAvailable}
        onClick={addPlayerToTeam}
        aria-label="add player"
      >
        <AddCircleIcon
          sx={{
            color: `${isPlayerAvailable ? "green" : "var(--disabled-color)"}`,
          }}
        />
      </button>
    </PlayerListItemAddButtonStyled>
  );
};
