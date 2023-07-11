import { useAppSelector } from "../../app/hooks";
import { useContext } from "react";
import { PlayerRankingsContext } from "./context/PlayerRankingsContext";
import { filterPlayers } from "../../utils/filterPlayersUtils";
import { PlayerRankingsListStyled } from "./PlayerRankings.styled";

const PlayerRankingsList = () => {
  const players = useAppSelector((state) => state.players.playersList);

  const { playersRankingsFilters } = useContext(PlayerRankingsContext);

  const filteredPlayers = playersRankingsFilters
    ? filterPlayers(players, playersRankingsFilters)
    : players;

  const topPlayers = filteredPlayers
    .slice()
    .sort((playerA, playerB) => playerB.scoring_chance - playerA.scoring_chance)
    .slice(0, 10);

  return (
    <PlayerRankingsListStyled>
      {topPlayers.map((player) => {
        return (
          <div className="player-ranking-item" key={player.id}>
            <div className="player-ranking-item-desc">
              <p>{player.web_name}</p>
            </div>
            <div className="player-ranking-item-probability">
              <div className="probability-bar">
                <div
                  style={{
                    width: `${player.scoring_chance}%`,
                    height: "inherit",
                    backgroundColor: `rgba(
                    ${255 - (player.scoring_chance * 255) / 100},
                    ${(player.scoring_chance * 255) / 100},
                    0,1 )`,
                  }}
                ></div>
                <span className="player-scoring-chance">
                  {player.scoring_chance}
                </span>
              </div>
            </div>
          </div>
        );
      })}
      <button className="btn-primary">Load More</button>
    </PlayerRankingsListStyled>
  );
};

export default PlayerRankingsList;
