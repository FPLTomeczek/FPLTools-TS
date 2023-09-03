import {
  ThemeProvider,
  createTheme,
  ThemeOptions,
  radioClasses,
} from "@mui/material";

import PlayerRankingsFilters from "../features/player_rankings/components/PlayerRankingsFilters";
import PlayerRankingsList from "../features/player_rankings/components/PlayerRankingsList";
import PlayerRankingsProvider from "../features/player_rankings/context/PlayerRankingsContext";
import { PlayerRankingsPageStyled } from "./Pages.styled";
import Hero from "../layouts/components/Hero";

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
          <Hero>Player Rankings</Hero>
          <PlayerRankingsFilters />
          <PlayerRankingsList />
        </PlayerRankingsPageStyled>
      </PlayerRankingsProvider>
    </ThemeProvider>
  );
};

export default PlayerRankings;
