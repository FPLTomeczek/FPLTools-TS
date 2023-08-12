import { useContext } from "react";

import { PlayerRankingsContext } from "../context/PlayerRankingsContext";
import { DialogFilter } from "../enums/playerRankingsEnums";
import { PlayerRankingsFilterButtonsStyled } from "./PlayerRankings.styled";
import RestartIcon from "@mui/icons-material/RestartAlt";
import { useAppSelector } from "../../../store/hooks";
import { useTheme } from "../../../shared/theme/ThemeProvider";

const PlayerRankingsFilterButtons = ({
  handleOpenDialog,
}: {
  handleOpenDialog: (dialogFilter: DialogFilter) => void;
}) => {
  const { filters, filter } = useContext(PlayerRankingsContext);
  const maxPrice = useAppSelector((state) => state.players.maxPrice);
  const { darkMode } = useTheme();

  return (
    <PlayerRankingsFilterButtonsStyled darkMode={darkMode}>
      <button
        id="reset-button"
        data-testid="reset-filters-button"
        onClick={() =>
          filter({
            name: "",
            team: "ALL",
            role: "ALL",
            probability: "Score",
            price: maxPrice,
          })
        }
      >
        <RestartIcon />
      </button>
      <input
        type="text"
        placeholder="Salah"
        onChange={(e) =>
          filter({
            ...filters,
            name: e.target.value,
          })
        }
      />
      <button onClick={() => handleOpenDialog(DialogFilter.PROBABILITY)}>
        Show: {filters.probability}%
      </button>
      <button onClick={() => handleOpenDialog(DialogFilter.TEAM)}>
        Teams: {filters.team}
      </button>
      <button onClick={() => handleOpenDialog(DialogFilter.ROLE)}>
        Roles: {filters.role}
      </button>
      <button onClick={() => handleOpenDialog(DialogFilter.PRICE)}>
        Price: {"<"}
        {filters.price / 10}£
      </button>
    </PlayerRankingsFilterButtonsStyled>
  );
};

export default PlayerRankingsFilterButtons;
