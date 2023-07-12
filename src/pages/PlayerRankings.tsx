import {
  ThemeProvider,
  createTheme,
  ThemeOptions,
  radioClasses,
} from "@mui/material";
import PlayerRankingsFilters from "../features/player_rankings/PlayerRankingsFilters";
import PlayerRankingsList from "../features/player_rankings/PlayerRankingsList";
import PlayerRankingsProvider from "../features/player_rankings/context/PlayerRankingsContext";
import { PlayerRankingsPageStyled } from "./Pages.styled";

const themeObj: ThemeOptions = {
  components: {
    MuiRadio: {
      styleOverrides: {
        root: {
          color: "var(--secondary-color)",
          [`&.${radioClasses.checked}`]: { color: "var(--secondary-color)" },
        },
      },
    },
  },
};

const theme = createTheme(themeObj);

const PlayerRankings = () => {
  return (
    <ThemeProvider theme={theme}>
      <PlayerRankingsProvider>
        <PlayerRankingsPageStyled>
          <h1 id="player-rankings-header">Player Rankings</h1>
          <PlayerRankingsFilters />
          <PlayerRankingsList />
        </PlayerRankingsPageStyled>
      </PlayerRankingsProvider>
    </ThemeProvider>
  );
};

export default PlayerRankings;
