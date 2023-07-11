import PlayerRankingsFilters from "../features/player_rankings/PlayerRankingsFilters";
import PlayerRankingsList from "../features/player_rankings/PlayerRankingsList";
import PlayerRankingsProvider from "../features/player_rankings/context/PlayerRankingsContext";
import { PlayerRankingsPageStyled } from "./Pages.styled";

const PlayerRankings = () => {
  return (
    <PlayerRankingsProvider>
      <PlayerRankingsPageStyled>
        <h1>PlayerRankings</h1>
        <PlayerRankingsFilters />
        <PlayerRankingsList />
      </PlayerRankingsPageStyled>
    </PlayerRankingsProvider>
  );
};

export default PlayerRankings;
